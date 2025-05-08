import { useTravelNotes } from '@/hooks/useTravelNotes';
import { useState } from 'react';
import { RefuseModal } from '../RefuseModal';
import { FilterBar } from './FilterBar';
import { Pagination } from './Pagination';
import './TravelNoteReviewList.scss';
import { TravelNoteTable } from './TravelNoteTable';

const PAGE_SIZE = 5;

export function TravelNoteReviewList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [refuseOpen, setRefuseOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<string | null>(null);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role || '';

  const { reviewListData, approveMutation, rejectMutation, deleteMutation } = useTravelNotes({
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter,
    keyword: searchQuery,
    from: dateRange.from,
    to: dateRange.to,
  });

  const total = reviewListData?.total ?? 0;
  const notesData = reviewListData?.data ?? [];
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleReject = (id: string) => {
    setCurrentRejectId(id);
    setRefuseOpen(true);
  };

  const handleDelete = (id: string) => {
    setCurrentDeleteId(id);
    if (window.confirm('确定要删除该游记吗？此操作不可恢复！')) {
      deleteMutation.mutate({ id });
    } else {
      setCurrentDeleteId(null);
    }
  };

  return (
    <div className="review-list-root">
      <FilterBar
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        dateRange={dateRange}
        onStatusFilterChange={setStatusFilter}
        onSearchQueryChange={setSearchQuery}
        onDateRangeChange={range =>
          setDateRange({
            from: range?.from,
            to: range?.to ?? undefined,
          })
        }
      />

      <div className="table-wrapper">
        <TravelNoteTable
          notesData={notesData}
          userRole={userRole}
          approveMutation={approveMutation}
          rejectMutation={rejectMutation}
          deleteMutation={deleteMutation}
          currentRejectId={currentRejectId}
          currentDeleteId={currentDeleteId}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          totalItems={total}
          onPageChange={setPage}
        />
      )}

      <RefuseModal
        open={refuseOpen}
        onClose={() => {
          setRefuseOpen(false);
          setCurrentRejectId(null);
        }}
        loading={rejectMutation.isPending}
        onConfirm={reason => {
          if (currentRejectId) {
            rejectMutation.mutate({ id: currentRejectId, reason });
          }
        }}
      />
    </div>
  );
}

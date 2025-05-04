import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { RefuseModal } from './RefuseModal';
import { ReviewActions } from './ReviewActionButton';
import './TravelNoteReviewList.scss';
import { useTravelNotes } from '@/hooks/useTravelNotes';

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

  const { reviewListRes, approveMutation, rejectMutation, deleteMutation } = useTravelNotes({
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter,
    keyword: searchQuery,
    from: dateRange.from,
    to: dateRange.to,
  });

  const total = reviewListRes?.total ?? 0;
  const notesData = reviewListRes?.data ?? [];
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="review-list-root">
      {/* 筛选区 */}
      <div className="filter-bar">
        <div className="filter-item">
          <label>状态</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="PENDING">待审核</SelectItem>
              <SelectItem value="APPROVED">已通过</SelectItem>
              <SelectItem value="REJECTED">已拒绝</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="filter-item">
          <label>关键字</label>
          <div className="input-icon">
            <Search />
            <Input
              placeholder="输入标题或作者"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-item">
          <label>日期范围</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="date-btn">
                <CalendarIcon />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'yyyy-MM-dd')} - {format(dateRange.to, 'yyyy-MM-dd')}
                    </>
                  ) : (
                    format(dateRange.from, 'yyyy-MM-dd')
                  )
                ) : (
                  <span>选择日期范围</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="calendar-popover"
              align="start"
              sideOffset={4}
              style={{ minWidth: 500 }}
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={range =>
                  setDateRange({
                    from: range?.from,
                    to: range?.to ?? undefined,
                  })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="table-wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notesData && notesData.length > 0 ? (
              notesData.map(note => (
                <TableRow key={note.id}>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>{note.author.username}</TableCell>
                  <TableCell>{format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`status-badge status-${note.status.toLowerCase()}`}
                    >
                      {note.status === 'APPROVED'
                        ? '已通过'
                        : note.status === 'PENDING'
                          ? '待审核'
                          : note.status === 'REJECTED'
                            ? '已拒绝'
                            : note.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {userRole === 'ADMIN' || userRole === 'REVIEWER' ? (
                      <ReviewActions
                        role={userRole}
                        status={note.status}
                        onApprove={() => {
                          approveMutation.mutate({ id: note.id });
                        }}
                        onReject={() => {
                          setCurrentRejectId(note.id);
                          setRefuseOpen(true);
                        }}
                        onDelete={
                          userRole === 'ADMIN'
                            ? () => {
                                setCurrentDeleteId(note.id);
                                if (window.confirm('确定要删除该游记吗？此操作不可恢复！')) {
                                  deleteMutation.mutate({ id: note.id });
                                } else {
                                  setCurrentDeleteId(null);
                                }
                              }
                            : undefined
                        }
                        approveLoading={
                          approveMutation.isPending && approveMutation.variables?.id === note.id
                        }
                        rejectLoading={rejectMutation.isPending && currentRejectId === note.id}
                        deleteLoading={deleteMutation.isPending && currentDeleteId === note.id}
                      />
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="no-data">
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-bar">
          <span>
            显示 {(page - 1) * PAGE_SIZE + 1} 到 {Math.min(page * PAGE_SIZE, notesData.length)}
            ，共 {notesData.length} 条
          </span>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft />
              上一页
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight />
              下一页
            </Button>
          </div>
        </div>
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

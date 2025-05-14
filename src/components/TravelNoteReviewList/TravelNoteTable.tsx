import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TravelNote } from '@/types';
import { ReviewActionButtons } from '../ReviewActionButtons';
import StatusTag from '../StatusTag';
import { UseMutationResult } from '@tanstack/react-query';
import './TravelNoteReviewList.scss';
interface TravelNoteTableProps {
  notesData: TravelNote[];
  userRole: string;
  approveMutation: UseMutationResult<unknown, Error, { id: string }, unknown>;
  rejectMutation: UseMutationResult<unknown, Error, { id: string; reason: string }, unknown>;
  deleteMutation: UseMutationResult<unknown, Error, { id: string }, unknown>;
  currentRejectId: string | null;
  currentDeleteId: string | null;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TravelNoteTable({
  notesData,
  userRole,
  approveMutation,
  rejectMutation,
  deleteMutation,
  currentRejectId,
  currentDeleteId,
  onReject,
  onDelete,
}: TravelNoteTableProps) {
  return (
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
                <StatusTag status={note.status} />
              </TableCell>
              <TableCell>
                {userRole === 'ADMIN' || userRole === 'REVIEWER' ? (
                  <ReviewActionButtons
                    role={userRole}
                    status={note.status}
                    noteId={note.id}
                    approveLoading={
                      approveMutation.isPending && approveMutation.variables?.id === note.id
                    }
                    rejectLoading={rejectMutation.isPending && currentRejectId === note.id}
                    deleteLoading={deleteMutation.isPending && currentDeleteId === note.id}
                    onApprove={() => {
                      approveMutation.mutate({ id: note.id });
                    }}
                    onReject={() => onReject(note.id)}
                    onDelete={
                      userRole === 'ADMIN'
                        ? () => {
                            onDelete(note.id);
                          }
                        : undefined
                    }
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
  );
}

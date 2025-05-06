import { Button } from '@/components/ui/button';
import { NoteStatus } from '@/types/travelNote';
import { useNavigate } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import './ReviewActionButtons.scss';

interface ActionsProps {
  role: string;
  status: NoteStatus;
  noteId: string;
  approveLoading?: boolean;
  rejectLoading?: boolean;
  deleteLoading?: boolean;
  onApprove: () => void;
  onReject: () => void;
  onDelete?: () => void;
}

export function ReviewActionButtons({
  role,
  status,
  noteId,
  onApprove,
  onReject,
  onDelete,
  approveLoading,
  rejectLoading,
  deleteLoading,
}: ActionsProps) {
  const navigate = useNavigate();
  return (
    <div className="review-actions">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          navigate({ to: `/${noteId}` });
        }}
      >
        <Eye />
        查看
      </Button>
      {status !== 'APPROVED' && (
        <Button
          size="sm"
          variant="outline"
          className="action-btn approve-btn"
          onClick={onApprove}
          disabled={approveLoading || status !== 'PENDING'}
        >
          {approveLoading ? '操作中...' : '通过'}
        </Button>
      )}
      {status !== 'REJECTED' && (
        <Button
          size="sm"
          variant="outline"
          className="action-btn reject-btn"
          onClick={onReject}
          disabled={rejectLoading || status !== 'PENDING'}
        >
          {rejectLoading ? '操作中...' : '拒绝'}
        </Button>
      )}
      {role === 'ADMIN' && (
        <Button size="sm" variant="outline" className="action-btn delete-btn" onClick={onDelete}>
          {deleteLoading ? '操作中...' : '删除'}
        </Button>
      )}
    </div>
  );
}

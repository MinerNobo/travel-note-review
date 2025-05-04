import { Button } from '@/components/ui/button';
import './ReviewActionButton.scss';
import { Eye } from 'lucide-react';

interface ActionsProps {
  role: string; // "ADMIN" | "REVIEWER"
  status: string; // "PENDING" | "APPROVED" | "REJECTED"
  onApprove: () => void;
  onReject: () => void;
  onDelete?: () => void;
  approveLoading?: boolean;
  rejectLoading?: boolean;
  deleteLoading?: boolean;
}

export function ReviewActions({
  role,
  status,
  onApprove,
  onReject,
  onDelete,
  approveLoading,
  rejectLoading,
  deleteLoading,
}: ActionsProps) {
  return (
    <div className="review-actions">
      <Button variant="ghost" size="sm">
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

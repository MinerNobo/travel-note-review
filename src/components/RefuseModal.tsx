import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RefuseModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function RefuseModal({ open, onClose, onConfirm, loading }: RefuseModalProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) {
      alert('请填写拒绝理由');
      return;
    }
    onConfirm(reason);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>填写拒绝理由</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="请输入拒绝理由"
          value={reason}
          onChange={e => setReason(e.target.value)}
          rows={4}
          disabled={loading}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              取消
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? '操作中...' : '确认拒绝'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

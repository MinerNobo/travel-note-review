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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RejectionReason {
  id: string;
  label: string;
  description: string;
}

const REJECTION_REASONS: RejectionReason[] = [
  {
    id: 'inappropriate_content',
    label: '不当内容',
    description: '包含不恰当、攻击性或令人反感的内容',
  },
  {
    id: 'low_quality',
    label: '内容质量低',
    description: '游记内容过于简单、缺乏详细描述或意义',
  },
  {
    id: 'copyright_issue',
    label: '版权问题',
    description: '疑似抄袭或未经授权使用他人内容',
  },
  {
    id: 'misleading_info',
    label: '信息误导',
    description: '包含明显的错误信息或具有误导性的描述',
  },
  {
    id: 'personal_privacy',
    label: '隐私泄露',
    description: '可能泄露个人或他人隐私信息',
  },
];

interface RefuseModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function RefuseModal({ open, onClose, onConfirm, loading }: RefuseModalProps) {
  const [reason, setReason] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const handleReasonSelect = (reasonId: string) => {
    setSelectedReasons(prev =>
      prev.includes(reasonId) ? prev.filter(id => id !== reasonId) : [...prev, reasonId]
    );
  };

  const handleConfirm = () => {
    const combinedReason = [
      ...selectedReasons.map(id => REJECTION_REASONS.find(r => r.id === id)?.label || ''),
      reason.trim(),
    ]
      .filter(Boolean)
      .join('; ');

    if (!combinedReason) {
      alert('请选择或填写拒绝理由');
      return;
    }

    onConfirm(combinedReason);
    onClose();
    setSelectedReasons([]);
    setReason('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>填写拒绝理由</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>选择拒绝理由（可多选）:</Label>
          <div className="grid grid-cols-2 gap-2">
            {REJECTION_REASONS.map(rejectionReason => (
              <div key={rejectionReason.id} className="flex items-center space-x-2">
                <Checkbox
                  id={rejectionReason.id}
                  checked={selectedReasons.includes(rejectionReason.id)}
                  onCheckedChange={() => handleReasonSelect(rejectionReason.id)}
                  disabled={loading}
                />
                <Label htmlFor={rejectionReason.id}>{rejectionReason.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <Textarea
          placeholder="补充详细拒绝理由（可选）"
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

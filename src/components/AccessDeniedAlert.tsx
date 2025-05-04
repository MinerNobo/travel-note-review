import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import './AccessDeniedAlert.scss';

interface AccessDeniedAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessDeniedAlert({ isOpen, onClose }: AccessDeniedAlertProps) {
  const navigate = useNavigate();

  const handleReturn = () => {
    onClose();
    navigate({ to: '/login' });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="access-denied-dialog">
        <AlertDialogHeader>
          <div className="access-denied-icon">
            <ShieldAlert className="icon" />
          </div>
          <AlertDialogTitle className="access-denied-title">无权限访问</AlertDialogTitle>
          <AlertDialogDescription className="access-denied-desc">
            您没有权限访问本系统，仅限<span className="highlight">审核者</span>或
            <span className="highlight">管理员</span>登录。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="access-denied-footer">
          <AlertDialogAction asChild>
            <Button className="access-denied-btn" onClick={handleReturn}>
              返回登录页
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

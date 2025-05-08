import { useTravelNoteDetail } from '@/hooks/useTravelNoteDeatail';
import { useNavigate, useParams } from '@tanstack/react-router';
import { IoAlertCircleOutline, IoRefreshOutline, IoReturnUpBackOutline } from 'react-icons/io5';
import TravelNote from '../components/TravelNote';
import { Button } from '../components/ui/button';
import './TravelNoteDetailPage.scss';

export default function TravelNoteDetailPage() {
  const { noteId } = useParams({ strict: false }) as { noteId: string };
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token') ?? '';

  const { data, isLoading, error, refetch } = useTravelNoteDetail({ id: noteId, token });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>正在加载游记详情...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <IoAlertCircleOutline size={64} color="#dc2626" />
          <h2>加载失败</h2>
          <p>无法获取游记详情，请稍后重试</p>
          <Button variant={'outline'} onClick={() => refetch()} className="retry-btn">
            <IoRefreshOutline />
            重新加载
          </Button>
        </div>
      );
    }

    return data ? <TravelNote {...data} /> : null;
  };

  return (
    <div className="note-detail-bg">
      <Button className="back-btn" variant={'secondary'} onClick={() => navigate({ to: '/' })}>
        <IoReturnUpBackOutline />
        返回
      </Button>
      <div className="note-detail-center">{renderContent()}</div>
    </div>
  );
}

import { MediaItem, NoteStatus } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import MediaGallery from './MediaGallery';
import StatusTag from './StatusTag';
import './TravelNote.scss';

interface Author {
  id: string;
  username: string;
  avatarUrl: string | null;
}

interface TravelNoteProps {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  rejectReason: string | null;
  media: MediaItem[];
  author: Author;
  createdAt: string;
  updatedAt: string;
}

const TravelNote = ({
  title,
  content,
  status,
  rejectReason,
  media,
  author,
  createdAt,
}: TravelNoteProps) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="travel-note">
      <div className="note-header">
        <div className="author-info">
          {author.avatarUrl && (
            <img src={author.avatarUrl} alt={author.username} className="avatar" />
          )}
          <div>
            <div className="username">{author.username}</div>
            <div className="created-at">{timeAgo}</div>
          </div>
        </div>
        <StatusTag status={status} />
      </div>
      <div className="note-content">
        <h2 className="note-title">{title}</h2>
        <p className="note-text">{content}</p>
        {media && media.length > 0 && <MediaGallery media={media} />}
        {rejectReason && <div className="reject-reason">拒绝理由：{rejectReason}</div>}
      </div>
    </div>
  );
};

export default TravelNote;

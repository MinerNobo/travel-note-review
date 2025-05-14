export type NoteStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnailUrl: string;
}

export interface TravelNote {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  rejectReason: string | null;
  media: MediaItem[];
  author: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

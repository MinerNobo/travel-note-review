export type NoteStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface TravelNote {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  rejectReason: string | null;
  media: {
    id: string;
    type: string;
    url: string;
    thumbnailUrl: string;
  }[];
  author: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnailUrl: string;
}

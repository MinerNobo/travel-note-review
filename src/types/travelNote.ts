export interface TravelNote {
  id: string;
  title: string;
  content: string;
  status: string;
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

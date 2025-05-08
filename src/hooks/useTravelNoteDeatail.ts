import { fetchNoteDetail } from '@/api/travelNoteApi';
import { useQuery } from '@tanstack/react-query';

export function useTravelNoteDetail({ id, token }: { id: string; token: string | null }) {
  return useQuery({
    queryKey: ['note-detail', id],
    queryFn: () => fetchNoteDetail({ id, token }),
  });
}

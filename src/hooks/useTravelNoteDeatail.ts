import { fetchNoteDetail } from '@/api/travelNoteApi';
import { useQuery } from '@tanstack/react-query';
import { convertUTCToShanghaiTime } from '@/lib/utils';
import { TravelNote } from '@/types';

export function useTravelNoteDetail({ id, token }: { id: string; token: string | null }) {
  return useQuery<TravelNote>({
    queryKey: ['note-detail', id],
    queryFn: async () => {
      const result = await fetchNoteDetail({ id, token });
      return convertUTCToShanghaiTime([result])[0];
    },
  });
}

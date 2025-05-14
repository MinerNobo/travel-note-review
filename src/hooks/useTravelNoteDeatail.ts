import { fetchNoteDetail } from '@/api/travelNoteApi';
import { convertUTCToShanghaiTime } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useTravelNoteDetail({ id, token }: { id: string; token: string | null }) {
  return useQuery({
    queryKey: ['note-detail', id],
    queryFn: async () => {
      const result = await fetchNoteDetail({ id, token });
      return convertUTCToShanghaiTime(result);
    },
  });
}

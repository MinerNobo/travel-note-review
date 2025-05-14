import { fetchNoteDetail } from '@/api/travelNoteApi';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { convertUTCToShanghaiTime } from '@/lib/utils';

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

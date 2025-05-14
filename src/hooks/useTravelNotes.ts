import { approveReview, deleteReview, fetchTravelNotes, rejectReview } from '@/api/travelNoteApi';
import { convertToUTCDate, convertUTCToShanghaiTime } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useTravelNotes({
  page,
  pageSize,
  status,
  keyword,
  from,
  to,
}: {
  page: number;
  pageSize: number;
  status: string;
  keyword: string;
  from?: Date;
  to?: Date;
}) {
  const token = localStorage.getItem('access_token');
  const queryClient = useQueryClient();

  const { data: reviewListData } = useQuery({
    queryKey: ['travelNotes', pageSize, page, status, keyword, from, to],
    queryFn: async () => {
      const result = await fetchTravelNotes({
        page,
        pageSize,
        status,
        keyword,
        from: convertToUTCDate(from),
        to: convertToUTCDate(to),
        token: token || '',
      });

      return {
        ...result,
        data: convertUTCToShanghaiTime(result.data),
      };
    },
    staleTime: 1000 * 5,
  });

  const approveMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => approveReview({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelNotes'] });
    },
    onError: error => {
      window.alert(error?.message || '通过操作失败');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectReview({ id, reason, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelNotes'] });
    },
    onError: error => {
      window.alert(error?.message || '拒绝操作失败');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteReview({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelNotes'] });
    },
    onError: error => {
      window.alert(error?.message || '删除操作失败');
    },
  });

  return {
    reviewListData,
    approveMutation,
    rejectMutation,
    deleteMutation,
  };
}

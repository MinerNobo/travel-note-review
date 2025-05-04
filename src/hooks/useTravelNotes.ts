import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { approveReview, deleteReview, fetchTravelNotes, rejectReview } from '@/api/travelNoteApi';

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

  const { data: reviewListRes } = useQuery({
    queryKey: ['travelNotes', page, status, keyword, from, to],
    queryFn: () =>
      fetchTravelNotes({
        page,
        pageSize,
        status,
        keyword,
        from: from ? format(from, 'yyyy-MM-dd') : '',
        to: to ? format(to, 'yyyy-MM-dd') : '',
        token: token || '',
      }),
    staleTime: 1000 * 30,
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
    reviewListRes,
    approveMutation,
    rejectMutation,
    deleteMutation,
  };
}

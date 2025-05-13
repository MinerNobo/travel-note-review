import { API_BASE_URL } from '@/constants';
import { TravelNote } from '@/types';

const handleApiError = (resp: Response) => {
  if (!resp.ok) {
    if (resp.status === 401) {
      throw new Error('未授权，请重新登录');
    }
    throw new Error('操作失败');
  }
};

interface FetchTravelNotesParams {
  page: number;
  pageSize: number;
  status: string;
  keyword: string;
  from?: string;
  to?: string;
  token: string | null;
}

interface ReviewActionParams {
  id: string;
  token: string | null;
}

interface RejectReviewParams extends ReviewActionParams {
  reason: string;
}

interface FetchNoteDetailParam {
  id: string;
  token: string | null;
}

const buildQueryParams = (params: Partial<FetchTravelNotesParams>): URLSearchParams => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', String(params.page));
  if (params.pageSize) searchParams.append('pageSize', String(params.pageSize));
  if (params.status && params.status !== 'all') searchParams.append('status', params.status);
  if (params.keyword) searchParams.append('keyword', params.keyword);
  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);

  return searchParams;
};

const getAuthHeaders = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export async function fetchTravelNotes(params: FetchTravelNotesParams): Promise<{
  total: number;
  page: number;
  pageSize: number;
  data: TravelNote[];
}> {
  const queryParams = buildQueryParams(params);
  const url = `${API_BASE_URL}/review?${queryParams.toString()}`;

  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${params.token}` },
  });

  handleApiError(resp);

  return resp.json();
}

export async function approveReview({ id, token }: ReviewActionParams) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}/approve`, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  handleApiError(resp);
  return resp.json();
}

export async function rejectReview({ id, reason, token }: RejectReviewParams) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}/reject`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ rejectReason: reason }),
  });

  handleApiError(resp);
  return resp.json();
}

export async function deleteReview({ id, token }: ReviewActionParams) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  handleApiError(resp);
  return resp.json();
}

export async function fetchNoteDetail({ id, token }: FetchNoteDetailParam) {
  const res = await fetch(`${API_BASE_URL}/review/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('获取游记详情失败');
  return res.json();
}

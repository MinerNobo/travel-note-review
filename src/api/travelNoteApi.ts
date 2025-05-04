import { API_BASE_URL } from '@/constants';
import { TravelNote } from '@/types/travelNote';

export async function fetchTravelNotes({
  page,
  pageSize,
  status,
  keyword,
  from,
  to,
  token,
}: {
  page: number;
  pageSize: number;
  status: string;
  keyword: string;
  from?: string;
  to?: string;
  token: string | null;
}): Promise<{
  total: number;
  page: number;
  pageSize: number;
  data: TravelNote[];
}> {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('pageSize', String(pageSize));
  if (status !== 'all') params.append('status', status);
  if (keyword) params.append('keyword', keyword);
  if (from) params.append('from', from);
  if (to) params.append('to', to);

  const resp = await fetch(`${API_BASE_URL}/review?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`request ${API_BASE_URL}/review?${params.toString()}`);

  if (!resp.ok) {
    if (resp.status === 401) {
      throw new Error('未授权，请重新登录');
    }
    throw new Error('获取数据失败');
  }
  return resp.json();
}

export async function approveReview({ id, token }: { id: string; token: string | null }) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}/approve`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error('操作失败');
  }
  return resp.json();
}

export async function rejectReview({
  id,
  reason,
  token,
}: {
  id: string;
  reason: string;
  token: string | null;
}) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}/reject`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rejectReason: reason }),
  });
  if (!resp.ok) {
    throw new Error('操作失败');
  }
  return resp.json();
}

export async function deleteReview({ id, token }: { id: string; token: string | null }) {
  const resp = await fetch(`${API_BASE_URL}/review/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error('删除失败');
  }
  return resp.json();
}

import React from 'react';
import './StatusTag.scss';

const statusMap: Record<string, { text: string; className: string }> = {
  APPROVED: { text: '已通过', className: 'status-approved' },
  PENDING: { text: '待审核', className: 'status-pending' },
  REJECTED: { text: '已拒绝', className: 'status-rejected' },
};

export default function StatusTag({ status }: { status: string }) {
  const info = statusMap[status] || { text: status, className: '' };
  return <span className={`status-tag ${info.className}`}>{info.text}</span>;
}

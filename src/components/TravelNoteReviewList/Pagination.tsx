import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="pagination-bar">
      <span>
        显示 {(page - 1) * pageSize + 1} 到 {Math.min(page * pageSize, totalItems)}
        ，共 {totalItems} 条
      </span>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft />
          上一页
        </Button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            variant={page === i + 1 ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight />
          下一页
        </Button>
      </div>
    </div>
  );
}

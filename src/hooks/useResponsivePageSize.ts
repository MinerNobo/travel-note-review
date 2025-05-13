import { useEffect, useState } from 'react';

interface Options {
  rowHeight?: number;
  offset?: number;
  min?: number;
}

export function useResponsivePageSize(options?: Options): number {
  const {
    rowHeight = 85, // 每行的高度
    offset = 400, // 预留高度
    min = 3, // 最小显示行数
  } = options || {};

  const [pageSize, setPageSize] = useState(min);

  useEffect(() => {
    const calculate = () => {
      const availableHeight = window.innerHeight - offset;
      const count = Math.floor(availableHeight / rowHeight);
      setPageSize(Math.max(min, count));
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [rowHeight, offset, min]);

  return pageSize;
}

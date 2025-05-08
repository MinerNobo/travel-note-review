import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';

interface FilterBarProps {
  statusFilter: string;
  searchQuery: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onStatusFilterChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
}

export function FilterBar({
  statusFilter,
  searchQuery,
  dateRange,
  onStatusFilterChange,
  onSearchQueryChange,
  onDateRangeChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label>状态</label>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="PENDING">待审核</SelectItem>
            <SelectItem value="APPROVED">已通过</SelectItem>
            <SelectItem value="REJECTED">已拒绝</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="filter-item">
        <label>关键字</label>
        <div className="input-icon">
          <Search />
          <Input
            placeholder="输入标题或作者"
            value={searchQuery}
            onChange={e => onSearchQueryChange(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-item">
        <label>日期范围</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="date-btn">
              <CalendarIcon />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'yyyy-MM-dd')} - {format(dateRange.to, 'yyyy-MM-dd')}
                  </>
                ) : (
                  format(dateRange.from, 'yyyy-MM-dd')
                )
              ) : (
                <span>选择日期范围</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="calendar-popover"
            align="start"
            sideOffset={4}
            style={{ minWidth: 500 }}
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={range => onDateRangeChange(range || {})}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

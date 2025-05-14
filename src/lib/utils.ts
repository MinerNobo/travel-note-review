import { TravelNote } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 初始化 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertUTCToShanghaiTime(notes: TravelNote[]): TravelNote[] {
  return notes.map(note => ({
    ...note,
    createdAt: dayjs.utc(note.createdAt).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
    ...(note.updatedAt
      ? {
          updatedAt: dayjs.utc(note.updatedAt).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
        }
      : {}),
  }));
}

export function convertToUTCDate(date: Date | undefined): string {
  return date ? dayjs(date).tz('Asia/Shanghai').utc().format('YYYY-MM-DD') : '';
}

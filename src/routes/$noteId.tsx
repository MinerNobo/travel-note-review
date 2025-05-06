import TravelNoteDetailPage from '@/pages/TravelNoteDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$noteId')({
  component: TravelNoteDetailPage,
});

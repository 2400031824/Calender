import { Suspense } from 'react';
import WidgetPageContent from './WidgetPageContent';

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WidgetPageContent />
    </Suspense>
  );
}


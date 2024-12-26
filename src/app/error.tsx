'use client';

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">動画の読み込みに失敗しました</h2>
      <Button onClick={reset}>もう一度試す</Button>
    </div>
  );
} 

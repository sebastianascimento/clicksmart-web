import { Suspense } from 'react';
import GameLayout from '@/components/game/GameLayout';
import GamePageContent from '@/components/GamepageContent';

export default function GamePage() {
  return (
    <GameLayout>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="ml-4 text-green-600 text-lg">Loading game...</p>
        </div>
      }>
        <GamePageContent />
      </Suspense>
    </GameLayout>
  );
}
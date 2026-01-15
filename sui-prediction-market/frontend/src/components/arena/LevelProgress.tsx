'use client';

import { useEffect, useState } from 'react';

interface LevelProgressProps {
  currentXP: number;
  level: number;
  maxXP: number;
  rankName: string;
  rankColor: string;
}

export function LevelProgress({ currentXP, level, maxXP, rankName }: LevelProgressProps) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              Level {level}
            </span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
              {rankName}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
          </div>
        </div>

        {/* Next level preview */}
        <div className="text-right">
          <div className="text-xs text-gray-500">Next Level</div>
          <div className="text-lg font-bold text-gray-900">
            {maxXP - currentXP} XP
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Started</span>
        <span className="text-gray-700 font-medium">
          {maxXP - currentXP <= 50 ? 'Almost there!' : `${Math.floor(percentage)}% Complete`}
        </span>
        <span>Level {level + 1}</span>
      </div>
    </div>
  );
}

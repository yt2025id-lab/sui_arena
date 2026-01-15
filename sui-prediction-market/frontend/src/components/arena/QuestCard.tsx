'use client';

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestCardProps {
  quests: Quest[];
}

export function QuestCard({ quests }: QuestCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Rookie';
      case 'medium': return 'Warrior';
      case 'hard': return 'Legend';
      default: return difficulty;
    }
  };

  const completedCount = quests.filter(q => q.completed).length;
  const totalXP = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Daily Quests
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete quests to earn XP and level up
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">
            {completedCount}/{quests.length}
          </div>
          <div className="text-xs text-gray-500">
            +{totalXP} XP earned
          </div>
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`group relative bg-gray-50 border rounded-lg p-4 transition-all ${
              quest.completed
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left side */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {/* Checkbox */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    quest.completed
                      ? 'bg-green-500'
                      : 'bg-white border-2 border-gray-300'
                  }`}>
                    {quest.completed && <span className="text-white text-sm">✓</span>}
                  </div>

                  {/* Title */}
                  <h3 className={`font-semibold text-gray-900 ${quest.completed ? 'line-through text-gray-500' : ''}`}>
                    {quest.title}
                  </h3>

                  {/* Difficulty badge */}
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getDifficultyColor(quest.difficulty)}`}>
                    {getDifficultyLabel(quest.difficulty)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 ml-8">
                  {quest.description}
                </p>

                {/* Progress bar */}
                {!quest.completed && quest.target > 1 && (
                  <div className="mt-3 ml-8">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{quest.progress}/{quest.target}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 transition-all duration-500"
                        style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - XP reward */}
              <div className="flex flex-col items-end">
                <div className={`text-2xl font-bold transition-colors ${
                  quest.completed ? 'text-green-600' : 'text-gray-900'
                }`}>
                  +{quest.xpReward}
                </div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily streak bonus */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">Daily Streak</div>
            <div className="text-xs text-gray-500">Keep it going!</div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  day <= 3
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-600">
            3 day streak! Keep going for
            <span className="text-gray-900 font-semibold"> 4 more days </span>
            to unlock a Mystery Box
          </span>
        </div>
      </div>
    </div>
  );
}

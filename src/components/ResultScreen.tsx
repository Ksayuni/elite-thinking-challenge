import { useEffect } from 'react';
import { Award, Gift, Plane, GraduationCap, Trophy } from 'lucide-react';
import { getRound1Message, getRound2Message } from '../utils/quizUtils';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  round: number;
  score: number;
  totalQuestions: number;
  reward: string;
  qualifiedForRound2?: boolean;
  onContinueToRound2?: () => void;
  onFinish?: () => void;
}

export default function ResultScreen({
  round,
  score,
  totalQuestions,
  reward,
  qualifiedForRound2,
  onContinueToRound2,
  onFinish
}: ResultScreenProps) {
  const message = round === 1 ? getRound1Message(score) : getRound2Message(score);
  const percentage = (score / totalQuestions) * 100;

  useEffect(() => {
    const shouldCelebrate =
      (round === 1 && score >= 3) ||
      (round === 2 && score >= 6);

    if (shouldCelebrate) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [round, score]);

  const getRewardIcons = () => {
    const icons = [];

    if (round === 1) {
      if (score >= 3) icons.push({ Icon: GraduationCap, label: 'Free Workshop' });
      if (score >= 8) icons.push({ Icon: Gift, label: 'Gift Pack' });
      if (score >= 9) icons.push({ Icon: Award, label: 'Round 2 Qualified' });
    } else {
      if (score >= 6) icons.push({ Icon: Plane, label: 'Educational Tour' });
      if (score >= 8) icons.push({ Icon: Trophy, label: 'Scholarship' });
    }

    return icons;
  };

  const rewardIcons = getRewardIcons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 py-8 px-6 text-center">
            <div className="flex justify-center items-center gap-6 mb-4">
              <img
                src="/WhatsApp_Image_2026-02-20_at_14.43.09_(1).jpeg"
                alt="FLRDF Logo"
                className="h-16 object-contain"
              />
              <img
                src="/WhatsApp_Image_2026-03-19_at_16.01.56.jpeg"
                alt="ACCA Logo"
                className="h-16 object-contain bg-white px-3 py-1 rounded"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Round {round} Complete!
            </h1>
          </div>

          <div className="p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mb-4">
                <span className="text-5xl font-bold text-red-600">
                  {score}/{totalQuestions}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                Your Score: {percentage.toFixed(0)}%
              </div>
              <p className="text-lg text-gray-600">{message}</p>
            </div>

            {rewardIcons.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Rewards</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {rewardIcons.map(({ Icon, label }, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 bg-red-50 p-4 rounded-xl border-2 border-red-200 min-w-[140px]"
                    >
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 text-center">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {round === 1 && qualifiedForRound2 && onContinueToRound2 && (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6">
                  <p className="text-green-800 font-semibold">
                    Congratulations! You are qualified for Round 2
                  </p>
                </div>
                <button
                  onClick={onContinueToRound2}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-700 transition"
                >
                  Continue to Round 2
                </button>
              </div>
            )}

            {round === 1 && !qualifiedForRound2 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 font-semibold">
                    You need at least 9/10 to qualify for Round 2
                  </p>
                </div>
              </div>
            )}

            {round === 2 && onFinish && (
              <button
                onClick={onFinish}
                className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-700 transition"
              >
                Complete
              </button>
            )}

            {round === 1 && !qualifiedForRound2 && (
              <div className="mt-6 text-gray-600">
                <p>Thank you for participating!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

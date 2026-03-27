import { useState, useEffect, useRef } from 'react';
import { ShuffledQuestion } from '../types';
import { Timer, Award, AlertTriangle } from 'lucide-react';
import { useAntiCheat } from '../hooks/useAntiCheat';

interface QuizProps {
  questions: ShuffledQuestion[];
  round: number;
  participantId: string;
  onComplete: (score: number, assignments: any[]) => void;
}

export default function Quiz({ questions, round, participantId, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const { tabSwitchCount, isTabActive } = useAntiCheat({
    onTabSwitch: () => {
      setShowTabWarning(true);
      setTimeout(() => setShowTabWarning(false), 3000);
    },
    enabled: true
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft]);

  const handleTimeout = () => {
    if (isAnswerLocked) return;

    const correctOption = currentQuestion.shuffled_options.find(
      opt => opt.label === currentQuestion.correct_answer
    );

    const answerRecord = {
      participant_id: participantId,
      round,
      question_id: currentQuestion.id,
      question_order: currentQuestionIndex + 1,
      shuffled_options: currentQuestion.shuffled_options,
      user_answer: selectedAnswer || '',
      is_correct: selectedAnswer === currentQuestion.correct_answer,
      time_taken: 20 - timeLeft
    };

    const newAnswers = [...answers, answerRecord];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setTimeLeft(20);
      setIsAnswerLocked(false);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleAnswerSelect = (label: string) => {
    if (isAnswerLocked) return;
    setSelectedAnswer(label);
  };

  const handleNext = () => {
    if (!selectedAnswer || isAnswerLocked) return;

    setIsAnswerLocked(true);

    const answerRecord = {
      participant_id: participantId,
      round,
      question_id: currentQuestion.id,
      question_order: currentQuestionIndex + 1,
      shuffled_options: currentQuestion.shuffled_options,
      user_answer: selectedAnswer,
      is_correct: selectedAnswer === currentQuestion.correct_answer,
      time_taken: 20 - timeLeft
    };

    const newAnswers = [...answers, answerRecord];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setTimeLeft(20);
        setIsAnswerLocked(false);
      } else {
        finishQuiz(newAnswers);
      }
    }, 500);
  };

  const finishQuiz = (finalAnswers: any[]) => {
    const score = finalAnswers.filter(a => a.is_correct).length;
    onComplete(score, finalAnswers);
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-green-600';
    if (timeLeft > 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTimerBgColor = () => {
    if (timeLeft > 10) return 'bg-green-100';
    if (timeLeft > 5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center p-4">
      {showTabWarning && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">Tab switch detected! ({tabSwitchCount})</span>
        </div>
      )}

      {!isTabActive && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center">
          <div className="text-white text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold mb-2">Quiz Paused</h2>
            <p className="text-lg">Please return to this tab to continue</p>
            <p className="text-sm mt-2 text-yellow-400">Tab switches: {tabSwitchCount}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 py-4 px-6">
            <div className="flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Round {round}</span>
              </div>
              <div className="text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <div className="mt-2 h-2 bg-red-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-8">
            <div className={`flex items-center justify-center w-32 h-32 mx-auto rounded-full ${getTimerBgColor()} mb-8 relative`}>
              <Timer className={`w-8 h-8 ${getTimerColor()} absolute top-6`} />
              <div className={`text-6xl font-bold ${getTimerColor()}`}>
                {timeLeft}
              </div>
            </div>

            {currentQuestion.image_url && (
              <div className="mb-6 flex justify-center">
                <img
                  src={currentQuestion.image_url}
                  alt="Question"
                  className="max-w-md max-h-64 rounded-lg shadow-lg"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center select-none">
              {currentQuestion.question_text}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.shuffled_options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.label)}
                  disabled={isAnswerLocked}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all transform hover:scale-[1.02] select-none ${
                    selectedAnswer === option.label
                      ? 'border-red-600 bg-red-50 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-red-400'
                  } ${isAnswerLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                >
                  <span className="text-lg font-medium text-gray-800">
                    {option.value}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer || isAnswerLocked}
              className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAnswerLocked ? 'Moving to next...' : 'Confirm Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

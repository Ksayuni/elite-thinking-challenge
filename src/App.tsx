import { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import Countdown from './components/Countdown';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import { Question, ShuffledQuestion } from './types';
import { supabase } from './lib/supabase';
import { shuffleQuestions, getRound1Reward, getRound2Reward } from './utils/quizUtils';

type AppState =
  | 'registration'
  | 'countdown-round1'
  | 'quiz-round1'
  | 'result-round1'
  | 'countdown-round2'
  | 'quiz-round2'
  | 'result-round2'
  | 'complete';

function App() {
  const [appState, setAppState] = useState<AppState>('registration');
  const [participantId, setParticipantId] = useState<string>('');
  const [round1Questions, setRound1Questions] = useState<ShuffledQuestion[]>([]);
  const [round2Questions, setRound2Questions] = useState<ShuffledQuestion[]>([]);
  const [round1Score, setRound1Score] = useState<number>(0);
  const [round2Score, setRound2Score] = useState<number>(0);
  const [round1Reward, setRound1Reward] = useState<string>('');
  const [round2Reward, setRound2Reward] = useState<string>('');
  const [qualifiedForRound2, setQualifiedForRound2] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegistrationComplete = async (id: string) => {
    setParticipantId(id);
    setIsLoading(true);

    try {
      const { data: questions, error } = await supabase
        .from('round1_questions')
        .select('*')
        .order('question_order');

      if (error) throw error;

      const shuffled = shuffleQuestions(questions as Question[]);
      setRound1Questions(shuffled);
      setAppState('countdown-round1');
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Failed to load questions. Please refresh and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRound1Complete = async (score: number, assignments: any[]) => {
    setRound1Score(score);
    const reward = getRound1Reward(score);
    setRound1Reward(reward);
    const qualified = score >= 9;
    setQualifiedForRound2(qualified);

    try {
      await supabase
        .from('participants')
        .update({
          round1_score: score,
          round1_reward: reward,
          qualified_for_round2: qualified,
          round1_completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('id', participantId);

      for (const assignment of assignments) {
        await supabase
          .from('user_question_assignments')
          .insert([assignment]);
      }
    } catch (error) {
      console.error('Error saving Round 1 results:', error);
    }

    setAppState('result-round1');
  };

  const handleContinueToRound2 = async () => {
    setIsLoading(true);

    try {
      const { data: questions, error } = await supabase
        .from('round2_questions')
        .select('*')
        .order('question_order');

      if (error) throw error;

      const shuffled = shuffleQuestions(questions as Question[]);
      setRound2Questions(shuffled);
      setAppState('countdown-round2');
    } catch (error) {
      console.error('Error loading Round 2 questions:', error);
      alert('Failed to load Round 2 questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRound2Complete = async (score: number, assignments: any[]) => {
    setRound2Score(score);
    const reward = getRound2Reward(score);
    setRound2Reward(reward);

    try {
      await supabase
        .from('participants')
        .update({
          round2_score: score,
          round2_reward: reward,
          round2_completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('id', participantId);

      for (const assignment of assignments) {
        await supabase
          .from('user_question_assignments')
          .insert([assignment]);
      }
    } catch (error) {
      console.error('Error saving Round 2 results:', error);
    }

    setAppState('result-round2');
  };

  const handleFinish = () => {
    setAppState('complete');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  switch (appState) {
    case 'registration':
      return <RegistrationForm onComplete={handleRegistrationComplete} />;

    case 'countdown-round1':
      return <Countdown onComplete={() => setAppState('quiz-round1')} />;

    case 'quiz-round1':
      return (
        <Quiz
          questions={round1Questions}
          round={1}
          participantId={participantId}
          onComplete={handleRound1Complete}
        />
      );

    case 'result-round1':
      return (
        <ResultScreen
          round={1}
          score={round1Score}
          totalQuestions={10}
          reward={round1Reward}
          qualifiedForRound2={qualifiedForRound2}
          onContinueToRound2={qualifiedForRound2 ? handleContinueToRound2 : undefined}
        />
      );

    case 'countdown-round2':
      return <Countdown onComplete={() => setAppState('quiz-round2')} />;

    case 'quiz-round2':
      return (
        <Quiz
          questions={round2Questions}
          round={2}
          participantId={participantId}
          onComplete={handleRound2Complete}
        />
      );

    case 'result-round2':
      return (
        <ResultScreen
          round={2}
          score={round2Score}
          totalQuestions={10}
          reward={round2Reward}
          onFinish={handleFinish}
        />
      );

    case 'complete':
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl text-center">
            <div className="flex justify-center items-center gap-6 mb-6">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You for Participating!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your results have been recorded. We will contact you soon regarding your rewards.
            </p>
            <div className="bg-red-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Round 1 Score:</span> {round1Score}/10
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Round 2 Score:</span> {round2Score}/10
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Round 1 Reward:</span> {round1Reward}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Round 2 Reward:</span> {round2Reward}
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default App;

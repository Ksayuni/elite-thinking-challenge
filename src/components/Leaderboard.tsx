import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  id: string;
  full_name: string;
  round1_score: number;
  round2_score: number;
  completed_at: string;
  school: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [round1Leaders, setRound1Leaders] = useState<LeaderboardEntry[]>([]);
  const [round2Leaders, setRound2Leaders] = useState<LeaderboardEntry[]>([]);
  const [activeRound, setActiveRound] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(true);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data: round1Data } = await supabase
        .from('participants')
        .select('id, full_name, round1_score, round2_score, completed_at, school')
        .eq('display_on_leaderboard', true)
        .eq('round1_completed', true)
        .not('completed_at', 'is', null)
        .order('round1_score', { ascending: false })
        .order('completed_at', { ascending: true })
        .limit(50);

      const { data: round2Data } = await supabase
        .from('participants')
        .select('id, full_name, round1_score, round2_score, completed_at, school')
        .eq('display_on_leaderboard', true)
        .eq('round2_completed', true)
        .not('completed_at', 'is', null)
        .order('round2_score', { ascending: false })
        .order('completed_at', { ascending: true })
        .limit(50);

      const { count } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true })
        .eq('display_on_leaderboard', true);

      setRound1Leaders(round1Data || []);
      setRound2Leaders(round2Data || []);
      setTotalParticipants(count || 0);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-400';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const currentLeaders = activeRound === 1 ? round1Leaders : round2Leaders;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Trophy className="w-16 h-16 animate-bounce mx-auto mb-4" />
          <p className="text-xl font-semibold">Loading Leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          </div>
          <p className="text-red-100 text-lg">Elite 20-Second Challenge Champions</p>

          <div className="flex items-center justify-center gap-4 mt-4 text-white">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{totalParticipants} Participants</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveRound(1)}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeRound === 1
                ? 'bg-white text-red-600 shadow-lg'
                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              <span>Round 1</span>
            </div>
          </button>
          <button
            onClick={() => setActiveRound(2)}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeRound === 2
                ? 'bg-white text-red-600 shadow-lg'
                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Round 2</span>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 py-4 px-6">
            <h2 className="text-white font-semibold text-lg">
              Top 50 Performers - Round {activeRound}
            </h2>
          </div>

          <div className="p-6">
            {currentLeaders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No participants yet</p>
                <p className="text-sm">Be the first to complete Round {activeRound}!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentLeaders.map((entry, index) => {
                  const rank = index + 1;
                  const score = activeRound === 1 ? entry.round1_score : entry.round2_score;
                  const maxScore = 100;
                  const percentage = (score / maxScore) * 100;

                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${getRankBgColor(rank)}`}
                    >
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(rank)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate">{entry.full_name}</h3>
                        <p className="text-sm text-gray-600 truncate">{entry.school}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">
                          {score}
                          <span className="text-sm text-gray-500">/{maxScore}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

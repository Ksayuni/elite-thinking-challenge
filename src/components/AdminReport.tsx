import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Download, Filter } from 'lucide-react';

interface Participant {
  id: string;
  full_name: string;
  email: string;
  contact_no: string;
  school: string;
  grade: string;
  al_stream: string;
  dob: string;
  round1_score: number | null;
  round1_reward: string | null;
  round2_score: number | null;
  round2_reward: string | null;
  qualified_for_round2: boolean;
  round1_completed: boolean;
  round2_completed: boolean;
  created_at: string;
}

export default function AdminReport() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    round: 'all',
    minScore: '',
    stream: 'all',
    grade: 'all'
  });

  useEffect(() => {
    loadParticipants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [participants, filters]);

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...participants];

    if (filters.round === 'round1') {
      filtered = filtered.filter((p) => p.round1_completed);
    } else if (filters.round === 'round2') {
      filtered = filtered.filter((p) => p.round2_completed);
    } else if (filters.round === 'qualified') {
      filtered = filtered.filter((p) => p.qualified_for_round2);
    }

    if (filters.minScore) {
      const minScore = parseInt(filters.minScore, 10);

      if (filters.round === 'round2') {
        filtered = filtered.filter((p) => (p.round2_score || 0) >= minScore);
      } else {
        filtered = filtered.filter((p) => (p.round1_score || 0) >= minScore);
      }
    }

    if (filters.stream !== 'all') {
      filtered = filtered.filter((p) => p.al_stream === filters.stream);
    }

    if (filters.grade !== 'all') {
      filtered = filtered.filter((p) => p.grade === filters.grade);
    }

    setFilteredParticipants(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Contact',
      'School',
      'Grade',
      'Stream',
      'DOB',
      'Round 1 Score',
      'Round 1 Reward',
      'Qualified for Round 2',
      'Round 2 Score',
      'Round 2 Reward',
      'Registration Date'
    ];

    const csvData = filteredParticipants.map((p) => [
      p.full_name,
      p.email,
      p.contact_no,
      p.school,
      p.grade || 'N/A',
      p.al_stream,
      p.dob,
      p.round1_score ?? 'N/A',
      p.round1_reward ?? 'N/A',
      p.qualified_for_round2 ? 'Yes' : 'No',
      p.round2_score ?? 'N/A',
      p.round2_reward ?? 'N/A',
      new Date(p.created_at).toLocaleString()
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Quiz Competition Report</h1>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium mb-1">Total Participants</div>
              <div className="text-3xl font-bold text-blue-900">{participants.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium mb-1">Round 1 Completed</div>
              <div className="text-3xl font-bold text-green-900">
                {participants.filter((p) => p.round1_completed).length}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-orange-600 font-medium mb-1">Qualified for Round 2</div>
              <div className="text-3xl font-bold text-orange-900">
                {participants.filter((p) => p.qualified_for_round2).length}
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-sm text-red-600 font-medium mb-1">Round 2 Completed</div>
              <div className="text-3xl font-bold text-red-900">
                {participants.filter((p) => p.round2_completed).length}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Round</label>
                <select
                  value={filters.round}
                  onChange={(e) => setFilters({ ...filters, round: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Participants</option>
                  <option value="round1">Round 1 Only</option>
                  <option value="round2">Round 2 Only</option>
                  <option value="qualified">Qualified for Round 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
                <select
                  value={filters.stream}
                  onChange={(e) => setFilters({ ...filters, stream: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Streams</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select
                  value={filters.grade}
                  onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Grades</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                  <option value="13">Grade 13</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">School</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stream</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">R1 Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">R1 Reward</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">R2 Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">R2 Reward</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                      No participants match the selected filters
                    </td>
                  </tr>
                ) : (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{participant.full_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{participant.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{participant.contact_no}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{participant.school}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{participant.grade || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{participant.al_stream}</td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        {participant.round1_score !== null ? participant.round1_score : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {participant.round1_reward || '-'}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        {participant.round2_score !== null ? participant.round2_score : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {participant.round2_reward || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredParticipants.length} of {participants.length} participants
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

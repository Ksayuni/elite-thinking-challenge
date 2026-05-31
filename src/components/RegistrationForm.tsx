import { useState } from 'react';
import { RegistrationData, ALStream } from '../types';
import { calculateAge } from '../utils/quizUtils';
import { supabase } from '../lib/supabase';

interface RegistrationFormProps {
  onComplete: (participantId: string) => void;
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    full_name: '',
    dob: '',
    school: '',
    grade: '',
    al_stream: 'Mathematics',
    contact_no: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ageError, setAgeError] = useState<string>('');
  const [currentAge, setCurrentAge] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleDobChange = (dob: string) => {
    setFormData({ ...formData, dob });
    setAgeError('');
    setCurrentAge(null);

    if (dob) {
      const today = new Date().toISOString().split('T')[0];
      if (dob > today) {
        setAgeError('Date of birth cannot be in the future');
        return;
      }

      const age = calculateAge(dob);
      setCurrentAge(age);

      if (age < 14) {
        setAgeError('You must be at least 14 years old to participate');
      } else if (age > 19) {
        setAgeError('This quiz is only for students aged 14-19');
      }
    }
  };

  const formatContactNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');

    if (cleaned.startsWith('+94')) return cleaned;
    if (cleaned.startsWith('94')) return `+${cleaned}`;
    if (cleaned.startsWith('0')) return `+94${cleaned.substring(1)}`;

    return cleaned;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';

    if (!formData.contact_no.trim()) {
      newErrors.contact_no = 'Contact number is required';
    } else if (!/^\+94\d{9}$/.test(formData.contact_no)) {
      newErrors.contact_no = 'Contact number must be in +94 format. Example: +94771234567';
    }

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !ageError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedContactNo = formatContactNumber(formData.contact_no);
    setFormData({ ...formData, contact_no: formattedContactNo });

    const updatedFormData = {
      ...formData,
      contact_no: formattedContactNo
    };

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data: existing } = await supabase
        .from('participants')
        .select('id, email, contact_no')
        .or(`email.eq.${updatedFormData.email},contact_no.eq.${updatedFormData.contact_no}`)
        .maybeSingle();

      if (existing) {
        if (existing.email === updatedFormData.email) {
          setErrors({ ...errors, email: 'This email is already registered' });
        } else {
          setErrors({ ...errors, contact_no: 'This contact number is already registered' });
        }
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('participants')
        .insert([updatedFormData])
        .select()
        .single();

      if (error) throw error;

      onComplete(data.id);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-300 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-hidden">
            <img
              src="/ChatGPT_Image_Mar_24,_2026,_03_10_29_PM.png"
              alt="Elite Thinking Challenge"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="p-10 bg-gradient-to-br from-red-50 to-orange-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                    placeholder="Your full name"
                  />
                  {errors.full_name && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.full_name}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleDobChange(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                  />
                  {currentAge !== null && !ageError && (
                    <p className="text-green-600 text-sm mt-1.5 font-semibold">Your age: {currentAge} years</p>
                  )}
                  {ageError && <p className="text-red-600 text-sm mt-1.5 font-medium">{ageError}</p>}
                  {errors.dob && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.dob}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    School <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                    placeholder="Your school name"
                  />
                  {errors.school && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.school}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Grade <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                    <option value="13">Grade 13</option>
                  </select>
                  {errors.grade && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.grade}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    A/L Stream <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.al_stream}
                    onChange={(e) => setFormData({ ...formData, al_stream: e.target.value as ALStream })}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_no}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_no: formatContactNumber(e.target.value)
                      })
                    }
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                    placeholder="+94771234567"
                  />
                  {errors.contact_no && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.contact_no}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Quiz Tips
                </h3>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span> You’ll have 20 seconds to answer each question.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span> Select your answer and click "Confirm" to proceed to the next question.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Once you confirm an answer, you cannot change it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span> Read each question carefully before selecting your answer.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">📋</span> Terms and Conditions
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">1.</span>
                    <span>Each student is allowed to attempt the quiz only once. Multiple attempts will result in disqualification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">2.</span>
                    <span>The competition is valid only within the specified dates and time. Entries submitted outside this period will not be considered.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">3.</span>
                    <span>All decisions made by the organizers regarding quiz results, eligibility, and disputes are final and binding.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">4.</span>
                    <span>Any details provided by participants will be used solely for communication related to workshops, scholarships, continuous learning opportunities, and claiming prizes.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t-2 border-orange-200">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-2 border-orange-300 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-gray-800 font-medium group-hover:text-orange-700 transition-colors">
                      I have read and agree to the terms and conditions <span className="text-red-600">*</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !!ageError || !agreedToTerms}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Registering...' : 'Start Challenge →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

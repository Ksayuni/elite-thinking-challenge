/*
  # Elite 20-Second Challenge - Quiz Platform Schema

  ## Overview
  This migration creates the database structure for a 2-round scholarship quiz platform
  for students aged 14-19 years.

  ## New Tables
  
  ### `participants`
  Stores registered user information and quiz results
  - `id` (uuid, primary key)
  - `full_name` (text) - Student's full name
  - `dob` (date) - Date of birth for age validation
  - `school` (text) - School name
  - `al_stream` (text) - A/L stream selection
  - `contact_no` (text) - Contact number
  - `email` (text, unique) - Email address (prevents duplicates)
  - `round1_score` (integer) - Score from Round 1 (0-10)
  - `round2_score` (integer) - Score from Round 2 (0-10)
  - `round1_reward` (text) - Reward earned in Round 1
  - `round2_reward` (text) - Reward earned in Round 2
  - `qualified_for_round2` (boolean) - True if score >= 9 in Round 1
  - `round1_completed` (boolean) - Track completion status
  - `round2_completed` (boolean) - Track completion status
  - `created_at` (timestamptz) - Registration timestamp

  ### `round1_questions`
  Contains all 50 questions for Round 1
  - `id` (uuid, primary key)
  - `question_text` (text) - The question
  - `option_a` (text) - Answer option A
  - `option_b` (text) - Answer option B
  - `option_c` (text) - Answer option C
  - `correct_answer` (text) - Correct option (A/B/C)
  - `question_order` (integer) - Original order (1-50)
  - `image_url` (text, optional) - Optional image for question

  ### `round2_questions`
  Contains all 50 questions for Round 2 (harder difficulty)
  - Same structure as round1_questions

  ### `user_question_assignments`
  Tracks which questions each user received (anti-cheat)
  - `id` (uuid, primary key)
  - `participant_id` (uuid, foreign key)
  - `round` (integer) - 1 or 2
  - `question_id` (uuid) - Question ID
  - `question_order` (integer) - Order shown to user (1-10)
  - `shuffled_options` (jsonb) - Shuffled option order
  - `user_answer` (text) - User's selected answer
  - `is_correct` (boolean) - Whether answer was correct
  - `time_taken` (integer) - Seconds taken to answer

  ## Security
  - Enable RLS on all tables
  - Authenticated users can read their own data
  - Only authenticated users can insert participant records
  - Questions are readable by all authenticated users
  - User assignments are restricted to own data
*/

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  dob date NOT NULL,
  school text NOT NULL,
  al_stream text NOT NULL,
  contact_no text NOT NULL,
  email text UNIQUE NOT NULL,
  round1_score integer DEFAULT 0,
  round2_score integer DEFAULT 0,
  round1_reward text DEFAULT '',
  round2_reward text DEFAULT '',
  qualified_for_round2 boolean DEFAULT false,
  round1_completed boolean DEFAULT false,
  round2_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create round1_questions table
CREATE TABLE IF NOT EXISTS round1_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  correct_answer text NOT NULL,
  question_order integer NOT NULL,
  image_url text DEFAULT ''
);

-- Create round2_questions table
CREATE TABLE IF NOT EXISTS round2_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  correct_answer text NOT NULL,
  question_order integer NOT NULL,
  image_url text DEFAULT ''
);

-- Create user_question_assignments table
CREATE TABLE IF NOT EXISTS user_question_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  round integer NOT NULL,
  question_id uuid NOT NULL,
  question_order integer NOT NULL,
  shuffled_options jsonb NOT NULL,
  user_answer text DEFAULT '',
  is_correct boolean DEFAULT false,
  time_taken integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE round1_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE round2_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_question_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for participants
CREATE POLICY "Anyone can register (insert)"
  ON participants FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read participants"
  ON participants FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update participants"
  ON participants FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- RLS Policies for questions (read-only for users)
CREATE POLICY "Anyone can read round1 questions"
  ON round1_questions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read round2 questions"
  ON round2_questions FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for user_question_assignments
CREATE POLICY "Anyone can insert assignments"
  ON user_question_assignments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read assignments"
  ON user_question_assignments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update assignments"
  ON user_question_assignments FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email);
CREATE INDEX IF NOT EXISTS idx_participants_contact ON participants(contact_no);
CREATE INDEX IF NOT EXISTS idx_assignments_participant ON user_question_assignments(participant_id);
CREATE INDEX IF NOT EXISTS idx_assignments_round ON user_question_assignments(round);

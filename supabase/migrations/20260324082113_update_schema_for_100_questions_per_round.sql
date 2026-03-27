/*
  # Update Quiz Schema for 100 Questions Per Round

  ## Changes
  1. Modified Tables
    - `participants` table: Updated to track 100 questions per round instead of 10
      - `round1_score` remains integer (0-100)
      - `round2_score` remains integer (0-100)
      - Qualification criteria will be based on percentage/score threshold
    
  2. New Columns
    - Added `question_type` to both round1_questions and round2_questions
      - Allows categorization and better mixing of question types
    
  3. Notes
    - The schema already supports unlimited questions via the question tables
    - We'll populate with 100 questions for each round
    - User assignment table tracks all answered questions
    - No structural changes needed, just data population required
*/

-- Add question_type column to round1_questions if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'round1_questions' AND column_name = 'question_type'
  ) THEN
    ALTER TABLE round1_questions ADD COLUMN question_type text DEFAULT 'general';
  END IF;
END $$;

-- Add question_type column to round2_questions if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'round2_questions' AND column_name = 'question_type'
  ) THEN
    ALTER TABLE round2_questions ADD COLUMN question_type text DEFAULT 'general';
  END IF;
END $$;

-- Update participants table comments for clarity
COMMENT ON COLUMN participants.round1_score IS 'Score out of 100 questions in Round 1';
COMMENT ON COLUMN participants.round2_score IS 'Score out of 100 questions in Round 2';
COMMENT ON COLUMN participants.qualified_for_round2 IS 'Qualified if Round 1 score meets threshold';

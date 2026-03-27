/*
  # Add Option D to Round 2 Questions

  1. Changes
    - Add option_d column to round2_questions table
    - This allows Round 2 questions to have 4 answer choices instead of 3
  
  2. Notes
    - Default value is empty string for backward compatibility
    - Existing questions will need to be updated with the 4th option
*/

-- Add option_d column to round2_questions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'round2_questions' AND column_name = 'option_d'
  ) THEN
    ALTER TABLE round2_questions ADD COLUMN option_d text DEFAULT '';
  END IF;
END $$;

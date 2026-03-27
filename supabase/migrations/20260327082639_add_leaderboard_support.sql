/*
  # Add Leaderboard Support

  1. Changes
    - Add `display_on_leaderboard` column to `participants` table
      - Boolean field to control visibility on public leaderboard
      - Defaults to true (opt-in by default)
    - Add `completed_at` column to track when quiz was completed
    - Add indexes for faster leaderboard queries
  
  2. Security
    - Add policy for public read access to leaderboard data
    - Users can view leaderboard without authentication
*/

-- Add display_on_leaderboard column to participants table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'display_on_leaderboard'
  ) THEN
    ALTER TABLE participants ADD COLUMN display_on_leaderboard boolean DEFAULT true;
  END IF;
END $$;

-- Add completed_at column to track completion time
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE participants ADD COLUMN completed_at timestamptz;
  END IF;
END $$;

-- Add indexes for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_participants_round1_score ON participants(round1_score DESC);
CREATE INDEX IF NOT EXISTS idx_participants_round2_score ON participants(round2_score DESC);
CREATE INDEX IF NOT EXISTS idx_participants_completed_at ON participants(completed_at DESC);

-- Add policy for public leaderboard access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'participants' AND policyname = 'Anyone can view leaderboard'
  ) THEN
    CREATE POLICY "Anyone can view leaderboard"
      ON participants FOR SELECT
      TO anon, authenticated
      USING (display_on_leaderboard = true AND completed_at IS NOT NULL);
  END IF;
END $$;
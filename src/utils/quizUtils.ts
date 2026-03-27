import { Question, ShuffledQuestion } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function shuffleQuestions(questions: Question[], count: number = 10): ShuffledQuestion[] {
  const shuffled = shuffleArray(questions);
  const selected = shuffled.slice(0, Math.min(count, questions.length));

  return selected.map(q => {
    const options = [
      { label: 'A', value: q.option_a },
      { label: 'B', value: q.option_b },
      { label: 'C', value: q.option_c }
    ];

    if (q.option_d) {
      options.push({ label: 'D', value: q.option_d });
    }

    const shuffled_options = shuffleArray(options);

    return {
      ...q,
      shuffled_options
    };
  });
}

export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function getRound1Reward(score: number): string {
  if (score >= 9) {
    return 'Workshop + Gift Pack + Round 2 Qualified';
  } else if (score >= 8) {
    return 'Workshop + Gift Pack';
  } else if (score >= 3) {
    return 'Free Workshop';
  }
  return 'No Reward';
}

export function getRound2Reward(score: number): string {
  if (score >= 8) {
    return 'Educational Tour + Scholarship';
  } else if (score >= 6) {
    return 'Educational Tour';
  }
  return 'Participation';
}

export function getRound1Message(score: number): string {
  if (score >= 9) {
    return 'Congratulations! You won a Workshop + Gift Pack + You are selected for Round 2!';
  } else if (score >= 8) {
    return 'Well done! Workshop + Gift Pack unlocked!';
  } else if (score >= 3) {
    return 'Good job! You won a Free Workshop!';
  }
  return 'Good attempt! Keep practicing.';
}

export function getRound2Message(score: number): string {
  if (score >= 8) {
    return 'Congratulations! You won a Scholarship + Educational Tour!';
  } else if (score >= 6) {
    return 'Excellent! You won an Educational Tour!';
  }
  return 'Good effort! Keep improving.';
}

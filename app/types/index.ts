export interface VocabularyItem {
  german: string;
  english: string;
  arabic: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  level: string;
  description: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarRule;
  quiz: QuizQuestion[];
  sentences: string[];
}

export interface UserProgress {
  completedLessons: number[];
  quizScores: Record<number, number>;
  learnedWords: string[];
  streak: number;
  lastStudyDate: string | null;
  totalWordsLearned: number;
}

export interface FlashcardState {
  currentIndex: number;
  showAnswer: boolean;
  knownWords: string[];
  practiceWords: string[];
}

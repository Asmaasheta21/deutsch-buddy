"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress } from "../types";

const STORAGE_KEY = "deutsch-buddy-progress";

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  learnedWords: [],
  streak: 0,
  lastStudyDate: null,
  totalWordsLearned: 0,
};

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading progress:", e);
  }
  return defaultProgress;
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error saving progress:", e);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveProgress(progress);
    }
  }, [progress, isLoaded]);

  const completeLesson = useCallback((lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, []);

  const saveQuizScore = useCallback((lessonId: number, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [lessonId]: score },
    }));
  }, []);

  const addLearnedWords = useCallback((words: string[]) => {
    setProgress((prev) => {
      const newWords = words.filter((w) => !prev.learnedWords.includes(w));
      if (newWords.length === 0) return prev;
      return {
        ...prev,
        learnedWords: [...prev.learnedWords, ...newWords],
        totalWordsLearned: prev.totalWordsLearned + newWords.length,
      };
    });
  }, []);

  const markWordAsKnown = useCallback((word: string) => {
    setProgress((prev) => {
      if (prev.learnedWords.includes(word)) return prev;
      return {
        ...prev,
        learnedWords: [...prev.learnedWords, word],
        totalWordsLearned: prev.totalWordsLearned + 1,
      };
    });
  }, []);

  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const today = new Date().toISOString().split("T")[0];
      if (prev.lastStudyDate === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const newStreak = prev.lastStudyDate === yesterdayStr ? prev.streak + 1 : 1;

      return {
        ...prev,
        streak: newStreak,
        lastStudyDate: today,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const getQuizAccuracy = useCallback(() => {
    const scores = Object.values(progress.quizScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [progress.quizScores]);

  return {
    progress,
    isLoaded,
    completeLesson,
    saveQuizScore,
    addLearnedWords,
    markWordAsKnown,
    updateStreak,
    resetProgress,
    getQuizAccuracy,
  };
}

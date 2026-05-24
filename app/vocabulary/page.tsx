"use client";

import { useState, useEffect, useCallback } from "react";
import { useProgress } from "../hooks/useProgress";
import lessons from "../data/lessons";
import { 
  Brain, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Volume2,
  Filter,
  Shuffle
} from "lucide-react";

type CardMode = "all" | "known" | "practice";

export default function VocabularyPage() {
  const { progress, markWordAsKnown } = useProgress();

  // Flatten all vocabulary
  const allWords = lessons.flatMap((lesson) =>
    lesson.vocabulary.map((word) => ({
      ...word,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<CardMode>("all");
  const [shuffled, setShuffled] = useState(false);
  const [direction, setDirection] = useState<"de-en" | "en-de">("de-en");

  const getFilteredWords = useCallback(() => {
    let words = [...allWords];
    if (shuffled) {
      words = words.sort(() => Math.random() - 0.5);
    }
    if (mode === "known") {
      words = words.filter((w) => progress.learnedWords.includes(w.german));
    } else if (mode === "practice") {
      words = words.filter((w) => !progress.learnedWords.includes(w.german));
    }
    return words;
  }, [allWords, mode, progress.learnedWords, shuffled]);

  const filteredWords = getFilteredWords();
  const currentWord = filteredWords[currentIndex];
  const isKnown = currentWord ? progress.learnedWords.includes(currentWord.german) : false;

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const handleKnow = () => {
    if (currentWord) {
      markWordAsKnown(currentWord.german);
    }
    handleNext();
  };

  const handlePractice = () => {
    handleNext();
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const knownCount = progress.learnedWords.length;
  const totalCount = allWords.length;

  if (filteredWords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="section-container py-20 text-center">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No words in this filter</h2>
          <p className="text-gray-600 mb-6">Try changing the filter mode.</p>
          <button onClick={() => setMode("all")} className="btn-primary">
            Show All Words
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Vocabulary Trainer</h1>
                <p className="text-gray-600 mt-1">
                  {knownCount} of {totalCount} words learned
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShuffled(!shuffled)}
                className={`p-3 rounded-xl transition-all ${shuffled ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                title="Shuffle"
              >
                <Shuffle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDirection(direction === "de-en" ? "en-de" : "de-en")}
                className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                title="Flip direction"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-4">
            <Filter className="w-4 h-4 text-gray-400" />
            {(["all", "known", "practice"] as CardMode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setCurrentIndex(0); setShowAnswer(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {m === "all" && `All (${totalCount})`}
                {m === "known" && `Known (${knownCount})`}
                {m === "practice" && `Practice (${totalCount - knownCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="section-container py-12">
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Card {currentIndex + 1} of {filteredWords.length}</span>
              <span className="text-purple-600 font-medium">{isKnown ? "Known ✓" : "New"}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div
            className={`relative bg-white rounded-3xl border-2 p-8 md:p-12 text-center transition-all duration-300 min-h-[320px] flex flex-col items-center justify-center ${
              showAnswer ? "border-purple-300 shadow-xl" : "border-gray-200 shadow-lg"
            }`}
          >
            {currentWord && (
              <>
                <span className="absolute top-4 left-4 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  {currentWord.lessonTitle}
                </span>

                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {direction === "de-en" ? currentWord.german : currentWord.english}
                  </h2>
                  {showAnswer && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="text-xl text-gray-700 font-medium">
                        {direction === "de-en" ? currentWord.english : currentWord.german}
                      </p>
                      <p className="text-lg text-gray-500" dir="rtl">
                        {currentWord.arabic}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => speak(currentWord.german)}
                  className="p-3 rounded-full hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-colors mb-4"
                >
                  <Volume2 className="w-6 h-6" />
                </button>

                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="btn-primary flex items-center gap-2 mx-auto"
                  >
                    <Eye className="w-5 h-5" />
                    Show Answer
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePractice}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                    >
                      <XCircle className="w-5 h-5" />
                      Need Practice
                    </button>
                    <button
                      onClick={handleKnow}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      I Know It
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="btn-secondary flex items-center gap-2"
            >
              Next Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

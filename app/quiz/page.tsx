"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "../hooks/useProgress";
import lessons from "../data/lessons";
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const lessonIdParam = searchParams.get("lesson");
  const [selectedLesson, setSelectedLesson] = useState<number | "all">(
    lessonIdParam ? Number(lessonIdParam) : "all"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<{ question: string; correct: boolean; selected: string }[]>([]);

  const { progress, saveQuizScore, updateStreak } = useProgress();

  // Get questions
  const getQuestions = () => {
    if (selectedLesson === "all") {
      return lessons.flatMap((l) =>
        l.quiz.map((q) => ({ ...q, lessonId: l.id, lessonTitle: l.title }))
      );
    }
    const lesson = lessons.find((l) => l.id === selectedLesson);
    return lesson
      ? lesson.quiz.map((q) => ({ ...q, lessonId: lesson.id, lessonTitle: lesson.title }))
      : [];
  };

  const questions = getQuestions();
  const currentQ = questions[currentQuestion];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    setShowResult(true);

    const isCorrect = option === currentQ.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      { question: currentQ.question, correct: isCorrect, selected: option },
    ]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      if (selectedLesson !== "all") {
        const accuracy = Math.round((score + (selectedAnswer === currentQ?.answer ? 1 : 0)) / questions.length * 100);
        saveQuizScore(Number(selectedLesson), accuracy);
      }
      updateStreak();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const finalScore = quizComplete
    ? Math.round((score / questions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quiz</h1>
              <p className="text-gray-600 mt-1">Test your German knowledge</p>
            </div>
          </div>

          {/* Lesson Selector */}
          {!quizComplete && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <button
                onClick={() => { setSelectedLesson("all"); handleRestart(); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedLesson === "all"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Lessons
              </button>
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => { setSelectedLesson(lesson.id); handleRestart(); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedLesson === lesson.id
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Content */}
      <div className="section-container py-12">
        {questions.length === 0 ? (
          <div className="text-center py-20">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No questions available.</p>
          </div>
        ) : quizComplete ? (
          /* Results Screen */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-amber-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600 mb-8">
                You answered {score} out of {questions.length} questions correctly.
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${finalScore >= 70 ? "text-green-600" : finalScore >= 50 ? "text-amber-600" : "text-red-600"}`}>
                    {finalScore}%
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Accuracy</p>
                </div>
              </div>

              {/* Answer Review */}
              <div className="text-left space-y-3 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Review</h3>
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl ${a.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                  >
                    <div className="flex items-start gap-3">
                      {a.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{a.question}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your answer: <span className={a.correct ? "text-green-700 font-medium" : "text-red-700 font-medium"}>{a.selected}</span>
                        </p>
                        {!a.correct && (
                          <p className="text-sm text-green-700 mt-1">
                            Correct: {questions.find((q) => q.question === a.question)?.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={handleRestart} className="btn-primary flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
                <Link href="/lesson">
                  <button className="btn-secondary flex items-center gap-2">
                    Back to Lessons <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Question Screen */
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className="font-medium">Score: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {currentQ && (
              <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {currentQ.lessonTitle}
                </span>

                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {currentQ.question}
                  </h2>
                  <button
                    onClick={() => speak(currentQ.question)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQ.answer;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
                          showCorrect
                            ? "border-green-500 bg-green-50 text-green-800"
                            : showWrong
                            ? "border-red-500 bg-red-50 text-red-800"
                            : isSelected
                            ? "border-amber-500 bg-amber-50 text-amber-800"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResult && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-blue-800 text-sm leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                {showResult && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="btn-primary flex items-center gap-2"
                    >
                      {currentQuestion < questions.length - 1 ? (
                        <>
                          Next Question <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Finish Quiz <Trophy className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

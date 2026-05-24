"use client";

import { useProgress } from "../hooks/useProgress";
import lessons from "../data/lessons";
import {
  BarChart3,
  Trophy,
  Flame,
  BookOpen,
  Brain,
  Target,
  RotateCcw,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ProgressPage() {
  const { progress, getQuizAccuracy, resetProgress } = useProgress();

  const completedCount = progress.completedLessons.length;
  const totalLessons = lessons.length;
  const quizAccuracy = getQuizAccuracy();
  const totalWords = lessons.reduce((acc, l) => acc + l.vocabulary.length, 0);
  const wordsLearned = progress.totalWordsLearned;

  const getLevel = () => {
    if (completedCount === 0) return "Beginner";
    if (completedCount <= 2) return "A1.1 Starter";
    if (completedCount <= 4) return "A1.1 Progress";
    return "A1.1 Complete";
  };

  const getMotivation = () => {
    if (completedCount === 0) return "Every expert was once a beginner. Start your first lesson today!";
    if (completedCount === totalLessons) return "Incredible! You've completed all A1.1 lessons. Ready for A1.2?";
    if (progress.streak >= 3) return "You're on fire! Keep that streak going!";
    if (quizAccuracy >= 80) return "Amazing quiz scores! Your German is improving fast.";
    return "Keep going! Consistency is the key to mastering German.";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
              <p className="text-gray-600 mt-1">Track your German learning journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Motivation Card */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{getLevel()}</h2>
              <p className="text-primary-100">{getMotivation()}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-sm text-gray-500">Lessons Done</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{wordsLearned}</p>
            <p className="text-sm text-gray-500">Words Learned</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{quizAccuracy}%</p>
            <p className="text-sm text-gray-500">Quiz Accuracy</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{progress.streak}</p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lessons Progress */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Lesson Progress
              </h3>
              <span className="text-sm text-gray-500">
                {completedCount}/{totalLessons}
              </span>
            </div>
            <div className="space-y-3">
              {lessons.map((lesson) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const quizScore = progress.quizScores[lesson.id];
                return (
                  <div key={lesson.id} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Trophy className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{lesson.id}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                        {lesson.title}
                      </p>
                      {quizScore !== undefined && (
                        <p className="text-xs text-gray-400">Quiz: {quizScore}%</p>
                      )}
                    </div>
                    {isCompleted && (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-amber-600" />
              Achievements
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: BookOpen,
                  title: "First Steps",
                  desc: "Complete your first lesson",
                  unlocked: completedCount >= 1,
                  color: "blue",
                },
                {
                  icon: Brain,
                  title: "Word Collector",
                  desc: "Learn 20 words",
                  unlocked: wordsLearned >= 20,
                  color: "purple",
                },
                {
                  icon: Target,
                  title: "Quiz Master",
                  desc: "Get 100% on any quiz",
                  unlocked: Object.values(progress.quizScores).some((s) => s === 100),
                  color: "amber",
                },
                {
                  icon: Flame,
                  title: "On Fire",
                  desc: "Maintain a 3-day streak",
                  unlocked: progress.streak >= 3,
                  color: "orange",
                },
                {
                  icon: Trophy,
                  title: "A1.1 Graduate",
                  desc: "Complete all 5 lessons",
                  unlocked: completedCount === totalLessons,
                  color: "green",
                },
              ].map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.title}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      achievement.unlocked
                        ? "bg-gray-50"
                        : "bg-gray-50/50 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        achievement.unlocked
                          ? `bg-${achievement.color}-100 text-${achievement.color}-600`
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-400">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 p-6">
          <div>
            <h3 className="font-bold text-gray-900">Continue Learning</h3>
            <p className="text-sm text-gray-500">Pick up where you left off</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/lesson">
              <button className="btn-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Go to Lessons
              </button>
            </Link>
            <button
              onClick={() => {
                if (confirm("Are you sure? This will reset all your progress.")) {
                  resetProgress();
                }
              }}
              className="p-3 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
              title="Reset Progress"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useProgress } from "../hooks/useProgress";
import lessons from "../data/lessons";
import LessonCard from "../components/LessonCard";
import ProgressBar from "../components/ProgressBar";
import { BookOpen, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LessonsPage() {
  const { progress } = useProgress();
  const completedCount = progress.completedLessons.length;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Lessons</h1>
                <p className="text-gray-600 mt-1">
                  {totalLessons} lessons to get you started with German A1
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-primary-50 rounded-xl px-4 py-3">
              <Trophy className="w-5 h-5 text-primary-600" />
              <div>
                <p className="text-sm font-semibold text-primary-700">
                  {completedCount} / {totalLessons} Completed
                </p>
                <ProgressBar 
                  progress={completedCount} 
                  total={totalLessons} 
                  color="bg-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={progress.completedLessons.includes(lesson.id)}
            />
          ))}
        </div>

        {/* Next Steps */}
        {completedCount === totalLessons && (
          <div className="mt-12 text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Amazing! You completed all lessons!
              </h2>
              <p className="text-gray-600 mb-6">
                Keep practicing with vocabulary cards and quizzes to reinforce what you've learned.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/vocabulary">
                  <button className="btn-primary flex items-center gap-2">
                    Practice Vocabulary <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/quiz">
                  <button className="btn-secondary flex items-center gap-2">
                    Take a Quiz <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

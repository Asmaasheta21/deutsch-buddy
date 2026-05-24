"use client";

import Link from "next/link";
import { BookOpen, Brain, Layers, BarChart3, ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { useProgress } from "./hooks/useProgress";
import lessons from "./data/lessons";
import LessonCard from "./components/LessonCard";
import ProgressBar from "./components/ProgressBar";

const features = [
  {
    icon: Layers,
    title: "Daily Lessons",
    description: "Bite-sized lessons with vocabulary, grammar, and examples.",
    color: "bg-blue-50 text-blue-600",
    href: "/lesson",
  },
  {
    icon: Brain,
    title: "Vocabulary Cards",
    description: "Flashcards with German, English, and Arabic translations.",
    color: "bg-purple-50 text-purple-600",
    href: "/vocabulary",
  },
  {
    icon: Zap,
    title: "Quick Quizzes",
    description: "Test your knowledge with multiple choice questions.",
    color: "bg-amber-50 text-amber-600",
    href: "/quiz",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "See your streak, words learned, and quiz accuracy.",
    color: "bg-green-50 text-green-600",
    href: "/progress",
  },
];

export default function HomePage() {
  const { progress, isLoaded } = useProgress();

  const completedCount = progress.completedLessons.length;
  const totalLessons = lessons.length;
  const nextLesson = lessons.find((l) => !progress.completedLessons.includes(l.id));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-german-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Free German Learning for A1 Beginners</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Learn German{" "}
              <span className="gradient-text">One Tiny Step</span>
              <br />
              at a Time
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start with simple daily lessons, vocabulary practice, grammar bites, and quick quizzes. 
              No overwhelming courses — just small, consistent progress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {nextLesson ? (
                <Link href={`/lesson/${nextLesson.id}`}>
                  <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                    <Target className="w-5 h-5" />
                    Start Today's Lesson
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              ) : (
                <Link href="/lesson">
                  <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                    <BookOpen className="w-5 h-5" />
                    Browse All Lessons
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              )}
              <Link href="/vocabulary">
                <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                  <Brain className="w-5 h-5" />
                  Practice Vocabulary
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      {isLoaded && completedCount > 0 && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="section-container">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <BarChart3 className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">Your Progress</h2>
                    <p className="text-gray-600 text-sm">
                      {completedCount} of {totalLessons} lessons completed
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <ProgressBar 
                    progress={completedCount} 
                    total={totalLessons} 
                    color="bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                </div>
                <Link href="/progress">
                  <button className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center gap-1 whitespace-nowrap">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              A complete learning toolkit designed for beginners who want to learn German without the overwhelm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.href}>
                  <div className="card-hover bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Lessons */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Lessons</h2>
              <p className="text-gray-600">Start with any lesson — they're all A1 level friendly.</p>
            </div>
            <Link href="/lesson">
              <button className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.slice(0, 3).map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={progress.completedLessons.includes(lesson.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              No sign-up required. Your progress is saved locally in your browser. 
              Just open the site and start learning!
            </p>
            <Link href={nextLesson ? `/lesson/${nextLesson.id}` : "/lesson"}>
              <button className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg">
                {nextLesson ? "Start Your First Lesson" : "Continue Learning"}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useProgress } from "../../hooks/useProgress";
import lessons from "../../data/lessons";
import { 
  BookOpen, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Lightbulb,
  GraduationCap,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = Number(params.id);
  const lesson = lessons.find((l) => l.id === lessonId);

  const { progress, completeLesson, updateStreak, addLearnedWords } = useProgress();
  const [activeTab, setActiveTab] = useState<"vocab" | "grammar" | "sentences">("vocab");
  const [expandedGrammar, setExpandedGrammar] = useState(true);

  if (!lesson) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
        <Link href="/lesson">
          <button className="btn-primary">Back to Lessons</button>
        </Link>
      </div>
    );
  }

  const isCompleted = progress.completedLessons.includes(lesson.id);
  const prevLesson = lessons.find((l) => l.id === lesson.id - 1);
  const nextLesson = lessons.find((l) => l.id === lesson.id + 1);

  const handleComplete = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      addLearnedWords(lesson.vocabulary.map((v) => v.german));
      updateStreak();
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/lesson">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">All Lessons</span>
              </button>
            </Link>
            <div className="flex items-center gap-2">
              {prevLesson && (
                <Link href={`/lesson/${prevLesson.id}`}>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </Link>
              )}
              <span className="text-sm font-medium text-gray-500">
                {lesson.id} / {lessons.length}
              </span>
              {nextLesson && (
                <Link href={`/lesson/${nextLesson.id}`}>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {lesson.level}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="section-container">
          <div className="flex gap-1">
            {(["vocab", "grammar", "sentences"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-primary-500 text-primary-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "vocab" && (
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Vocabulary ({lesson.vocabulary.length})
                  </span>
                )}
                {tab === "grammar" && (
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Grammar
                  </span>
                )}
                {tab === "sentences" && (
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Example Sentences
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-8">
        {/* Vocabulary Tab */}
        {activeTab === "vocab" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.vocabulary.map((word, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{word.german}</h3>
                    <button
                      onClick={() => speak(word.german)}
                      className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700 font-medium">{word.english}</p>
                    <p className="text-gray-500 text-sm" dir="rtl">{word.arabic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Tab */}
        {activeTab === "grammar" && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedGrammar(!expandedGrammar)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{lesson.grammar.title}</h2>
                </div>
                {expandedGrammar ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedGrammar && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {lesson.grammar.explanation}
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      Examples
                    </h3>
                    {lesson.grammar.examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-primary-50 rounded-xl p-4 flex items-center justify-between group"
                      >
                        <p className="text-gray-800 font-medium">{example}</p>
                        <button
                          onClick={() => speak(example.split("=")[0].trim())}
                          className="p-2 rounded-lg hover:bg-primary-100 text-gray-400 hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sentences Tab */}
        {activeTab === "sentences" && (
          <div className="max-w-3xl space-y-4">
            {lesson.sentences.map((sentence, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-lg font-medium text-gray-900">{sentence}</p>
                </div>
                <button
                  onClick={() => speak(sentence)}
                  className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-40">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {prevLesson && (
                <Link href={`/lesson/${prevLesson.id}`}>
                  <button className="btn-secondary flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4">
              {!isCompleted ? (
                <button
                  onClick={handleComplete}
                  className="btn-primary flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Complete
                </button>
              ) : (
                <Link href={`/quiz?lesson=${lesson.id}`}>
                  <button className="btn-primary flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700">
                    Take Quiz <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              )}
              {nextLesson && (
                <Link href={`/lesson/${nextLesson.id}`}>
                  <button className="btn-secondary flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { CheckCircle, Circle, BookOpen, ArrowRight } from "lucide-react";
import { Lesson } from "../types";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
}

export default function LessonCard({ lesson, isCompleted }: LessonCardProps) {
  return (
    <Link href={`/lesson/${lesson.id}`}>
      <div className={`card-hover bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer ${
        isCompleted 
          ? "border-green-200 bg-green-50/30" 
          : "border-gray-100 hover:border-primary-200"
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isCompleted 
                ? "bg-green-100 text-green-600" 
                : "bg-primary-100 text-primary-600"
            }`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                {lesson.level}
              </span>
              <h3 className="font-bold text-gray-900 mt-1">{lesson.title}</h3>
            </div>
          </div>
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{lesson.vocabulary.length} words</span>
            <span>{lesson.quiz.length} questions</span>
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isCompleted ? "text-green-600" : "text-primary-600"
          }`}>
            {isCompleted ? "Completed" : "Start Lesson"}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

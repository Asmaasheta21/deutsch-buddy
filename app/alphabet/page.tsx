"use client";

import { Volume2, Hash } from "lucide-react";

interface LetterData {
  letter: string;
  pronunciation: string;
  example: string;
  english: string;
  arabic: string;
}

const alphabetData: LetterData[] = [
  { letter: "A a", pronunciation: "آه", example: "Apfel", english: "apple", arabic: "تفاحة" },
  { letter: "B b", pronunciation: "بيه", example: "Buch", english: "book", arabic: "كتاب" },
  { letter: "C c", pronunciation: "تسيه", example: "Café", english: "café", arabic: "مقهى" },
  { letter: "D d", pronunciation: "ديه", example: "Danke", english: "thank you", arabic: "شكراً" },
  { letter: "E e", pronunciation: "إيه", example: "Elefant", english: "elephant", arabic: "فيل" },
  { letter: "F f", pronunciation: "إف", example: "Freund", english: "friend", arabic: "صديق" },
  { letter: "G g", pronunciation: "غيه", example: "Guten Morgen", english: "good morning", arabic: "صباح الخير" },
  { letter: "H h", pronunciation: "هآه", example: "Haus", english: "house", arabic: "منزل" },
  { letter: "I i", pronunciation: "إي", example: "Ich", english: "I", arabic: "أنا" },
  { letter: "J j", pronunciation: "يوت / يه", example: "Ja", english: "yes", arabic: "نعم" },
  { letter: "K k", pronunciation: "كآه", example: "Kind", english: "child", arabic: "طفل" },
  { letter: "L l", pronunciation: "إل", example: "Liebe", english: "love", arabic: "حب" },
  { letter: "M m", pronunciation: "إم", example: "Mutter", english: "mother", arabic: "أم" },
  { letter: "N n", pronunciation: "إن", example: "Nacht", english: "night", arabic: "ليل" },
  { letter: "O o", pronunciation: "أوه", example: "Osten", english: "east", arabic: "شرق" },
  { letter: "P p", pronunciation: "پيه", example: "Papa", english: "dad", arabic: "أب" },
  { letter: "Q q", pronunciation: "كو", example: "Qualität", english: "quality", arabic: "جودة" },
  { letter: "R r", pronunciation: "إر (م رّة)", example: "Rot", english: "red", arabic: "أحمر" },
  { letter: "S s", pronunciation: "إس", example: "Sonne", english: "sun", arabic: "شمس" },
  { letter: "T t", pronunciation: "تيه", example: "Tisch", english: "table", arabic: "طاولة" },
  { letter: "U u", pronunciation: "أو", example: "Uhr", english: "clock", arabic: "ساعة" },
  { letter: "V v", pronunciation: "فاو", example: "Vater", english: "father", arabic: "أب" },
  { letter: "W w", pronunciation: "ڤيه", example: "Wasser", english: "water", arabic: "ماء" },
  { letter: "X x", pronunciation: "إكس", example: "Xylophon", english: "xylophone", arabic: "إكسيليفون" },
  { letter: "Y y", pronunciation: "إپسلون / ي", example: "Yoga", english: "yoga", arabic: "يوجا" },
  { letter: "Z z", pronunciation: "تسيت", example: "Zeit", english: "time", arabic: "وقت" },
  { letter: "Ä ä", pronunciation: "آ (مفتوحة)", example: "Äpfel", english: "apples", arabic: "تفاح" },
  { letter: "Ö ö", pronunciation: "أو (شفاه)", example: "Öl", english: "oil", arabic: "زيت" },
  { letter: "Ü ü", pronunciation: "إي (شفاه)", example: "Übung", english: "exercise", arabic: "تمرين" },
  { letter: "ß", pronunciation: "إس طويلة", example: "Straße", english: "street", arabic: "شارع" },
];

function speak(text: string) {
  if (typeof window === "undefined") return;
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

export default function AlphabetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
              <Hash className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">German Alphabet</h1>
              <p className="text-gray-600 mt-1">
                Learn the German alphabet with Arabic pronunciation approximations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alphabet Grid */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {alphabetData.map((item) => (
            <div
              key={item.letter}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">{item.letter.split(" ")[0]}</span>
                </div>
                <button
                  onClick={() => speak(item.example)}
                  className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                  title="Listen"
                  aria-label={`Listen to ${item.example}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{item.letter}</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Pronunciation</p>
                  <p className="text-lg font-semibold text-primary-700" dir="rtl">
                    {item.pronunciation}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Example</p>
                  <p className="text-lg font-semibold text-gray-900">{item.example}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">English</p>
                    <p className="text-sm font-medium text-gray-700">{item.english}</p>
                  </div>
                  <div className="text-right" dir="rtl">
                    <p className="text-sm text-gray-500">Arabic</p>
                    <p className="text-sm font-medium text-gray-700">{item.arabic}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

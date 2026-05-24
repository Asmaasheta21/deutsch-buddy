"use client";

import { Volume2, Headphones } from "lucide-react";

interface PronunciationRule {
  pattern: string;
  arabicExplanation: string;
  example: string;
  english: string;
  arabic: string;
  note?: string;
}

const pronunciationRules: PronunciationRule[] = [
  {
    pattern: "ei",
    arabicExplanation: "تنطق \"آي\" زي الإنجليزي",
    example: "mein",
    english: "my",
    arabic: "لي",
  },
  {
    pattern: "ie",
    arabicExplanation: "تنطق \"إي\" طويلة",
    example: "Liebe",
    english: "love",
    arabic: "حب",
  },
  {
    pattern: "sch",
    arabicExplanation: "تنطق \"ش\" بالعربي",
    example: "Schule",
    english: "school",
    arabic: "مدرسة",
  },
  {
    pattern: "ch",
    arabicExplanation: "بعد a,o,u,u تنطق \"خ\" خشنة. بعد e,i,ä,ö,ü تنطق \"خ\" ناعمة (زي حشرجة)",
    example: "Buch / Ich",
    english: "book / I",
    arabic: "كتاب / أنا",
    note: "Buch = خشنة, Ich = ناعمة",
  },
  {
    pattern: "sp (at start)",
    arabicExplanation: "في أول الكلمة تنطق \"شپ\"",
    example: "Sport",
    english: "sport",
    arabic: "رياضة",
  },
  {
    pattern: "st (at start)",
    arabicExplanation: "في أول الكلمة تنطق \"شت\"",
    example: "Straße",
    english: "street",
    arabic: "شارع",
  },
  {
    pattern: "z",
    arabicExplanation: "تنطق \"تس\"",
    example: "Zeit",
    english: "time",
    arabic: "وقت",
  },
  {
    pattern: "w",
    arabicExplanation: "تنطق \"ڤ\" (V بالإنجليزي)",
    example: "Wasser",
    english: "water",
    arabic: "ماء",
  },
  {
    pattern: "v",
    arabicExplanation: "في أغلب الكلمات تنطق \"ف\"",
    example: "Vater",
    english: "father",
    arabic: "أب",
    note: "في كلمات أجنبية ممكن تنطق \"ڤ\"",
  },
  {
    pattern: "ä",
    arabicExplanation: "تقريباً \"آ\" مفتوحة أو \"إيه\"",
    example: "Äpfel",
    english: "apples",
    arabic: "تفاح",
  },
  {
    pattern: "ö",
    arabicExplanation: "تقريباً \"أو\" بشفاه مضمومة (مافيش زيها بالعربي بالظبط)",
    example: "Öl",
    english: "oil",
    arabic: "زيت",
  },
  {
    pattern: "ü",
    arabicExplanation: "تقريباً \"إي\" بشفاه مضمومة (زي الفرنساوي u)",
    example: "Übung",
    english: "exercise",
    arabic: "تمرين",
  },
  {
    pattern: "ß",
    arabicExplanation: "تنطق \"س\" طويلة / ناعمة (مش زي zz)",
    example: "Straße",
    english: "street",
    arabic: "شارع",
  },
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

export default function PronunciationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center">
              <Headphones className="w-7 h-7 text-secondary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pronunciation Rules</h1>
              <p className="text-gray-600 mt-1">
                Important pronunciation patterns explained for Arabic speakers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pronunciationRules.map((rule) => (
            <div
              key={rule.pattern}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg text-center leading-tight px-1">
                    {rule.pattern}
                  </span>
                </div>
                <button
                  onClick={() => speak(rule.example.split(" / ")[0])}
                  className="p-2 rounded-full bg-secondary-50 text-secondary-600 hover:bg-secondary-100 transition-colors"
                  title="Listen"
                  aria-label={`Listen to ${rule.example}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Arabic Explanation</p>
                  <p className="text-base font-medium text-gray-900" dir="rtl">
                    {rule.arabicExplanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">German Example</p>
                  <p className="text-xl font-bold text-gray-900">{rule.example}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">English</p>
                    <p className="text-sm font-medium text-gray-700">{rule.english}</p>
                  </div>
                  <div className="text-right" dir="rtl">
                    <p className="text-sm text-gray-500">Arabic</p>
                    <p className="text-sm font-medium text-gray-700">{rule.arabic}</p>
                  </div>
                </div>

                {rule.note && (
                  <div className="bg-german-50 rounded-xl p-3 mt-2">
                    <p className="text-sm text-german-800 font-medium">💡 {rule.note}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

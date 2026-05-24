"use client";

import { Volume2, BookOpen } from "lucide-react";

interface GrammarExample {
  german: string;
  english: string;
  arabic: string;
}

interface GrammarTopic {
  title: string;
  arabicTitle: string;
  explanation: string;
  table?: { headers: string[]; rows: string[][] };
  examples: GrammarExample[];
}

const grammarTopics: GrammarTopic[] = [
  {
    title: "Personal Pronouns",
    arabicTitle: "الضمائر الشخصية",
    explanation: "الضمائر في الألماني بتتغير حسب الشخص (مخاطب، متكلم، غائب).",
    table: {
      headers: ["German", "English", "Arabic"],
      rows: [
        ["ich", "I", "أنا"],
        ["du", "you (singular)", "أنتَ"],
        ["er", "he", "هو"],
        ["sie", "she", "هي"],
        ["es", "it", "هو/هي (للجماد/حيوان)"],
        ["wir", "we", "نحن"],
        ["ihr", "you (plural)", "أنتم"],
        ["sie", "they", "هم"],
        ["Sie", "you (formal)", "حضرتك"],
      ],
    },
    examples: [],
  },
  {
    title: "Verb: sein (to be)",
    arabicTitle: "فعل sein (يكون)",
    explanation: "ده أهم فعل في الألماني. معناه \"يكون\" زي am, is, are بالإنجليزي.",
    table: {
      headers: ["Pronoun", "Conjugation", "Arabic"],
      rows: [
        ["ich", "bin", "أنا أكون"],
        ["du", "bist", "أنتَ تكون"],
        ["er/sie/es", "ist", "هو/هي يكون"],
        ["wir", "sind", "نحن نكون"],
        ["ihr", "seid", "أنتم تكونوا"],
        ["sie/Sie", "sind", "هم/حضرتك يكونوا"],
      ],
    },
    examples: [
      { german: "Ich bin müde.", english: "I am tired.", arabic: "أنا تعبان." },
      { german: "Er ist Lehrer.", english: "He is a teacher.", arabic: "هو مدرس." },
      { german: "Wir sind glücklich.", english: "We are happy.", arabic: "نحن سعداء." },
    ],
  },
  {
    title: "Verb: haben (to have)",
    arabicTitle: "فعل haben (يملك)",
    explanation: "معناه \"يملك\" أو \"عنده\". من أهم الأفعال اللي لازم تحفظها.",
    table: {
      headers: ["Pronoun", "Conjugation", "Arabic"],
      rows: [
        ["ich", "habe", "أنا أملك"],
        ["du", "hast", "أنتَ تملك"],
        ["er/sie/es", "hat", "هو/هي يملك"],
        ["wir", "haben", "نحن نملك"],
        ["ihr", "habt", "أنتم تملكوا"],
        ["sie/Sie", "haben", "هم/حضرتك يملكوا"],
      ],
    },
    examples: [
      { german: "Ich habe ein Buch.", english: "I have a book.", arabic: "أنا عندي كتاب." },
      { german: "Du hast Zeit.", english: "You have time.", arabic: "أنت عندك وقت." },
      { german: "Sie hat Hunger.", english: "She is hungry.", arabic: "هي جعانة." },
    ],
  },
  {
    title: "Articles: der / die / das",
    arabicTitle: "الأدوات المعرفة",
    explanation:
      "في الألماني كل اسم ليه جنس (مذكر/مؤنث/محايد). لازم تحفظ المقال مع الكلمة.",
    table: {
      headers: ["Article", "Gender", "Example", "Arabic"],
      rows: [
        ["der", "masculine (مذكر)", "der Mann", "الرجل"],
        ["die", "feminine (مؤنث)", "die Frau", "المرأة"],
        ["das", "neuter (محايد)", "das Kind", "الطفل"],
        ["die (pl.)", "plural (جمع)", "die Kinder", "الأطفال"],
      ],
    },
    examples: [
      { german: "Der Tisch ist groß.", english: "The table is big.", arabic: "الطاولة كبيرة." },
      { german: "Die Tür ist offen.", english: "The door is open.", arabic: "الباب مفتوح." },
      { german: "Das Buch ist neu.", english: "The book is new.", arabic: "الكتاب جديد." },
    ],
  },
  {
    title: "Simple Sentence Order",
    arabicTitle: "ترتيب الجملة البسيط",
    explanation:
      "ترتيب الجملة في الألماني: الفاعل -> الفعل -> المفعول/باقي الجملة. الفعل لازم يكون تاني حاجة.",
    examples: [
      { german: "Ich trinke Wasser.", english: "I drink water.", arabic: "أنا بشرب مياه." },
      { german: "Du liest ein Buch.", english: "You read a book.", arabic: "أنت بتقرأ كتاب." },
      { german: "Er kommt aus Ägypten.", english: "He comes from Egypt.", arabic: "هو جاي من مصر." },
    ],
  },
  {
    title: "Yes/No Questions",
    arabicTitle: "أسئلة نعم/لا",
    explanation:
      "عشان تسأل بـ نعم أو لا، حط الفعل في أول الجملة (قبل الفاعل).",
    examples: [
      { german: "Bist du müde?", english: "Are you tired?", arabic: "أنت تعبان؟" },
      { german: "Hast du Zeit?", english: "Do you have time?", arabic: "عندك وقت؟" },
      { german: "Ist das dein Buch?", english: "Is this your book?", arabic: "ده كتابك؟" },
    ],
  },
  {
    title: "W-Questions",
    arabicTitle: "أسئلة W (استفهامية)",
    explanation:
      "كلمات الاستفهام في الألماني بتبدأ بـ W. الفعل برضه بيجي تاني حاجة بعد كلمة السؤال.",
    table: {
      headers: ["Question Word", "Meaning", "Example"],
      rows: [
        ["Wer", "Who (مين)", "Wer ist das?"],
        ["Was", "What (إيه)", "Was ist das?"],
        ["Wo", "Where (فين)", "Wo wohnst du?"],
        ["Wann", "When (إمتى)", "Wann kommst du?"],
        ["Warum", "Why (ليه)", "Warum bist du müde?"],
        ["Wie", "How (إزاي)", "Wie geht's?"],
      ],
    },
    examples: [
      { german: "Wer bist du?", english: "Who are you?", arabic: "مين أنت؟" },
      { german: "Wo ist das Buch?", english: "Where is the book?", arabic: "فين الكتاب؟" },
      { german: "Wie heißt du?", english: "What is your name?", arabic: "إسمك إيه؟" },
    ],
  },
  {
    title: "Negation: nicht / kein",
    arabicTitle: "النفي: nicht / kein",
    explanation:
      "nicht = لا (بتنفي الفعل أو الصفة). kein = لا / مش (بتنفي الاسم، يعني بدل a/an).",
    examples: [
      { german: "Ich bin nicht müde.", english: "I am not tired.", arabic: "أنا مش تعبان." },
      { german: "Das ist nicht gut.", english: "That is not good.", arabic: "ده مش كويس." },
      { german: "Ich habe kein Geld.", english: "I don't have money.", arabic: "أنا معايش فلوس." },
      { german: "Das ist kein Hund.", english: "That is not a dog.", arabic: "ده مش كلب." },
    ],
  },
  {
    title: "Present Tense Basics",
    arabicTitle: "المضارع البسيط",
    explanation:
      "في الألماني مافيش Present Continuous (am doing). بنستخدم نفس الفعل للحاضر. الفعل بيتغير حسب الضمير.",
    table: {
      headers: ["Pronoun", "machen (to do)", "gehen (to go)", "essen (to eat)"],
      rows: [
        ["ich", "mache", "gehe", "esse"],
        ["du", "machst", "gehst", "isst"],
        ["er/sie/es", "macht", "geht", "isst"],
        ["wir", "machen", "gehen", "essen"],
        ["ihr", "macht", "geht", "esst"],
        ["sie/Sie", "machen", "gehen", "essen"],
      ],
    },
    examples: [
      { german: "Ich gehe nach Hause.", english: "I go home.", arabic: "أنا بروح البيت." },
      { german: "Du isst Pizza.", english: "You eat pizza.", arabic: "أنت بتاكل بيتزا." },
      { german: "Wir machen das.", english: "We do that.", arabic: "نحن بنعمل كده." },
    ],
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

export default function GrammarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="section-container py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-german-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-german-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">A1 Grammar</h1>
              <p className="text-gray-600 mt-1">
                Essential grammar topics for A1 beginners explained in Arabic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="section-container py-12 space-y-8">
        {grammarTopics.map((topic) => (
          <div
            key={topic.title}
            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
              <p className="text-lg font-medium text-primary-700 mt-1" dir="rtl">
                {topic.arabicTitle}
              </p>
              <p className="text-gray-600 mt-2" dir="rtl">
                {topic.explanation}
              </p>
            </div>

            {topic.table && (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      {topic.table.headers.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 bg-gray-50 text-gray-700 font-semibold text-sm border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topic.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-3 text-sm text-gray-800"
                            dir={cellIndex === row.length - 1 ? "rtl" : "ltr"}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {topic.examples.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Examples
                </h3>
                {topic.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-gray-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speak(ex.german)}
                        className="p-2 rounded-full bg-white text-german-600 hover:bg-german-50 transition-colors shadow-sm"
                        title="Listen"
                        aria-label={`Listen to ${ex.german}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold text-gray-900">{ex.german}</span>
                    </div>
                    <div className="flex items-center gap-4 md:text-right">
                      <span className="text-sm text-gray-600">{ex.english}</span>
                      <span className="text-sm font-medium text-gray-800" dir="rtl">
                        {ex.arabic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

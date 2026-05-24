"use client";

import { Volume2 } from "lucide-react";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  rate?: number;
  className?: string;
}

export default function SpeakButton({
  text,
  lang = "de-DE",
  rate = 0.8,
  className = "",
}: SpeakButtonProps) {
  const speak = () => {
    if (typeof window === "undefined") return;
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center justify-center p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors ${className}`}
      title="Listen"
      aria-label={`Listen to ${text}`}
    >
      <Volume2 className="w-4 h-4" />
    </button>
  );
}

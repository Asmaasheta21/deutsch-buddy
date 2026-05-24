# Deutsch Buddy 🇩🇪

A personal German learning website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **5 Complete A1 Lessons**: Greetings, Numbers, Days, Family, Basic Verbs
- **Vocabulary Flashcards**: German ↔ English ↔ Arabic with audio pronunciation
- **Interactive Quizzes**: Multiple choice with instant feedback and explanations
- **Progress Tracking**: Streak counter, words learned, quiz accuracy, achievements
- **Local Storage**: All progress saved in your browser — no login needed
- **Text-to-Speech**: Click the speaker icon to hear German pronunciation
- **Fully Responsive**: Works on desktop, tablet, and mobile

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Web Speech API (pronunciation)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to start learning!

## Project Structure

```
app/
├── components/        # Reusable UI components
├── data/             # Lesson data (lessons.ts)
├── hooks/            # Custom React hooks (useProgress)
├── types/            # TypeScript interfaces
├── lesson/           # Lesson pages
├── vocabulary/       # Flashcard trainer
├── quiz/             # Quiz page
├── progress/         # Progress dashboard
├── page.tsx          # Home page
├── layout.tsx        # Root layout
└── globals.css       # Global styles + Tailwind
```

## Data Structure

Lessons are stored in `app/data/lessons.ts` as a static array. Each lesson contains:
- Title & Level (A1.1)
- Vocabulary (German, English, Arabic)
- Grammar rules with examples
- Example sentences
- Quiz questions with explanations

## Future Enhancements (Phase 2+)

- [ ] Supabase backend for user accounts
- [ ] Admin panel to add lessons
- [ ] Audio pronunciation from native speakers
- [ ] AI sentence correction
- [ ] More lessons (A1.2, A2)
- [ ] Dark mode
- [ ] Offline support (PWA)

---

Built with ❤️ for German A1 beginners.

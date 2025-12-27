# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Session feedback app for collecting therapy/counseling session feedback. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Supabase as backend. UI language is Korean.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Type-check with `tsc -b` then build with Vite
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

### Routing
Uses HashRouter (for GitHub Pages compatibility). Two main routes:
- `/feedback` - Multi-step feedback form for clients
- `/admin/generate` - Link generator for counselors to create feedback URLs

### Feedback Flow (10 steps)
The feedback form is a wizard with step-based navigation managed in `FeedbackPage.tsx`:
- Step 0: Start screen
- Step 1: Identification (name or anonymous)
- Steps 2-5: Four SRS (Session Rating Scale) questions with 1-10 slider scores
- Step 6: "Want more" options (checkboxes)
- Step 7: "Want less" options (checkboxes)
- Step 8: Positive feedback (freeform text)
- Step 9: Completion

Low scores (<=5) trigger a modal asking for the reason.

### State Management
Form state is managed by `useFeedbackForm` hook (`src/hooks/useFeedbackForm.ts`), which provides:
- All form field setters
- Step navigation (nextStep, prevStep, goToStep)
- Modal state management
- `getSubmitPayload()` to convert form state to API format

### Data Types
`src/types/feedback.ts` defines:
- `QUESTIONS` array with SRS question definitions
- `WANT_MORE_OPTIONS` and `WANT_LESS_OPTIONS` arrays
- `FeedbackFormState`, `Scores`, `WantMore`, `WantLess` interfaces
- `FeedbackRecord` for Supabase table schema

### Supabase Integration
`src/lib/supabase.ts` provides:
- `generateFeedbackLink(sessionNumber)` - Creates feedback record with token
- `validateToken(token)` - Validates access token and checks edit window (24h)
- `saveFeedback(token, data)` - Saves/updates feedback
- `createReminder(token)` - Schedules 24h reminder

Environment variables needed: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### Component Structure
- `src/components/screens/` - Each wizard step is a separate screen component
- `src/components/modals/` - LowScoreReasonModal, RemindLaterModal
- `src/components/ui/` - Reusable UI primitives (Button, Slider, Checkbox, etc.)
- `src/components/layout/` - ScreenLayout wrapper

### Path Alias
`@/*` maps to `src/*` (configured in tsconfig.json and vite.config.ts)

### Base URL
Configured as `/session_feedback/` in vite.config.ts for GitHub Pages deployment.

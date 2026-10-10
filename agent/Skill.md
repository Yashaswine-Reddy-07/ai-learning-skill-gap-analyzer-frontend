# FRONTEND AGENT SKILL SPECIFICATION: REACT + TYPESCRIPT + VITE
=============================================================

This document provides technical instructions, structural maps, and operational guidelines for Autonomous AI Agents and frontend engineers working on the **AI-Powered Personalized Learning and Skill Gap Analysis System** client application.

---

## 1. FRONTEND TECHNICAL PROFILE

- **Framework**: React 18 with TypeScript 5 (Strict Mode enabled)
- **Bundler**: Vite 5
- **Routing**: React Router DOM v6 with `ProtectedRoute`
- **HTTP Client**: Axios with centralized request/response interceptors
- **Icons**: Lucide React
- **Styling**: Centralized CSS Design System in `src/styles/theme.css` using native CSS Custom Properties. **NO HARDCODED COLORS**.

---

## 2. DIRECTORY STRUCTURE & COMPONENT ROLES

```text
frontend/
├── src/
│   ├── assets/                # Static brand graphics
│   ├── components/
│   │   ├── common/            # Navbar, Footer, ProtectedRoute, LoadingSpinner, EmptyState
│   │   ├── dashboard/         # DashboardHeader, TargetRoleCard, QuizScoreCard, OverallLevelCard,
│   │   │                      # SkillGapCard, SkillGapList, RecommendedNextCard, LearningProgressCard
│   │   ├── quiz/              # QuestionCard, QuizProgressBar, QuizNavigation
│   │   └── learning/          # Milestone action items
│   ├── pages/
│   │   ├── auth/              # LoginPage, RegisterPage
│   │   ├── dashboard/         # DashboardPage
│   │   ├── quiz/              # RoleSelectionPage, QuizPage, QuizResultPage
│   │   ├── skills/            # SkillGapsPage
│   │   └── learning/          # LearningPlanPage, ProfilePage
│   ├── services/
│   │   ├── api.ts             # Central Axios instance with JWT interceptor & error handling
│   │   ├── authApi.ts         # /api/auth/register, /api/auth/login
│   │   ├── studentApi.ts      # /api/students/{id}, /api/students/{id}/goal
│   │   ├── roleApi.ts         # /api/roles, /api/roles/{id}
│   │   ├── quizApi.ts         # /api/roles/{id}/quiz, /api/quiz/submit, /api/quiz/results/{attemptId}
│   │   ├── skillApi.ts        # /api/skills/gaps/{studentId}
│   │   ├── aiApi.ts           # /api/ai/recommendations
│   │   ├── learningPlanApi.ts # /api/learning-plan/{studentId}
│   │   ├── progressApi.ts     # /api/progress/{id}
│   │   └── dashboardApi.ts    # /api/dashboard/{studentId}
│   ├── types/                 # Strongly typed TypeScript interfaces (auth, quiz, result, plan, etc.)
│   ├── hooks/
│   │   └── useAuth.tsx        # AuthContext managing user session and JWT localStorage
│   ├── styles/
│   │   ├── theme.css          # Centralized tokens (Navy headers, light surface, accents, spacing)
│   │   └── global.css         # Utility classes (.card, .btn, .badge, .form-input)
│   ├── App.tsx                # Central router configuration
│   └── main.tsx               # Root entry point
├── .env.example               # VITE_API_BASE_URL=http://localhost:8080/api
├── package.json
└── README.md                  # Frontend development and build instructions
```

---

## 3. STRICT FRONTEND CODING CONSTRAINTS

1. **No Direct Axios Calls**: React components MUST NOT call `axios.get()` or `axios.post()`. All calls must flow through dedicated service modules (`quizApi`, `roleApi`, `authApi`, etc.).
2. **Central Theme Adherence**: Colors, fonts, margins, and borders MUST reference `var(--color-primary)`, `var(--color-surface)`, `var(--spacing-md)`, etc. Never use raw hex codes like `#123456` in component styles.
3. **No Answers in Client State**: The client never receives or computes `correctOption`. Only selected answers are captured and posted to `/api/quiz/submit`.
4. **State Persistence in Quiz**: When students navigate between questions via `Next` or `Previous`, selections in `answers: Record<number, 'A' | 'B' | 'C' | 'D'>` must never be wiped out.
5. **No AI API Keys**: Never expose OpenAI, Gemini, or Claude API keys in `frontend/.env` or Vite configurations.

---

## 4. ESSENTIAL FRONTEND COMMANDS

```powershell
# Install node dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Run TypeScript check and production build
npm run build
```

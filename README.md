# Skill Gap Analyzer — Frontend Application
## React 18 + TypeScript + Vite Client

The frontend application provides a modern, responsive user experience for student onboarding, career role exploration, taking objective skill quizzes, reviewing skill gap analytics, and completing personalized AI learning roadmaps.

---

## 1. Prerequisites

- **Node.js**: Version 18.x or 20.x or higher
- **npm**: Version 9.x or higher

---

## 2. Environment Configuration

Create a `.env` file in the `frontend/` directory by copying `.env.example`:

```bash
cp .env.example .env
```

Configuration variables:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

*(Note: Never place AI API keys or passwords in the frontend environment).*

---

## 3. Running the Client

### Install Dependencies
```powershell
npm install
```

### Start Vite Development Server
```powershell
npm run dev
```

The application will be live at `http://localhost:5173`.

### Production Build
```powershell
npm run build
```

---

## 4. Key Directory Structure

- `src/components/common/`: Shared layout components (Navbar, Footer, ProtectedRoute, LoadingSpinner, EmptyState).
- `src/components/dashboard/`: Modular dashboard widgets (TargetRoleCard, QuizScoreCard, OverallLevelCard, SkillGapList, etc.).
- `src/components/quiz/`: Quiz UI widgets (QuestionCard, QuizProgressBar, QuizNavigation).
- `src/pages/`: Router pages (`LoginPage`, `RegisterPage`, `DashboardPage`, `RoleSelectionPage`, `QuizPage`, `QuizResultPage`, `SkillGapsPage`, `LearningPlanPage`, `ProfilePage`).
- `src/services/`: Central Axios instance (`api.ts`) and feature clients (`quizApi`, `roleApi`, `studentApi`, etc.).
- `src/styles/theme.css`: Central global CSS design system with CSS variables.

---

## 5. Agent Reference

For automated agent instructions, consult [`frontend/agent/Skill.md`](file:///frontend/agent/Skill.md).

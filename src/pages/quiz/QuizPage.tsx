import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { quizApi } from '../../services/quizApi';
import { QuizSession, QuizAnswer } from '../../types/quiz';
import QuestionCard from '../../components/quiz/QuestionCard';
import QuizProgressBar from '../../components/quiz/QuizProgressBar';
import QuizNavigation from '../../components/quiz/QuizNavigation';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { AlertCircle, HelpCircle } from 'lucide-react';

/**
 * Dedicated quiz taking page providing stateful navigation and answer submission.
 */
export const QuizPage: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async (): Promise<void> => {
      if (!roleId) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await quizApi.getQuiz(Number(roleId));
        if (res.success && res.data) {
          setSession(res.data);
          setCurrentIndex(0);
          setAnswers({});
        }
      } catch (err: unknown) {
        const errObj = err as { message?: string };
        console.error('QuizPage: Failed to load quiz session', err);
        setError(errObj?.message || 'Could not load quiz for this role. Please ensure questions are available.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [roleId]);

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D'): void => {
    if (!session) return;
    const currentQ = session.questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.questionId]: option,
    }));
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = (): void => {
    if (session && currentIndex < session.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleJumpToQuestion = (index: number): void => {
    if (session && index >= 0 && index < session.questions.length) {
      setCurrentIndex(index);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!session || !user) return;

    // Check if any unanswered questions exist and confirm
    const answeredCount = Object.keys(answers).length;
    const totalCount = session.questions.length;

    if (answeredCount < totalCount) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalCount} questions. Unanswered questions will be counted as incorrect. Do you want to submit now?`
      );
      if (!confirmSubmit) return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert answers map to submission array
      const answersPayload: QuizAnswer[] = session.questions.map((q) => ({
        questionId: q.questionId,
        selectedOption: answers[q.questionId] || 'A', // default placeholder if unanswered
      }));

      const res = await quizApi.submitQuiz({
        studentId: user.studentId,
        roleId: session.roleId,
        answers: answersPayload,
      });

      if (res.success && res.data) {
        navigate(`/quiz/${res.data.attemptId}/result`);
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      console.error('QuizPage: Quiz submission error', err);
      setError(errObj?.message || 'Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Generating objective skill quiz from question bank..." />;
  }

  if (error || !session || session.questions.length === 0) {
    return (
      <div className="main-content">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <AlertCircle size={40} style={{ color: 'var(--color-danger)', margin: '0 auto var(--spacing-md)' }} />
            <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Quiz Unavailable</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              {error || 'No questions found for the selected role.'}
            </p>
            <button onClick={() => navigate('/roles')} className="btn btn-primary" style={{ margin: '0 auto' }}>
              Back to Career Roles
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = session.questions[currentIndex];
  const currentAnswer = answers[currentQuestion.questionId];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Title Banner */}
        <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Skill Assessment
            </span>
            <h1 style={{ fontSize: 'var(--font-size-2xl)' }}>
              {session.roleName}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            <HelpCircle size={14} />
            <span>Select the best answer for each question</span>
          </div>
        </div>

        {/* Progress Bar */}
        <QuizProgressBar
          currentIndex={currentIndex}
          totalQuestions={session.questions.length}
          answeredCount={answeredCount}
        />

        {/* Active Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedOption={currentAnswer}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation Controls */}
        <QuizNavigation
          currentIndex={currentIndex}
          totalQuestions={session.questions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          answeredMap={answers}
          questions={session.questions}
          onJumpToQuestion={handleJumpToQuestion}
        />
      </div>
    </div>
  );
};

export default QuizPage;

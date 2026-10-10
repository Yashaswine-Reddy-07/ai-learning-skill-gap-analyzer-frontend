import React from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  answeredMap: Record<number, string>;
  questions: Array<{ questionId: number }>;
  onJumpToQuestion: (index: number) => void;
}

/**
 * Quiz navigation controls and quick question selection grid.
 */
export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  answeredMap,
  questions,
  onJumpToQuestion,
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {/* Previous / Next / Submit Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
      }}>
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentIndex === 0 || isSubmitting}
          className="btn btn-secondary"
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        {!isLastQuestion ? (
          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="btn btn-success"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Evaluating Assessment...' : 'Submit Assessment'}</span>
          </button>
        )}
      </div>

      {/* Quick Jump Question Grid */}
      <div className="card" style={{ padding: 'var(--spacing-md)' }}>
        <span style={{
          display: 'block',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
          fontWeight: 'var(--font-weight-medium)',
          marginBottom: 'var(--spacing-sm)',
        }}>
          Question Navigator:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
          {questions.map((q, idx) => {
            const isAnswered = !!answeredMap[q.questionId];
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.questionId}
                type="button"
                onClick={() => onJumpToQuestion(idx)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isCurrent
                    ? 'var(--color-primary-light)'
                    : isAnswered
                    ? 'var(--color-surface-hover)'
                    : 'var(--color-surface)',
                  color: isCurrent
                    ? 'var(--color-primary)'
                    : isAnswered
                    ? 'var(--color-success)'
                    : 'var(--color-text-secondary)',
                  fontWeight: isCurrent || isAnswered ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                  fontSize: 'var(--font-size-xs)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                title={`Question ${idx + 1} (${isAnswered ? 'Answered' : 'Unanswered'})`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;

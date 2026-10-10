import React from 'react';

interface QuizProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
}

/**
 * Progress bar and question indicator component for quiz sessions.
 */
export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  answeredCount,
}) => {
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-xs)',
        fontSize: 'var(--font-size-sm)',
      }}>
        <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)' }}>
          Answered: {answeredCount} / {totalQuestions}
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--color-border)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
};

export default QuizProgressBar;

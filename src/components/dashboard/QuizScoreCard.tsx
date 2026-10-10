import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

interface QuizScoreCardProps {
  score: number;
}

/**
 * Metric card displaying the student's latest objective quiz score percentage.
 */
export const QuizScoreCard: React.FC<QuizScoreCardProps> = ({ score }) => {
  const formattedScore = Math.round(score * 10) / 10;

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-md)',
        }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)' }}>
            Latest Quiz Score
          </span>
          <div style={{
            color: 'var(--color-success)',
            backgroundColor: 'var(--color-success-bg)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
          }}>
            <Target size={18} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)' }}>
          <span style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}>
            {formattedScore}%
          </span>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            overall
          </span>
        </div>

        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          Objectively verified across all role competencies via randomized question bank tests.
        </p>
      </div>

      <div style={{
        marginTop: 'var(--spacing-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-success)',
      }}>
        <CheckCircle size={14} />
        <span>Authoritative backend verified score</span>
      </div>
    </div>
  );
};

export default QuizScoreCard;

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedNextCardProps {
  recommendations: string[];
  roleId: number;
}

/**
 * Card highlighting the prioritized next actions recommended by the AI engine.
 */
export const RecommendedNextCard: React.FC<RecommendedNextCardProps> = ({
  recommendations,
  roleId,
}) => {
  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          marginBottom: 'var(--spacing-md)',
        }}>
          <div style={{
            color: 'var(--color-info)',
            backgroundColor: 'var(--color-info-bg)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
          }}>
            <Sparkles size={18} />
          </div>
          <h3 style={{ fontSize: 'var(--font-size-md)' }}>
            Recommended Next Actions
          </h3>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {recommendations.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-sm)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                padding: 'var(--spacing-xs) 0',
              }}
            >
              <span style={{
                color: 'var(--color-primary)',
                fontWeight: 'var(--font-weight-bold)',
                minWidth: '20px',
              }}>
                {idx + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
        <Link to="/learning-plan" className="btn btn-outline-primary" style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}>
          <span>Open Full Learning Plan</span>
        </Link>
        <Link to={`/quiz/${roleId}`} className="btn btn-secondary" style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}>
          <CheckCircle2 size={14} />
          <span>Retake Role Quiz</span>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedNextCard;

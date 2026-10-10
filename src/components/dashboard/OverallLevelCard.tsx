import React from 'react';
import { Award, Zap } from 'lucide-react';

interface OverallLevelCardProps {
  level: number;
}

/**
 * Metric card displaying current overall proficiency level between 1 and 5.
 */
export const OverallLevelCard: React.FC<OverallLevelCardProps> = ({ level }) => {
  const getLevelDetails = (lvl: number): { title: string; badgeClass: string } => {
    switch (lvl) {
      case 1: return { title: 'Beginner', badgeClass: 'badge-danger' };
      case 2: return { title: 'Basic', badgeClass: 'badge-warning' };
      case 3: return { title: 'Intermediate', badgeClass: 'badge-info' };
      case 4: return { title: 'Advanced', badgeClass: 'badge-purple' };
      case 5: return { title: 'Expert', badgeClass: 'badge-success' };
      default: return { title: 'Beginner', badgeClass: 'badge-danger' };
    }
  };

  const details = getLevelDetails(level);

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
            Overall Proficiency
          </span>
          <div style={{
            color: 'var(--color-purple)',
            backgroundColor: 'var(--color-purple-bg)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
          }}>
            <Award size={18} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
          <span style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}>
            Level {level}
          </span>
          <span className={`badge ${details.badgeClass}`}>
            {details.title}
          </span>
        </div>

        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          Standardized 1–5 academic proficiency benchmark evaluated against industry standards.
        </p>
      </div>

      <div style={{
        marginTop: 'var(--spacing-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-purple)',
      }}>
        <Zap size={14} />
        <span>Target benchmark: Level 4 or 5</span>
      </div>
    </div>
  );
};

export default OverallLevelCard;

import React from 'react';
import { SkillGap } from '../../types/skill';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SkillGapCardProps {
  gap: SkillGap;
}

/**
 * Visual card item representing a single evaluated skill gap.
 */
export const SkillGapCard: React.FC<SkillGapCardProps> = ({ gap }) => {
  const isDeficit = gap.gap > 0;

  const getPriorityLabel = (priority: number, gapVal: number): string => {
    if (gapVal <= 0) return 'Sufficient Mastery';
    if (gapVal >= 2) return `Priority ${priority} • High Deficit`;
    return `Priority ${priority} • Moderate Deficit`;
  };

  return (
    <div style={{
      padding: 'var(--spacing-md)',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-sm)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--spacing-xs)',
      }}>
        <div>
          <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            {gap.skillName}
          </h4>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Score: {Math.round(gap.score)}%
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className={`badge ${isDeficit ? (gap.gap >= 2 ? 'badge-danger' : 'badge-warning') : 'badge-success'}`}>
            {isDeficit ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
            <span>{getPriorityLabel(gap.priority, gap.gap)}</span>
          </span>
        </div>
      </div>

      {/* Level indicators */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--spacing-2xs)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-secondary)',
      }}>
        <span>Current: <strong>Level {gap.currentLevel}</strong></span>
        <span>Required: <strong>Level {gap.requiredLevel}</strong></span>
        <span>
          Gap: <strong style={{ color: isDeficit ? 'var(--color-danger)' : 'var(--color-success)' }}>
            {gap.gap > 0 ? `+${gap.gap}` : gap.gap}
          </strong>
        </span>
      </div>

      {/* Visual Level Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--color-background)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}>
        <div style={{
          width: `${(gap.currentLevel / 5) * 100}%`,
          backgroundColor: isDeficit ? 'var(--color-warning)' : 'var(--color-success)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Weak Topics tags if present */}
      {gap.weakTopics && gap.weakTopics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2xs)', marginTop: 'var(--spacing-2xs)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginRight: 'var(--spacing-2xs)' }}>
            Needs Focus:
          </span>
          {gap.weakTopics.map((topic, i) => (
            <span key={i} className="badge badge-info" style={{ fontSize: '0.7rem' }}>
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillGapCard;

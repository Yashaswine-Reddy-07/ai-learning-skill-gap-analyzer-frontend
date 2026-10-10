import React from 'react';
import { SkillGap } from '../../types/skill';
import SkillGapCard from './SkillGapCard';
import { Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillGapListProps {
  gaps: SkillGap[];
}

/**
 * List container component rendering prioritized skill gaps overview on the dashboard.
 */
export const SkillGapList: React.FC<SkillGapListProps> = ({ gaps }) => {
  return (
    <div className="card">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <Award size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: 'var(--font-size-lg)' }}>
            Skill Gap Overview
          </h3>
        </div>

        <Link
          to="/skills/gaps"
          style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2xs)',
          }}
        >
          <span>View Deep Dive</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {gaps.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-xl)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}>
          No skill gap data available. Take a career quiz to evaluate your competencies.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {gaps.map((gap) => (
            <SkillGapCard key={gap.skillId} gap={gap} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillGapList;

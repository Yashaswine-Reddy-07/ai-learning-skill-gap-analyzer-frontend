import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface DashboardHeaderProps {
  studentName: string;
  targetRole: string;
}

/**
 * Dashboard header banner introducing the student and career objective.
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ studentName, targetRole }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-xl)',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-2xs)' }}>
          <span className="badge badge-info">
            <Sparkles size={12} />
            <span>AI Learning Dashboard</span>
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, var(--font-size-2xl))', letterSpacing: '-0.02em' }}>
          Welcome back, {studentName}
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-2xs)' }}>
          Target Career Track: <strong style={{ color: 'var(--color-primary)' }}>{targetRole}</strong>
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-secondary)',
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--spacing-xs) var(--spacing-md)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
      }}>
        <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
        <span>{today}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;

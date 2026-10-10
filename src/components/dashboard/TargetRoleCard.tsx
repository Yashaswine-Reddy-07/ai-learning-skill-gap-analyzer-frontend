import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

interface TargetRoleCardProps {
  roleName: string;
  roleId: number;
}

/**
 * Metric card showcasing the student's active target role with a quick action to explore or switch roles.
 */
export const TargetRoleCard: React.FC<TargetRoleCardProps> = ({ roleName, roleId }) => {
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
            Target Career Role
          </span>
          <div style={{
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-light)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
          }}>
            <Compass size={18} />
          </div>
        </div>

        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-xs)' }}>
          {roleName}
        </h2>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          Curriculum benchmarks and quizzes are calibrated specifically to this specialization.
        </p>
      </div>

      <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
        <Link to={`/quiz/${roleId}`} className="btn btn-primary" style={{ flex: 1, minWidth: '140px', fontSize: 'var(--font-size-xs)' }}>
          <span>Take Role Quiz</span>
          <ArrowRight size={14} />
        </Link>
        <Link to="/roles" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
          Change
        </Link>
      </div>
    </div>
  );
};

export default TargetRoleCard;

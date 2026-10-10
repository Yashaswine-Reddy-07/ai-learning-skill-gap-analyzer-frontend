import React, { ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

/**
 * Standard empty state card rendered when lists or reports are empty.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <div className="card" style={{
      textAlign: 'center',
      padding: 'var(--spacing-3xl) var(--spacing-xl)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-md)',
    }}>
      <div style={{
        color: 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon || <HelpCircle size={44} />}
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-xs)' }}>
          {title}
        </h3>
        <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: 'var(--font-size-sm)' }}>
          {description}
        </p>
      </div>
      {action && <div style={{ marginTop: 'var(--spacing-sm)' }}>{action}</div>}
    </div>
  );
};

export default EmptyState;

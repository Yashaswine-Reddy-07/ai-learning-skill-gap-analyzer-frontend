import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * Clean animated loading spinner state component.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading data...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-3xl) var(--spacing-lg)',
      gap: 'var(--spacing-md)',
      minHeight: '300px',
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-secondary)',
        fontWeight: 'var(--font-weight-medium)',
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';

interface ProgressChartProps {
  percentage: number;
  completed: number;
  total: number;
}

/**
 * Visual progress meter illustrating percentage of completed curriculum activities.
 */
export const ProgressChart: React.FC<ProgressChartProps> = ({
  percentage,
  completed,
  total,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-primary)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-bold)' }}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2xs)' }}>
          Milestone Completion
        </h4>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          {completed} of {total} curriculum activities completed
        </p>
      </div>
    </div>
  );
};

export default ProgressChart;

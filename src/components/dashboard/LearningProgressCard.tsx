import React from 'react';
import { LearningPlanItem } from '../../types/learningPlan';
import ProgressChart from './ProgressChart';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LearningProgressCardProps {
  items: LearningPlanItem[];
  completedCount: number;
  totalCount: number;
  overallPercentage: number;
}

/**
 * Dashboard card showing current learning plan items and completion progress meter.
 */
export const LearningProgressCard: React.FC<LearningProgressCardProps> = ({
  items,
  completedCount,
  totalCount,
  overallPercentage,
}) => {
  return (
    <div className="card">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: 'var(--font-size-lg)' }}>
            Learning Plan Progress
          </h3>
        </div>

        <Link to="/learning-plan" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
          View Roadmap
        </Link>
      </div>

      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <ProgressChart
          percentage={overallPercentage}
          completed={completedCount}
          total={totalCount}
        />
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', padding: 'var(--spacing-md)' }}>
          No active learning tasks. Generate a learning plan from your quiz results!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
          {items.slice(0, 3).map((item) => (
            <div
              key={item.planId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-hover)',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                {item.status === 'COMPLETED' ? (
                  <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                ) : (
                  <Clock size={16} style={{ color: 'var(--color-warning)' }} />
                )}
                <div>
                  <strong>{item.skill}:</strong> {item.topic}
                </div>
              </div>

              <span className={`badge ${item.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                {item.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningProgressCard;

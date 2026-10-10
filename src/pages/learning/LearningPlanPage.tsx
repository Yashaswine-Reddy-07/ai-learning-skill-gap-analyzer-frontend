import React, { useEffect, useState } from 'react';
import { learningPlanApi } from '../../services/learningPlanApi';
import { progressApi } from '../../services/progressApi';
import { aiApi } from '../../services/aiApi';
import { useAuth } from '../../hooks/useAuth';
import { LearningPlanResponse, LearningPlanItem } from '../../types/learningPlan';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import {
  BookOpen,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Interactive personalized learning plan page allowing students to track completion
 * and regenerate guidance with LangChain4j.
 */
export const LearningPlanPage: React.FC = () => {
  const { user } = useAuth();

  const [plan, setPlan] = useState<LearningPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [updatingPlanId, setUpdatingPlanId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async (): Promise<void> => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const res = await learningPlanApi.getLearningPlan(user.studentId);
      if (res.success && res.data) {
        setPlan(res.data);
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      console.error('LearningPlanPage: Failed to load plan', err);
      setError(errObj?.message || 'Could not load learning plan.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [user]);

  const handleToggleStatus = async (item: LearningPlanItem): Promise<void> => {
    try {
      setUpdatingPlanId(item.planId);
      const newStatus = item.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED';
      const newProgress = newStatus === 'COMPLETED' ? 100 : 0;

      const res = await progressApi.updateProgress(item.planId, {
        progress: newProgress,
        status: newStatus,
      });

      if (res.success && res.data) {
        setPlan((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.map((i) => (i.planId === item.planId ? res.data : i)),
          };
        });
      }
    } catch (err) {
      console.error('LearningPlanPage: Failed to update progress', err);
    } finally {
      setUpdatingPlanId(null);
    }
  };

  const handleRegenerateWithAi = async (): Promise<void> => {
    if (!user) return;
    try {
      setIsRegenerating(true);
      const res = await aiApi.generateRecommendations(user.studentId);
      if (res.success && res.data) {
        setPlan(res.data);
      }
    } catch (err) {
      console.error('LearningPlanPage: AI regeneration failed', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Retrieving your personalized learning roadmap..." />;
  }

  const items = plan?.items || [];
  const completedCount = items.filter((i) => i.status === 'COMPLETED').length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Banner */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-2xl)',
        }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: 'var(--spacing-xs)' }}>
              <BookOpen size={12} />
              <span>AI-Generated Personalized Curriculum</span>
            </span>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--spacing-xs)' }}>
              Personalized Learning Plan
            </h1>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
              Career Track: <strong>{plan?.roleName || user?.careerGoal || 'Specialization'}</strong>
            </p>
          </div>

          <button
            onClick={handleRegenerateWithAi}
            disabled={isRegenerating}
            className="btn btn-outline-primary"
          >
            <Sparkles size={16} />
            <span>{isRegenerating ? 'Synthesizing Roadmap...' : 'Refresh AI Plan'}</span>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-xl)' }}>
            {error}
          </div>
        )}

        {/* AI Summary Banner */}
        {plan?.summary && (
          <div className="card" style={{
            backgroundColor: 'var(--color-primary-light)',
            borderColor: 'var(--color-primary)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)' }}>
              <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-primary)' }}>
                AI Mentor Strategy
              </h3>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
              {plan.summary}
            </p>
            {plan.retakeRecommendation && (
              <div style={{
                marginTop: 'var(--spacing-md)',
                paddingTop: 'var(--spacing-sm)',
                borderTop: '1px solid rgba(37, 99, 235, 0.2)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
              }}>
                <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                <span><strong>Assessment Retake Advice:</strong> {plan.retakeRecommendation}</span>
              </div>
            )}
          </div>
        )}

        {/* Overall Completion Progress */}
        {totalCount > 0 && (
          <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Curriculum Milestone Progress
              </span>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                {completedCount} of {totalCount} completed ({progressPercent}%)
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: 'var(--color-border)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: 'var(--color-success)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        )}

        {/* Milestone Items List */}
        {items.length === 0 ? (
          <EmptyState
            title="No Learning Plan Generated Yet"
            description="Take your diagnostic role quiz first to allow LangChain4j to analyze your objective skill gaps."
            action={
              <Link to="/roles" className="btn btn-primary">
                Take Quiz Now
              </Link>
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {items.map((item) => {
              const isCompleted = item.status === 'COMPLETED';

              return (
                <div
                  key={item.planId}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 'var(--spacing-md)',
                    borderLeft: `5px solid ${isCompleted ? 'var(--color-success)' : 'var(--color-primary)'}`,
                    backgroundColor: isCompleted ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        Priority #{item.priority}
                      </span>
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                        {item.skill}
                      </span>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        • {item.topic}
                      </span>
                    </div>

                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: isCompleted ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      lineHeight: 1.5,
                    }}>
                      {item.activity}
                    </p>
                  </div>

                  {/* Complete Checkbox Button */}
                  <button
                    onClick={() => handleToggleStatus(item)}
                    disabled={updatingPlanId === item.planId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isCompleted ? 'var(--color-success-border)' : 'var(--color-border)'}`,
                      backgroundColor: isCompleted ? 'var(--color-success-bg)' : 'var(--color-surface)',
                      color: isCompleted ? 'var(--color-success)' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock size={16} />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPlanPage;

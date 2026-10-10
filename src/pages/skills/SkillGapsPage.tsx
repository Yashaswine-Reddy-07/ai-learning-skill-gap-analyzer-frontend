import React, { useEffect, useState } from 'react';
import { skillApi } from '../../services/skillApi';
import { useAuth } from '../../hooks/useAuth';
import { SkillGap } from '../../types/skill';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Award, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Dedicated Skill Gaps page showing deep-dive comparison against target career role.
 */
export const SkillGapsPage: React.FC = () => {
  const { user } = useAuth();
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGaps = async (): Promise<void> => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await skillApi.getSkillGaps(user.studentId);
        if (res.success && res.data) {
          setGaps(res.data);
        }
      } catch (err: unknown) {
        const errObj = err as { message?: string };
        console.error('SkillGapsPage: Failed to load gaps', err);
        setError(errObj?.message || 'Could not load skill gap analysis.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGaps();
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner message="Calculating skill gap variances against target career benchmarks..." />;
  }

  return (
    <div className="main-content">
      <div className="container">
        {/* Banner */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <span className="badge badge-info" style={{ marginBottom: 'var(--spacing-xs)' }}>
            <Award size={12} />
            <span>Gap Analysis Matrix</span>
          </span>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--spacing-xs)' }}>
            Objective Skill Gap Analysis
          </h1>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', maxWidth: '720px' }}>
            Calculated strictly using the formula: <code>Skill Gap = Required Benchmark - Quiz Proficiency</code>.
            Skills with highest gaps are prioritized first to optimize learning time.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-xl)' }}>
            {error}
          </div>
        )}

        {gaps.length === 0 ? (
          <EmptyState
            title="No Skill Assessments Found"
            description="Take your first role-based technical quiz to discover your objective competency levels."
            action={
              <Link to="/roles" className="btn btn-primary">
                <span>Browse Roles & Take Quiz</span>
                <ArrowRight size={14} />
              </Link>
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            {gaps.map((gap) => {
              const isDeficit = gap.gap > 0;

              return (
                <div key={gap.skillId} className="card" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--spacing-lg)',
                  alignItems: 'center',
                }}>
                  {/* Skill identity */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-2xs)' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        Priority #{gap.priority}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-xl)' }}>{gap.skillName}</h3>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                      Assessed Quiz Score: <strong>{Math.round(gap.score)}%</strong>
                    </p>
                  </div>

                  {/* Proficiency Comparison */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                      <span>Your Level: <strong>Level {gap.currentLevel} / 5</strong></span>
                      <span>Target Level: <strong>Level {gap.requiredLevel} / 5</strong></span>
                    </div>

                    <div style={{
                      width: '100%',
                      height: '10px',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(gap.currentLevel / 5) * 100}%`,
                        height: '100%',
                        backgroundColor: isDeficit ? 'var(--color-warning)' : 'var(--color-success)',
                        borderRadius: 'var(--radius-full)',
                      }} />
                    </div>
                  </div>

                  {/* Deficit Badge & Status */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isDeficit ? 'var(--color-danger-bg)' : 'var(--color-success-bg)',
                      border: `1px solid ${isDeficit ? 'var(--color-danger-border)' : 'var(--color-success-border)'}`,
                      color: isDeficit ? 'var(--color-danger)' : 'var(--color-success)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-sm)',
                    }}>
                      {isDeficit ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                      <span>{isDeficit ? `Deficit Gap: +${gap.gap} Level(s)` : 'Benchmark Satisfied'}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
              <Link to="/learning-plan" className="btn btn-primary btn-lg">
                <span>View Personalized AI Learning Roadmap</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGapsPage;

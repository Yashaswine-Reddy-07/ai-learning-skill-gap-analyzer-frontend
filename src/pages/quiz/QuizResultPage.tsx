import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quizApi } from '../../services/quizApi';
import { aiApi } from '../../services/aiApi';
import { useAuth } from '../../hooks/useAuth';
import { QuizResult } from '../../types/result';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

/**
 * Result evaluation page displaying objective scores, skill-gap analysis, and AI plan trigger.
 */
export const QuizResultPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async (): Promise<void> => {
      if (!attemptId) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await quizApi.getResult(Number(attemptId));
        if (res.success && res.data) {
          setResult(res.data);
        }
      } catch (err: unknown) {
        const errObj = err as { message?: string };
        console.error('QuizResultPage: Failed to load result', err);
        setError(errObj?.message || 'Could not load quiz results.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  const handleGenerateAiPlan = async (): Promise<void> => {
    if (!user || !result) return;
    try {
      setIsGeneratingAi(true);
      const res = await aiApi.generateRecommendations(user.studentId, result.roleId);
      if (res.success && res.data) {
        navigate('/learning-plan');
      }
    } catch (err) {
      console.error('QuizResultPage: AI generation failure', err);
      // Fallback navigation directly to learning plan
      navigate('/learning-plan');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Evaluating answers and computing objective skill gaps..." />;
  }

  if (error || !result) {
    return (
      <div className="main-content">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <AlertTriangle size={40} style={{ color: 'var(--color-danger)', margin: '0 auto var(--spacing-md)' }} />
            <h2>Results Not Found</h2>
            <p style={{ margin: 'var(--spacing-md) 0' }}>{error || 'Unable to locate this quiz result attempt.'}</p>
            <Link to="/dashboard" className="btn btn-primary" style={{ margin: '0 auto' }}>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Banner */}
        <div className="card" style={{
          textAlign: 'center',
          padding: 'var(--spacing-2xl)',
          marginBottom: 'var(--spacing-2xl)',
          background: 'linear-gradient(180deg, var(--color-surface), var(--color-background))',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            marginBottom: 'var(--spacing-md)',
          }}>
            <CheckCircle2 size={32} />
          </div>

          <h1 style={{ fontSize: 'var(--font-size-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--spacing-xs)' }}>
            Assessment Completed!
          </h1>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
            Role Benchmark: <strong>{result.roleName}</strong>
          </p>

          {/* Quick Score Metrics */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-2xl)',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--color-border)',
          }}>
            <div>
              <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Overall Score
              </span>
              <span style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                color: 'var(--color-text-primary)',
              }}>
                {Math.round(result.overallScore)}%
              </span>
            </div>

            <div className="score-metric-divider" />

            <div>
              <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Assessed Proficiency
              </span>
              <span style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                color: 'var(--color-purple)',
              }}>
                Level {result.overallLevel} / 5
              </span>
            </div>
          </div>
        </div>

        {/* Skill-by-Skill Breakdown */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)' }}>
            Skill-by-Skill Breakdown & Deficit Analysis
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {result.skills.map((skill) => {
              const isDeficit = skill.gap > 0;

              return (
                <div key={skill.skillId} className="card" style={{ padding: 'var(--spacing-lg)' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    <div>
                      <h3 style={{ fontSize: 'var(--font-size-lg)' }}>
                        {skill.skillName}
                      </h3>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        Score: {Math.round(skill.score)}% • Level {skill.level} of 5
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <span className="badge badge-purple">
                        Required: Level {skill.requiredLevel}
                      </span>
                      <span className={`badge ${isDeficit ? 'badge-danger' : 'badge-success'}`}>
                        {isDeficit ? `Gap: +${skill.gap} Levels` : 'Sufficient'}
                      </span>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    <div style={{
                      width: `${(skill.level / 5) * 100}%`,
                      height: '100%',
                      backgroundColor: isDeficit ? 'var(--color-warning)' : 'var(--color-success)',
                      borderRadius: 'var(--radius-full)',
                    }} />
                  </div>

                  {/* Identified Weak Topics */}
                  {skill.wrongTopics && skill.wrongTopics.length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      backgroundColor: 'var(--color-danger-bg)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-danger-border)',
                    }}>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-danger)' }}>
                        Concepts Missed in Quiz:
                      </span>
                      {skill.wrongTopics.map((topic, idx) => (
                        <span key={idx} className="badge badge-danger" style={{ fontSize: '0.75rem' }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-success)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                    }}>
                      <CheckCircle2 size={14} />
                      <span>All questions answered correctly for this skill!</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel */}
        <div className="card" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-primary-light)',
          borderColor: 'var(--color-primary)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-2xs)' }}>
              <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-primary)' }}>
                Generate Personalized Learning Plan
              </h3>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', maxWidth: '520px' }}>
              LangChain4j will consume your objective skill gaps and missed concepts to build
              a step-by-step curriculum with hands-on practice recommendations and mini-projects.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
            <Link to={`/quiz/${result.roleId}`} className="btn btn-secondary">
              <RotateCcw size={14} />
              <span>Retake Quiz</span>
            </Link>

            <button
              onClick={handleGenerateAiPlan}
              disabled={isGeneratingAi}
              className="btn btn-primary btn-lg"
            >
              <Sparkles size={16} />
              <span>{isGeneratingAi ? 'Synthesizing with AI...' : 'Generate Learning Plan'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;

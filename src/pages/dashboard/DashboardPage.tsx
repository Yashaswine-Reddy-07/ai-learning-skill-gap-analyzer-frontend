import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { dashboardApi } from '../../services/dashboardApi';
import { DashboardData } from '../../types/learningPlan';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import TargetRoleCard from '../../components/dashboard/TargetRoleCard';
import QuizScoreCard from '../../components/dashboard/QuizScoreCard';
import OverallLevelCard from '../../components/dashboard/OverallLevelCard';
import SkillGapList from '../../components/dashboard/SkillGapList';
import RecommendedNextCard from '../../components/dashboard/RecommendedNextCard';
import LearningProgressCard from '../../components/dashboard/LearningProgressCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Main student telemetry dashboard displaying evaluated scores, skill gaps, and learning roadmap.
 */
export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async (): Promise<void> => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);
      const res = await dashboardApi.getDashboard(user.studentId);
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      console.error('DashboardPage: Failed to load telemetry', err);
      setError(errObj?.message || 'Could not load dashboard telemetry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner message="Assembling personalized dashboard analytics..." />;
  }

  if (error || !data) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <AlertCircle size={40} style={{ color: 'var(--color-danger)', margin: '0 auto var(--spacing-md)' }} />
            <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Dashboard Unavailable</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>{error || 'Unable to retrieve dashboard data.'}</p>
            <button onClick={fetchDashboard} className="btn btn-primary" style={{ margin: '0 auto' }}>
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        {/* Header */}
        <DashboardHeader
          studentName={data.student.name}
          targetRole={data.targetRole}
        />

        {/* Top 3 KPI Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          <TargetRoleCard
            roleName={data.targetRole}
            roleId={data.targetRoleId}
          />
          <QuizScoreCard
            score={data.latestQuizScore}
          />
          <OverallLevelCard
            level={data.overallLevel}
          />
        </div>

        {/* Main Content Grid: Skill Gaps on Left, Recommendations & Progress on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 'var(--spacing-xl)',
        }}>
          {/* Left Column: Skill Gaps List */}
          <div>
            <SkillGapList gaps={data.skillGaps} />
          </div>

          {/* Right Column: AI Next Actions and Learning Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <RecommendedNextCard
              recommendations={data.recommendedNext}
              roleId={data.targetRoleId}
            />

            <LearningProgressCard
              items={data.learningProgress}
              completedCount={data.completedActivitiesCount}
              totalCount={data.totalActivitiesCount}
              overallPercentage={data.overallProgressPercentage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

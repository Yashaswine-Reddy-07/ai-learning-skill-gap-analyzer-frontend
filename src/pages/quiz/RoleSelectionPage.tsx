import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roleApi } from '../../services/roleApi';
import { studentApi } from '../../services/studentApi';
import { CareerRole } from '../../types/role';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Compass, CheckCircle2, ArrowRight, Star } from 'lucide-react';

/**
 * Career role exploration and assessment launchpad page.
 */
export const RoleSelectionPage: React.FC = () => {
  const { user, updateUserGoal } = useAuth();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [settingGoalId, setSettingGoalId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const res = await roleApi.getAllRoles();
        if (res.success && res.data) {
          setRoles(res.data);
        }
      } catch (err) {
        console.error('RoleSelectionPage: Failed to load roles', err);
        setError('Could not retrieve available career roles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSetGoal = async (role: CareerRole): Promise<void> => {
    if (!user) return;
    try {
      setSettingGoalId(role.roleId);
      await studentApi.updateCareerGoal(user.studentId, role.roleName);
      updateUserGoal(role.roleName);
    } catch (err) {
      console.error('RoleSelectionPage: Failed to set goal', err);
    } finally {
      setSettingGoalId(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading career paths and industry requirements..." />;
  }

  return (
    <div className="main-content">
      <div className="container">
        {/* Banner */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)', maxWidth: '640px', margin: '0 auto var(--spacing-2xl)' }}>
          <span className="badge badge-info" style={{ marginBottom: 'var(--spacing-xs)' }}>
            <Compass size={12} />
            <span>Career Path Benchmarking</span>
          </span>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--spacing-xs)' }}>
            Select Your Target Career Role
          </h1>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
            Every role defines strict required proficiency levels (1–5). Take the objective quiz
            to identify your exact skill gaps.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ maxWidth: '600px', margin: '0 auto var(--spacing-lg)' }}>
            {error}
          </div>
        )}

        {/* Roles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-xl)',
        }}>
          {roles.map((role) => {
            const isCurrentGoal = user?.careerGoal?.trim().toLowerCase() === role.roleName.trim().toLowerCase();

            return (
              <div
                key={role.roleId}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: isCurrentGoal ? '4px solid var(--color-primary)' : '1px solid var(--color-border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                    <h3 style={{ fontSize: 'var(--font-size-xl)' }}>
                      {role.roleName}
                    </h3>
                    {isCurrentGoal && (
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} />
                        <span>Active Goal</span>
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                    Required Technical Proficiencies (Level 1–5):
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
                    {role.requiredSkills.map((req) => (
                      <div
                        key={req.skillId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 'var(--spacing-xs) var(--spacing-sm)',
                          backgroundColor: 'var(--color-background)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                        }}
                      >
                        <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{req.skillName}</span>
                        <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                          Requires Level {req.requiredLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  <button
                    onClick={() => navigate(`/quiz/${role.roleId}`)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <span>Launch Skill Quiz</span>
                    <ArrowRight size={16} />
                  </button>

                  {!isCurrentGoal && (
                    <button
                      onClick={() => handleSetGoal(role)}
                      disabled={settingGoalId === role.roleId}
                      className="btn btn-secondary"
                      style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                    >
                      <Star size={14} />
                      <span>{settingGoalId === role.roleId ? 'Setting Goal...' : 'Set as Career Goal'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;

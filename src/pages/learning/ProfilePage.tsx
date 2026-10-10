import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { studentApi } from '../../services/studentApi';
import { roleApi } from '../../services/roleApi';
import { StudentProfile } from '../../types/student';
import { CareerRole } from '../../types/role';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { User, Mail, Compass, CheckCircle } from 'lucide-react';

/**
 * Student profile page showing personal information, career goals, and preference updates.
 */
export const ProfilePage: React.FC = () => {
  const { user, updateUserGoal } = useAuth();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!user) return;
      try {
        setIsLoading(true);
        const [profileRes, rolesRes] = await Promise.all([
          studentApi.getProfile(user.studentId),
          roleApi.getAllRoles(),
        ]);

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
          setSelectedGoal(profileRes.data.careerGoal || 'Data Analyst');
        }
        if (rolesRes.success && rolesRes.data) {
          setRoles(rolesRes.data);
        }
      } catch (err) {
        console.error('ProfilePage: Failed to load profile data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSaveGoal = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!user) return;
    try {
      setIsUpdating(true);
      setStatusMessage(null);
      const res = await studentApi.updateCareerGoal(user.studentId, selectedGoal);
      if (res.success && res.data) {
        setProfile(res.data);
        updateUserGoal(selectedGoal);
        setStatusMessage('Career target updated successfully.');
      }
    } catch (err) {
      console.error('ProfilePage: Failed to update career goal', err);
      setStatusMessage('Error updating career target. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your student profile..." />;
  }

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <span className="badge badge-info" style={{ marginBottom: 'var(--spacing-xs)' }}>
            <User size={12} />
            <span>Student Account</span>
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, var(--font-size-3xl))', letterSpacing: '-0.02em', marginBottom: 'var(--spacing-xs)' }}>
            Student Profile
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Manage your account credentials, target industry trajectory, and learning goals.
          </p>
        </div>

        {statusMessage && (
          <div className="alert alert-success" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <CheckCircle size={16} />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)' }}>
            Account Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <div style={{
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
              }}>
                <User size={20} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Full Name</span>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                  {profile?.name}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <div style={{
                color: 'var(--color-info)',
                backgroundColor: 'var(--color-info-bg)',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
              }}>
                <Mail size={20} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Email Address</span>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Target Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-lg)' }}>
            <Compass size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: 'var(--font-size-lg)' }}>
              Target Career Role
            </h3>
          </div>

          <form onSubmit={handleSaveGoal}>
            <div className="form-group">
              <label className="form-label" htmlFor="profile-role-select">
                Selected Role Track
              </label>
              <select
                id="profile-role-select"
                className="form-input"
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                disabled={isUpdating}
              >
                {roles.map((r) => (
                  <option key={r.roleId} value={r.roleName}>
                    {r.roleName}
                  </option>
                ))}
              </select>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>
                Changing your target role re-calibrates your skill gap benchmarks on the dashboard.
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating || selectedGoal === profile?.careerGoal}
              className="btn btn-primary"
            >
              <span>{isUpdating ? 'Saving...' : 'Update Career Target'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

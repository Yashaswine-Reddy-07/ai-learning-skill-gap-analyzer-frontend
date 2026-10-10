import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Compass,
  LayoutDashboard,
  Award,
  BookOpen,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';

/**
 * Primary dark navy navigation header bar.
 */
export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    try {
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Navbar: Error during logout', err);
    }
  };

  return (
    <header style={{
      backgroundColor: 'var(--color-navy-dark)',
      borderBottom: '1px solid var(--color-navy-border)',
      height: 'var(--header-height)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo / Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), #60a5fa)',
            color: 'var(--color-text-inverse)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span style={{
              color: 'var(--color-text-inverse)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-md)',
              letterSpacing: '-0.02em',
              display: 'block',
            }}>
              SkillGap<span style={{ color: '#60a5fa' }}>AI</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'var(--color-navy-surface)' : 'transparent',
                transition: 'all var(--transition-fast)',
              })}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/roles"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'var(--color-navy-surface)' : 'transparent',
                transition: 'all var(--transition-fast)',
              })}
            >
              <Compass size={16} />
              <span>Career Roles</span>
            </NavLink>

            <NavLink
              to="/skills/gaps"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'var(--color-navy-surface)' : 'transparent',
                transition: 'all var(--transition-fast)',
              })}
            >
              <Award size={16} />
              <span>Skill Gaps</span>
            </NavLink>

            <NavLink
              to="/learning-plan"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'var(--color-navy-surface)' : 'transparent',
                transition: 'all var(--transition-fast)',
              })}
            >
              <BookOpen size={16} />
              <span>Learning Plan</span>
            </NavLink>
          </nav>
        )}

        {/* User Session Profile & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          {isAuthenticated && user ? (
            <>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  color: 'var(--color-text-inverse)',
                  textDecoration: 'none',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-navy-surface)',
                  fontSize: 'var(--font-size-xs)',
                  border: '1px solid var(--color-navy-border)',
                }}
              >
                <User size={14} style={{ color: '#60a5fa' }} />
                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-muted)',
                  borderColor: 'var(--color-navy-border)',
                }}
                title="Logout"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <Link to="/login" className="btn btn-secondary" style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text-inverse)',
                borderColor: 'var(--color-navy-border)',
                fontSize: 'var(--font-size-xs)',
              }}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{
                fontSize: 'var(--font-size-xs)',
              }}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

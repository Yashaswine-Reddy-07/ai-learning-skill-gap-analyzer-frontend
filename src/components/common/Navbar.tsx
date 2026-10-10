import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Compass,
  LayoutDashboard,
  Award,
  BookOpen,
  User,
  LogOut,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

/**
 * Primary dark navy navigation header bar.
 * Responsive with desktop row and mobile hamburger dropdown drawer.
 */
export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = (): void => {
    try {
      setIsMenuOpen(false);
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Navbar: Error during logout', err);
    }
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
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
  });

  const mobileNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
    backgroundColor: isActive ? 'var(--color-navy-surface)' : 'transparent',
    transition: 'all var(--transition-fast)',
  });

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
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none' }}
          onClick={() => setIsMenuOpen(false)}
        >
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

        {/* Desktop Navigation Links */}
        {isAuthenticated && (
          <nav className="navbar-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <NavLink to="/dashboard" style={navLinkStyle}>
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/roles" style={navLinkStyle}>
              <Compass size={16} />
              <span>Career Roles</span>
            </NavLink>

            <NavLink to="/skills/gaps" style={navLinkStyle}>
              <Award size={16} />
              <span>Skill Gaps</span>
            </NavLink>

            <NavLink to="/learning-plan" style={navLinkStyle}>
              <BookOpen size={16} />
              <span>Learning Plan</span>
            </NavLink>
          </nav>
        )}

        {/* Desktop User Session Profile & Controls */}
        <div className="navbar-desktop-user" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          {isAuthenticated ? (
            <>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                <NavLink
                  to="/dashboard"
                  style={mobileNavLinkStyle}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/roles"
                  style={mobileNavLinkStyle}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Compass size={18} />
                  <span>Career Roles</span>
                </NavLink>

                <NavLink
                  to="/skills/gaps"
                  style={mobileNavLinkStyle}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Award size={18} />
                  <span>Skill Gaps</span>
                </NavLink>

                <NavLink
                  to="/learning-plan"
                  style={mobileNavLinkStyle}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={18} />
                  <span>Learning Plan</span>
                </NavLink>
              </nav>

              <div style={{
                borderTop: '1px solid var(--color-navy-border)',
                paddingTop: 'var(--spacing-sm)',
                marginTop: 'var(--spacing-xs)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-xs)',
              }}>
                {user && (
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      color: 'var(--color-text-inverse)',
                      textDecoration: 'none',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-navy-surface)',
                      fontSize: 'var(--font-size-sm)',
                      border: '1px solid var(--color-navy-border)',
                    }}
                  >
                    <User size={16} style={{ color: '#60a5fa' }} />
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{user.name}</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-xs)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: 'var(--font-size-sm)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-muted)',
                    borderColor: 'var(--color-navy-border)',
                    width: '100%',
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', padding: 'var(--spacing-xs) 0' }}>
              <Link
                to="/login"
                className="btn btn-secondary"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-inverse)',
                  borderColor: 'var(--color-navy-border)',
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

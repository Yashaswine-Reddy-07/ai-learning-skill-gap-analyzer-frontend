import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

/**
 * Student login page with form validation and JWT authentication.
 */
export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSlowRequest, setIsSlowRequest] = useState(false);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
      }
    };
  }, []);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSlowRequest(false);

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      slowTimerRef.current = setTimeout(() => {
        setIsSlowRequest(true);
      }, 4000);

      await login({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errObj = err as { message?: string; errorCode?: string };
      console.error('LoginPage: Authentication failed', err);
      const rawMsg = errObj?.message || '';
      const isTimeout =
        errObj?.errorCode === 'TIMEOUT_ERROR' ||
        rawMsg.toLowerCase().includes('timeout');

      if (isTimeout) {
        setError('The server is taking longer than expected to respond. If the cloud backend was inactive, it may be waking up from sleep. Please try again in a few moments.');
      } else {
        setError(rawMsg || 'Invalid credentials. Please verify your email and password.');
      }
    } finally {
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      setIsSlowRequest(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-xs)' }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: 'var(--font-size-sm)' }}>
              Log in to access your skills dashboard and assessment roadmap.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {isSlowRequest && !error && (
            <div className="alert alert-info">
              <Loader2 size={16} className="animate-spin" style={{ flexShrink: 0 }} />
              <span>Connecting to the server… The first request may take a little longer.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{
            marginTop: 'var(--spacing-xl)',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center',
            fontSize: 'var(--font-size-sm)',
          }}>
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

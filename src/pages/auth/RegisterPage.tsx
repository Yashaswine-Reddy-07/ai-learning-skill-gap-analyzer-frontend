import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

/**
 * Student registration page for onboarding new accounts.
 */
export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [careerGoal, setCareerGoal] = useState('Data Analyst');
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSlowRequest(false);

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    try {
      setIsSubmitting(true);
      slowTimerRef.current = setTimeout(() => {
        setIsSlowRequest(true);
      }, 4000);

      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        careerGoal,
      });
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const errObj = err as { message?: string; errorCode?: string };
      console.error('RegisterPage: Registration failed', err);
      const rawMsg = errObj?.message || '';
      const isTimeout =
        errObj?.errorCode === 'TIMEOUT_ERROR' ||
        rawMsg.toLowerCase().includes('timeout');

      if (isTimeout) {
        setError('The server is taking longer than expected to respond. If the cloud backend was inactive, it may be waking up from sleep. Please try again in a few moments.');
      } else {
        setError(errObj?.message || 'Could not create account. Please check your information and try again.');
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
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-xs)' }}>
              Create Student Account
            </h1>
            <p style={{ fontSize: 'var(--font-size-sm)' }}>
              Start objective skill assessments and get personalized AI learning paths.
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
              <label className="form-label" htmlFor="reg-name">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                className="form-input"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">
                Password (min 6 characters)
              </label>
              <input
                id="reg-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-career">
                Initial Career Goal
              </label>
              <select
                id="reg-career"
                className="form-input"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="Data Analyst">Data Analyst (Python, SQL, Statistics, Power BI)</option>
                <option value="Java Developer">Java Developer (Java, Spring Boot, SQL, DSA)</option>
                <option value="Web Developer">Web Developer (JavaScript, React, CSS, Node.js)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Creating Profile...' : 'Register Account'}</span>
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
              Already registered?{' '}
              <Link to="/login" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

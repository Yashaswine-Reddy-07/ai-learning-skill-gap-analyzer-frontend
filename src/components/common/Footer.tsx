import React from 'react';

/**
 * Clean technical footer component.
 */
export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--spacing-lg) 0',
      marginTop: 'auto',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-muted)',
      }}>
        <div>
          <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
            AI-Powered Personalized Learning & Skill Gap Analysis System
          </span>
          <p style={{ marginTop: 'var(--spacing-2xs)', fontSize: 'var(--font-size-xs)' }}>
            Objective Role-Based Assessments & LangChain4j Guided Curriculum
          </p>
        </div>
        <div>
          <span>College Technical Training Project • Production Grade Architecture</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

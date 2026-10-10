import React from 'react';
import { QuizQuestion } from '../../types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  onSelectOption: (option: 'A' | 'B' | 'C' | 'D') => void;
}

/**
 * Question card rendering the question text and multiple-choice options (A, B, C, D).
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
}) => {
  const options: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [
    { key: 'A', text: question.optionA },
    { key: 'B', text: question.optionB },
    { key: 'C', text: question.optionC },
    { key: 'D', text: question.optionD },
  ];

  return (
    <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
      {/* Header tags: Skill & Topic */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-sm)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Current Skill:
          </span>
          <span className="badge badge-info" style={{ fontSize: 'var(--font-size-xs)' }}>
            {question.skillName}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <span className="badge badge-purple" style={{ fontSize: 'var(--font-size-xs)' }}>
            Topic: {question.topic}
          </span>
          <span className={`badge ${
            question.difficulty === 'EASY' ? 'badge-success' :
            question.difficulty === 'MEDIUM' ? 'badge-warning' : 'badge-danger'
          }`} style={{ fontSize: 'var(--font-size-xs)' }}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question Prompt */}
      <h3 style={{
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 1.4,
        marginBottom: 'var(--spacing-xl)',
        color: 'var(--color-text-primary)',
      }}>
        {question.questionText}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {options.map(({ key, text }) => {
          const isSelected = selectedOption === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectOption(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all var(--transition-fast)',
              }}
            >
              {/* Option Key Badge */}
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-sm)',
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-background)',
                color: isSelected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                flexShrink: 0,
              }}>
                {key}
              </span>

              {/* Option Text */}
              <span style={{
                fontSize: 'var(--font-size-base)',
                color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isSelected ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
              }}>
                {text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;

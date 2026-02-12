import { useRef } from 'react';
import styles from '../../styles/modals.module.css';

export default function VerificationCodeInput({ length = 6, value, onChange }) {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;
    const newCode = value.split('');
    newCode[index] = val[0];
    const updated = newCode.join('');
    onChange(updated);
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const newCode = value.split('');
        newCode[index] = ' ';
        onChange(newCode.join(''));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newCode = value.split('');
        newCode[index - 1] = ' ';
        onChange(newCode.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      onChange(pasted.padEnd(length, ' '));
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className={styles.verificationInput}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          maxLength={1}
          pattern="[0-9]"
          inputMode="numeric"
          value={value[i]?.trim() || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
        />
      ))}
    </div>
  );
}

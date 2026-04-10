import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StatefulButton — Aceternity UI 스타일 상태형 버튼
 *
 * Props:
 * @param {function} onClick       - 동기 클릭 핸들러 [Optional]
 * @param {function} onClickAsync  - 비동기 클릭 핸들러 (throw 시 error 상태) [Optional]
 * @param {function} beforeSubmit  - async 실행 전 유효성 검사 함수, false 반환 시 로딩 미진입 [Optional]
 * @param {string}   className     - 추가 클래스 [Optional]
 * @param {boolean}  disabled      - 비활성화 여부 [Optional]
 * @param {string}   type          - 버튼 type 속성 [Optional, 기본값: 'button']
 * @param {node}     children      - 버튼 내부 콘텐츠 [Required]
 *
 * Example usage:
 * <StatefulButton onClickAsync={handleSubmit}>방명록 남기기</StatefulButton>
 * <StatefulButton onClick={() => navigate('/about')}>더 알아보기</StatefulButton>
 */
function StatefulButton({
  onClick,
  onClickAsync,
  beforeSubmit,
  children,
  className = '',
  disabled = false,
  type = 'button',
}) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const isCircle = status !== 'idle';

  const handleClick = async () => {
    if (disabled || status !== 'idle') return;

    if (!onClickAsync) {
      onClick?.();
      return;
    }

    if (beforeSubmit && !beforeSubmit()) return;

    setStatus('loading');
    try {
      await onClickAsync();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled || status === 'loading'}
      layout
      animate={{ width: isCircle ? '2.75rem' : 'auto' }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      whileHover={!disabled && !isCircle ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className={`relative overflow-hidden bg-white text-black font-semibold rounded-full h-11 flex items-center justify-center min-w-[2.75rem] cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="px-5 whitespace-nowrap"
          >
            {children}
          </motion.span>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin flex-shrink-0"
          />
        )}

        {status === 'success' && (
          <motion.svg
            key="success"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 text-black"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}

        {status === 'error' && (
          <motion.svg
            key="error"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="flex-shrink-0"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default StatefulButton;

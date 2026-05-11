import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export type UseTypewriterOptions = {
  msPerChar: number;
  startDelay?: number;
  enabled?: boolean;
};

export type UseTypewriterResult = {
  display: string;
  isComplete: boolean;
};

export function useTypewriter(text: string, options: UseTypewriterOptions): UseTypewriterResult {
  const { msPerChar, startDelay = 0, enabled = true } = options;
  const reduce = useReducedMotion() ?? false;
  const [display, setDisplay] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (intervalRef.current !== undefined) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    if (!enabled) {
      setDisplay('');
      setIsComplete(false);
      return;
    }

    if (reduce) {
      setDisplay(text);
      setIsComplete(true);
      return;
    }

    if (text.length === 0) {
      setDisplay('');
      setIsComplete(true);
      return;
    }

    setDisplay('');
    setIsComplete(false);

    const startId = window.setTimeout(() => {
      let index = 0;
      intervalRef.current = window.setInterval(() => {
        index += 1;
        const next = text.slice(0, index);
        setDisplay(next);
        if (index >= text.length) {
          if (intervalRef.current !== undefined) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
          setIsComplete(true);
        }
      }, msPerChar);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [text, msPerChar, startDelay, enabled, reduce]);

  return { display, isComplete };
}

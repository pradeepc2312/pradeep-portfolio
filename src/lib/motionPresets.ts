import type { Transition } from 'framer-motion';

export const tweenEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

export function tweenTransition(reduced: boolean, duration = 0.45): Transition {
  if (reduced) {
    return { duration: 0 };
  }
  return { duration, ease: tweenEase };
}

export function pageFadeTransition(reduced: boolean, duration = 0.2): Transition {
  if (reduced) {
    return { duration: 0 };
  }
  return { duration, ease: tweenEase };
}

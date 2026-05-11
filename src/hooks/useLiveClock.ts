import { useEffect, useState } from 'react';

function formatChennaiTime(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

export function useLiveClock(): string {
  const [time, setTime] = useState<string>(() => formatChennaiTime());

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatChennaiTime());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

import { useState, useEffect } from 'react';

function calculateTimeLeft(targetDate) {
  const distance = new Date(targetDate).getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: '00d 00h 00m 00s' };
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const pad = (n) => n.toString().padStart(2, '0');
  return { days, hours, minutes, seconds, formatted: `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s` };
}

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
}

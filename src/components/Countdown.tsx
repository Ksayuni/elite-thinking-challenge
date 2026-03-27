import { useState, useEffect } from 'react';

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      setTimeout(onComplete, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-white text-9xl font-bold animate-pulse">
          {count === 0 ? 'START!' : count}
        </div>
        <p className="text-white text-2xl mt-8">Get Ready...</p>
      </div>
    </div>
  );
}

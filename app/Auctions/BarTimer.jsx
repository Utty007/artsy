'use client'
import { useState, useEffect } from 'react';

const BarTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const secondsLeft = prevTime - 1;
        if (secondsLeft < 0) {
          clearInterval(timer);
          return 0;
        }
        return secondsLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}hrs : ${minutes
      .toString()
      .padStart(2, '0')}mins : ${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="absolute left-[115px] bottom-8 p-5 flex items-center h-8 bg-white bg-opacity-50 border border-white">
      <div className="flex items-center justify-center text-white font-bold">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default BarTimer;
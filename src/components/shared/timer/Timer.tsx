import React, { useMemo } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerProps {
  duration: number; // in seconds
  initialRemainingTime: Date;
  onCompleted?: () => void;
}

const Timer = ({ duration, initialRemainingTime, onCompleted }: TimerProps) => {
  const calculateRemainingTime = useMemo(() => {
    const now = new Date();
    const initialRemaining = new Date(initialRemainingTime);
    const remainingTime = Math.abs(initialRemaining.getTime() - now.getTime()) / 1000;

    return remainingTime > duration ? 0 : duration - remainingTime;
  }, [initialRemainingTime, duration]);

  return (
    <CountdownCircleTimer
      onComplete={onCompleted}
      isPlaying
      duration={duration}
      initialRemainingTime={calculateRemainingTime}
      colors={['#059669', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      size={80}
      strokeWidth={8}
    >
      {({ remainingTime }) => (
        <div>
          <p className=" text-base font-semibold">
            {Math.floor(remainingTime / 60)} : {remainingTime % 60}
          </p>
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default Timer;

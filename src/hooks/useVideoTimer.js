import { useState, useRef } from "react";

const useVideoTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current !== null) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current === null) return;

    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(initialTime);
    intervalRef.current = null;
  };

  return { time, isRunning, start, stop };
};

export default useVideoTimer;

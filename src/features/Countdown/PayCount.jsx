import React, { useState, useEffect } from "react";


const PayCount = () => {

  const initialTime =  20 * 60; // 30 min in seconds
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          
          return initialTime; // Reset to 30 minutes
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime, ]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="">Time left: </h1>
        <p className="text-1xl font-bold text-red-600"> {`${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
    </>
  );
};

export default PayCount;

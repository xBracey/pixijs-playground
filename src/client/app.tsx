import React, { useCallback, useMemo } from "react";
import "./index.css";

export const App = () => {
  const [points, setPoints] = React.useState(0);

  const addPoint = useCallback(() => {
    setPoints((points) => points + 1);
  }, [setPoints]);

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-5xl flex flex-col items-center"></div>
    </div>
  );
};

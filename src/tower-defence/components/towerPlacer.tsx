import React from "react";

interface TowerPlacerProps {
  setIsPlacingTower: (isPlacingTower: boolean) => void;
}

const CIRCLE_RADIUS = 16;

export const TowerPlacer = ({ setIsPlacingTower }: TowerPlacerProps) => {
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - CIRCLE_RADIUS / 2;
    const y = e.clientY - rect.top - CIRCLE_RADIUS / 2;
    setPosition({ x, y });
  };

  return (
    <div
      className="absolute top-0 left-0 bottom-0 right-0"
      onMouseMove={onMouseMove}
      onClick={() => {
        setIsPlacingTower(false);
      }}
    >
      <div
        className="h-4 w-4 bg-red-400 rounded-full"
        style={{
          position: "absolute",
          top: position?.y,
          left: position?.x,
        }}
      />
    </div>
  );
};

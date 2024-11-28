"use client";

import React from "react";

interface GraphAlertProps {
    value: number;
    min: number;
    max: number;
    greenRange: [number, number]; // A tuple of two numbers
    yellowRange: [[number, number], [number, number]]; // Two tuples
    redRange: [[number, number], [number, number]]; // Two tuples
}
  

const GraphAlert: React.FC<GraphAlertProps> = ({
    value,
    min,
    max,
    greenRange,
    yellowRange,
    redRange,
  }) => {
    const getColor = () => {
      // Ensure greenRange and others are defined and valid
      if (!greenRange || greenRange.length < 2) return "bg-gray-500";
      if (value >= greenRange[0] && value <= greenRange[1]) {
        return "bg-green-500";
      }
      if (
        yellowRange &&
        yellowRange.some(([start, end]) => value >= start && value <= end)
      ) {
        return "bg-yellow-500";
      }
      if (
        redRange &&
        redRange.some(([start, end]) => value >= start && value <= end)
      ) {
        return "bg-red-500";
      }
      return "bg-gray-500"; // Default fallback color
    };
  
    const percentage = ((value - min) / (max - min)) * 100;
  
    return (
      <div className="w-full h-4 bg-gray-300 rounded">
        <div
          className={`h-full rounded ${getColor()}`}
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        ></div>
      </div>
    );
  };

export default GraphAlert;

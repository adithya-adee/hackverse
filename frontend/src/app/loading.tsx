"use client";

import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [stage, setStage] = useState<"initial" | "progress" | "merge">(
    "initial"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((current) => {
        if (current === "initial") {
          // Move to progress stage after 500ms
          setTimeout(() => setStage("progress"), 500);
          return "initial";
        } else if (current === "progress") {
          // Update progress
          setProgress((prev) => {
            if (prev >= 100) {
              // Move to merge stage when progress completes
              setTimeout(() => setStage("merge"), 200);
              return 100;
            }
            return prev + 2; // Adjust speed as needed
          });
          return "progress";
        } else {
          // Reset to initial after merge animation
          setTimeout(() => {
            setProgress(0);
            setStage("initial");
          }, 800);
          return "merge";
        }
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen min-h-[200px] bg-transparent">
      <div className="relative w-24 h-24">
        {/* Initial thin circle */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
            stage === "initial"
              ? "border-gray-400 opacity-100"
              : "border-transparent opacity-0"
          }`}
        />

        {/* Progress ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            stage === "progress" ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-700" />

          {/* Progress ring with gradient */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 46}`}
              strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
              className="transition-all duration-100 ease-out"
            />
          </svg>
        </div>

        {/* Merge animation */}
        <div
          className={`absolute inset-0 transition-all duration-800 ${
            stage === "merge" ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Outer completed ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-80"
              style={{
                mask: "radial-gradient(circle, transparent 42px, black 46px)",
                WebkitMask:
                  "radial-gradient(circle, transparent 42px, black 46px)",
              }}
            />
          </div>

          {/* Inner expanding circle */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-800 ${
              stage === "merge" ? "w-20 h-20 opacity-100" : "w-0 h-0 opacity-0"
            }`}
            style={{
              animation:
                stage === "merge"
                  ? "expandAndFade 800ms ease-out forwards"
                  : "none",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes expandAndFade {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          70% {
            width: 80px;
            height: 80px;
            opacity: 0.8;
          }
          100% {
            width: 96px;
            height: 96px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;

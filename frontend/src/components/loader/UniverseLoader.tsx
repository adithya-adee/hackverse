"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets = [
  "function traverse(node) {",
  "  if (!node) return;",
  "  console.log(node.value);",
  "  traverse(node.left);",
  "  traverse(node.right);",
  "}",
  "const quickSort = (arr) => {",
  "  if (arr.length <= 1) return arr;",
  "  const pivot = arr[0];",
  "  const left = [];",
  "  const right = [];",
  "  for (let i = 1; i < arr.length; i++) {",
  "    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);",
  "  }",
  "  return [...quickSort(left), pivot, ...quickSort(right)];",
  "}",
  "async function fetchData() {",
  "  try {",
  "    const response = await fetch('/api/data');",
  "    return response.json();",
  "  } catch (err) {",
  "    console.error(err);",
  "  }",
  "}",
];

const algorithmSteps = [
  "Initializing environment...",
  "Importing dependencies...",
  "Checking API endpoints...",
  "Compiling components...",
  "Optimizing bundle...",
  "Configuring routes...",
  "Setting up state management...",
  "Building UI elements...",
  "Running tests...",
  "Deployment ready!",
];

interface UniverseLoaderProps {
  message?: string;
  speed?: number; // 1 is normal, 2 is twice as fast, etc.
}

export const UniverseLoader: React.FC<UniverseLoaderProps> = ({
  message = "Building your hackathon universe...",
  speed = 1,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const orbitingCodesRef = useRef<HTMLDivElement>(null);

  // Create orbiting code particles
  useEffect(() => {
    if (!orbitingCodesRef.current) return;

    const container = orbitingCodesRef.current;
    const particleCount = 12;

    // Clean up any existing particles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Random code snippet
      const snippetIndex = Math.floor(Math.random() * codeSnippets.length);
      let text = codeSnippets[snippetIndex];

      // Shorten long snippets
      if (text.length > 15) {
        text = text.substring(0, 12) + "...";
      }

      particle.textContent = text;
      particle.className =
        "absolute text-xs sm:text-sm opacity-70 text-[var(--primary-11)] whitespace-nowrap";

      // Random size
      const size = 0.5 + Math.random() * 0.5;
      particle.style.transform = `scale(${size})`;

      // Random position on orbit
      const angle = (i / particleCount) * 2 * Math.PI;
      const distance = 80 + Math.random() * 120;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;

      // Animation
      const duration = 15 + Math.random() * 25;
      particle.animate(
        [
          {
            transform: `scale(${size}) rotate(0deg) translate(${distance}px) rotate(0deg)`,
          },
          {
            transform: `scale(${size}) rotate(360deg) translate(${distance}px) rotate(-360deg)`,
          },
        ],
        {
          duration: (duration * 1000) / speed,
          iterations: Infinity,
          easing: "linear",
        }
      );

      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [speed]);

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80 / speed);

    return () => clearInterval(progressInterval);
  }, [speed]);

  // Algorithm steps animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= algorithmSteps.length - 1) {
          clearInterval(stepInterval);
          return algorithmSteps.length - 1;
        }
        return prev + 1;
      });
      setVisibleChars(0);
    }, 2500 / speed);

    return () => clearInterval(stepInterval);
  }, [speed]);

  // Text typing effect
  useEffect(() => {
    if (visibleChars >= algorithmSteps[currentStep].length) return;

    const typingInterval = setInterval(() => {
      setVisibleChars((prev) => prev + 1);
    }, 40 / speed);

    return () => clearInterval(typingInterval);
  }, [visibleChars, currentStep, speed]);

  // Current animated text
  const currentText = algorithmSteps[currentStep].substring(0, visibleChars);

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden flex flex-col justify-center items-center bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-5)]">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full z-0"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbiting code particles */}
      <div ref={orbitingCodesRef} className="absolute inset-0 z-10" />

      {/* Central terminal */}
      <motion.div
        className="relative z-20 w-11/12 max-w-md bg-black/90 border border-[var(--primary-7)] rounded-lg shadow-xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="px-4 py-2 bg-[var(--primary-8)] flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-center font-medium flex-1 text-white">
            hackverse-terminal ~ {message}
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm sm:text-base">
          <div className="h-[180px] overflow-hidden">
            {algorithmSteps.slice(0, currentStep).map((step, i) => (
              <div key={i} className="text-green-400 mb-1">
                $ {step} <span className="text-blue-400">✓</span>
              </div>
            ))}
            <div className="text-[var(--primary-9)]">
              $ {currentText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 ml-1 bg-[var(--primary-9)]"
              />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full h-1 bg-[var(--primary-5)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--primary-9)]"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-[var(--primary-11)]">Initializing</span>
              <span className="text-[var(--primary-9)]">{progress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UniverseLoader;

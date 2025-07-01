"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ServerWakingUpProps {
  onReady?: () => void;
}

const ServerWakingUp: React.FC<ServerWakingUpProps> = ({ onReady }) => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [backendReady, setBackendReady] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setLoadingTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    const checkBackend = async () => {
      try {
        // Get status from your health check endpoint
        const response = await fetch("/api/hello");
        if (response.ok) {
          clearInterval(interval);
          setBackendReady(true);
          if (onReady) onReady();
        } else {
          setCheckCount((prev) => prev + 1);
        }
      } catch (error) {
        setCheckCount((prev) => prev + 1);
      }
    };

    // Initial check
    checkBackend();

    // Check every 10 seconds
    const checkInterval = setInterval(checkBackend, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(checkInterval);
    };
  }, [onReady]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--primary-1)]/90 backdrop-blur-sm">
      <div className="max-w-md p-8 rounded-xl bg-[var(--primary-2)] border border-[var(--primary-6)] shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          {backendReady ? (
            <>
              <div className="h-16 w-16 bg-[var(--primary-9)]/20 rounded-full flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-[var(--primary-9)] animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary-12)]">
                Backend Ready! Redirecting...
              </h2>
              <p className="text-[var(--primary-11)]">
                Thanks for your patience! You'll be redirected momentarily.
              </p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 bg-[var(--primary-9)]/20 rounded-full flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-[var(--primary-9)] animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary-12)]">
                Waking up the server...
              </h2>
              <p className="text-[var(--primary-11)]">
                Our server is starting up after being idle. This typically takes
                about 1-2 minutes.
              </p>

              <div className="w-full bg-[var(--primary-3)] rounded-full h-2.5">
                <div
                  className="bg-[var(--primary-9)] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(loadingTime * 2, 100)}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between w-full text-sm text-[var(--primary-10)]">
                <span>Loading: {loadingTime}s</span>
                <span>Health checks: {checkCount}</span>
              </div>

              <p className="text-sm text-[var(--primary-10)] italic">
                You can refresh if this takes longer than expected.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerWakingUp;

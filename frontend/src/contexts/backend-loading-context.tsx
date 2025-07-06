"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import ServerWakingUp from "@/app/backend-loading-check";
import { Loader2 } from "lucide-react";

type BackendStatus = "checking" | "ready" | "waking-up" | "error";

interface BackendContextType {
  status: BackendStatus;
  checkBackend: () => Promise<boolean>;
}

const BackendContext = createContext<BackendContextType>({
  status: "checking",
  checkBackend: async () => false,
});

export const useBackend = () => useContext(BackendContext);

export const BackendProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<BackendStatus>("checking");
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const checkBackend = async (): Promise<boolean> => {
    try {
      const startTime = performance.now();
      const response = await fetch("/api/hello", {
        signal: AbortSignal.timeout(120000), // 2-minute timeout
      });
      const endTime = performance.now();

      if (response.ok) {
        // If response took more than 1s, consider it a waking server
        if (endTime - startTime > 1000 && status !== "ready") {
          setStatus("waking-up");
          return false;
        } else {
          setStatus("ready");
          return true;
        }
      } else {
        setStatus("waking-up");
        return false;
      }
    } catch (error) {
      setStatus("waking-up");
      return false;
    }
  };

  useEffect(() => {
    const initialCheck = async () => {
      await checkBackend();
      setInitialCheckDone(true);
    };

    initialCheck();
  }, []);

  if (!initialCheckDone) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[var(--primary-9)] animate-spin" />
      </div>
    );
  }

  return (
    <BackendContext.Provider value={{ status, checkBackend }}>
      {status === "waking-up" && (
        <ServerWakingUp onReady={() => setStatus("ready")} />
      )}
      {children}
    </BackendContext.Provider>
  );
};

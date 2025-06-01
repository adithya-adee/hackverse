"use client";
import { HackathonCompleteData } from "@/schemas/hackathon";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface HackathonFormContextType {
  formData: Partial<HackathonCompleteData>;
  updateFormData: (
    data: Partial<HackathonCompleteData>,
  ) => Partial<HackathonCompleteData>;
  resetFormData: () => void;
}

const HackathonFormContext = createContext<
  HackathonFormContextType | undefined
>(undefined);

const initialFormData: Partial<HackathonCompleteData> = {
  title: "",
  description: "",
  location: "",
  mode: "ONLINE",
  maxTeamSize: 4,
  registrationDate: "",
  startDate: "",
  endDate: "",
  bannerImageUrl: "",
  tags: [],
  tabs: [
    { title: "Overview", content: "", order: 1, isVisible: true },
    { title: "Rules", content: "", order: 2, isVisible: true },
    { title: "Prizes", content: "", order: 3, isVisible: true },
  ],
  moderatorEmails: [],
};

export function HackathonFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] =
    useState<Partial<HackathonCompleteData>>(initialFormData);

  const updateFormData = (data: Partial<HackathonCompleteData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    return formData;
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const value: HackathonFormContextType = {
    formData,
    updateFormData,
    resetFormData,
  };

  return (
    <HackathonFormContext.Provider value={value}>
      {children}
    </HackathonFormContext.Provider>
  );
}

export function useHackathonForm() {
  const context = useContext(HackathonFormContext);
  if (context === undefined) {
    throw new Error(
      "useHackathonForm must be used within a HackathonFormProvider",
    );
  }
  return context;
}

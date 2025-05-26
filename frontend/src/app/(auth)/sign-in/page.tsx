"use client";

import LoginForm from "@/components/LoginForm";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex items-center justify-center p-6">
      <LoginForm />;
    </div>
  );
}

export default Page;

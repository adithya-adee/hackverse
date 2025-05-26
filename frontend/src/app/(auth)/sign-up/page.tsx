import SignUpComponent from "@/components/SignupForm";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex items-center justify-center p-6">
      <SignUpComponent />;
    </div>
  );
}

export default Page;

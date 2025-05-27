"use client";

import UserDetailsUpdatePage from "./userDetailsPage";

function DashboardPage() {
  return (
    <div className="w-full min-h-[200vh] h-auto bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-start p-6 mt-10">
      <UserDetailsUpdatePage />
    </div>
  );
}

export default DashboardPage;

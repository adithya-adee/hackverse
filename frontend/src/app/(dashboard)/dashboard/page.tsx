"use client";

import UserDetailsUpdatePage from "./userDetailsPage";
import UserDock from "./userdock";

function DashboardPage() {
  return (
    <div className="w-full min-h-[200vh] h-auto bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex flex-col items-center justify-start p-6 mt-10">
      <UserDock />
      <UserDetailsUpdatePage />
    </div>
  );
}

export default DashboardPage;

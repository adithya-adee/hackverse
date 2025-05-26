"use client";

import { useRouter } from "next/navigation";

const profileNavbarItems = [
  { label: "Profile" },
  { label: "Team-Requests" },
  { label: "History" },
];

function UserProfileNavbar() {
  const router = useRouter();

  return (
    <nav className="w-full border border-purple-600 rounded-2xl p-5">
      <div className="flex items-start">
        {profileNavbarItems.map((prop, index) => (
          <div
            className="mx-3 text-white cursor-pointer"
            key={index}
            role="link"
            onClick={() =>
              router.push(`/dashboard/${prop.label.toLowerCase()}`)
            }
          >
            {prop.label}
          </div>
        ))}
      </div>
    </nav>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex flex-col items-center justify-center p-6">
      <UserProfileNavbar />
      <div>Get User Details</div>
    </div>
  );
}

export default DashboardPage;

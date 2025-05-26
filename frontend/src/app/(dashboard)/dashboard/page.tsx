const profileNavbarItems = [{ label: "Profile" }, { label: "History" }];

function UserProfileNavbar() {
  return (
    <nav>
      {profileNavbarItems.map((prop, index) => (
        <div key={index}>{prop.label}</div>
      ))}
    </nav>
  );
}

function DashboardPage() {
  return (
    <div>
      <UserProfileNavbar />
    </div>
  );
}

export default DashboardPage;

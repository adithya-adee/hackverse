import Navbar from "@/components/root components/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      {children}
    </div>
  );
}

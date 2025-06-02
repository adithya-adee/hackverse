// layout.tsx
import { HackathonProgress } from "@/components/root components/hackathon-progress";
import Navbar from "@/components/root components/Navbar";
import { HackathonFormProvider } from "@/contexts/hackathon-form-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-22">
        <HackathonProgress />
      </div>
      <div>
        <HackathonFormProvider>{children}</HackathonFormProvider>
      </div>
    </div>
  );
}

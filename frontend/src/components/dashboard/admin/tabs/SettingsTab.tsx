import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsTab() {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center py-4 text-[var(--muted-foreground)]">
          Settings content will appear here
        </p>
      </CardContent>
    </Card>
  );
}

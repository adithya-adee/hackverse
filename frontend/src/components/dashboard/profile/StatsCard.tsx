type StatsCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
};

export function StatsCard({
  icon,
  value,
  label,
  color = "text-[var(--primary-9)]",
}: StatsCardProps) {
  return (
    <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
      <div className={`flex items-center justify-center mb-1 ${color}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--foreground)]">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

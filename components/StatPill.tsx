interface StatPillProps {
  label: string;
  value: string | number;
}

export default function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-scene-surface border border-scene-border rounded-full px-4 py-2">
      <span className="text-scene-accent font-semibold text-sm">{value}</span>
      <span className="text-scene-muted text-sm">{label}</span>
    </div>
  );
}

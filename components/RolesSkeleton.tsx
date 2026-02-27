export default function RolesSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-lg bg-neutral-200 animate-pulse"
        />
      ))}
    </div>
  );
}

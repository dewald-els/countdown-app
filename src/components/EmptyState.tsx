export function EmptyState() {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto mb-4 opacity-50"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <p className="text-lg">No countdowns yet</p>
      <p className="text-sm mt-1">Add your first event to start tracking!</p>
    </div>
  );
}

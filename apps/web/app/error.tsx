"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="empty-state" role="alert">
      <h2>Something went wrong</h2>
      <p>Please try loading this screen again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

import Link from "next/link";
import { EmptyState } from "@aarambham/ui";
export default function NotFound() {
  return (
    <div style={{ padding: "50px 24px" }}>
      <EmptyState
        title="404 · Page not found"
        description="This page does not exist in the milestone preview."
      >
        <Link className="button" href="/">
          Back to home
        </Link>
      </EmptyState>
    </div>
  );
}

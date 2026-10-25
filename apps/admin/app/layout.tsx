import type { Metadata } from "next";
import "@aarambham/ui/styles.css";
import "./admin.css";
import { AdminShell } from "../components/admin-shell";
export const metadata: Metadata = {
  title: {
    default: "AARAMBHAM Newsroom — Demo",
    template: "%s | AARAMBHAM Newsroom",
  },
  description:
    "Frontend newsroom demonstration. No authentication or publishing.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

import Link from "next/link";
import { Logo, Badge } from "@aarambham/ui";
export default function Login() {
  return (
    <div className="login-page">
      <div className="login-story">
        <Logo />
        <div>
          <span className="eyebrow">THE NEXT CHAPTER</span>
          <h1 lang="te">
            అక్షరానికి గౌరవం.
            <br />
            వార్తకు బాధ్యత.
          </h1>
          <p>A thoughtful workspace for the people behind every story.</p>
        </div>
        <span>ఆరంభం · TRUTH IS GOD</span>
      </div>
      <div className="login-panel">
        <Badge tone="orange">MILESTONE 1 PREVIEW</Badge>
        <h2>Welcome to the newsroom.</h2>
        <p>
          Explore the editorial workspace. Secure sign-in will be connected in a
          future milestone.
        </p>
        <div className="login-unavailable">
          <strong>Authentication is not configured</strong>
          <p>
            No credentials are collected. This preview does not establish a
            session or verify a role.
          </p>
          <button className="button" disabled>
            Sign in unavailable
          </button>
        </div>
        <Link href="/dashboard" className="button button-secondary">
          Open frontend demo →
        </Link>
        <span className="muted">
          For client review · No live publication access
        </span>
      </div>
    </div>
  );
}

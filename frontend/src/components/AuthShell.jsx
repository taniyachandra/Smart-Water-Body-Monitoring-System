import { useState } from "react";
import Waves from "./Waves";
import { IconCheck, IconEye, IconEyeOff } from "./Icons";
import "./AuthShell.css";

const POINTS = [
  "Browse readings and maps for rivers and lakes",
  "Report pollution with a photo and exact location",
  "Keep your reports linked to your account",
];

/* Two-column layout shared by Login and Signup */
export function AuthShell({ children }) {
  return (
    <main className="auth-page">
      <aside className="auth-side on-dark">
        <div className="auth-side-inner">
          <h2>Clean water starts with people who notice.</h2>
          <ul>
            {POINTS.map((point) => (
              <li key={point}>
                <span>
                  <IconCheck size={16} strokeWidth={2.6} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <Waves />
      </aside>

      <div className="auth-main">
        <div className="auth-card">{children}</div>
      </div>
    </main>
  );
}

export function PasswordInput({ id, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input id={id} type={visible ? "text" : "password"} className="input" {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  );
}

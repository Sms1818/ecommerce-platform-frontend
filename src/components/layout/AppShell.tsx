import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userDisplayName } from "../../utils/auth";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-saffron/15 text-saffron-deep"
      : "text-ink-muted hover:bg-ivory-warm hover:text-ruby-deep"
  }`;

const AppShell = ({ title, subtitle, children, action }: AppShellProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/products");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-ivory-dark/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to={user ? "/dashboard" : "/products"}
            className="font-display text-xl font-semibold text-ruby-deep sm:text-2xl"
          >
            Bazaar
            <span className="bg-linear-to-r from-saffron to-marigold bg-clip-text text-transparent">
              {" "}
              Bharat
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {user ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
                <span className="hidden px-2 text-sm text-ink-muted sm:inline">
                  {userDisplayName(user)}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-ivory-warm hover:text-ruby-deep"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
                <NavLink to="/login" className={navLinkClass}>
                  Sign in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-lg bg-linear-to-r from-saffron-deep to-marigold px-3 py-2 text-sm font-semibold text-white shadow-md shadow-saffron/25 transition-all hover:shadow-lg"
                >
                  Join
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ruby-deep sm:text-4xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
          {action}
        </div>

        {children}
      </main>
    </div>
  );
};

export default AppShell;

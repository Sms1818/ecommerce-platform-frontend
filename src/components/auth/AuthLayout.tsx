import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  wide?: boolean;
};

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
  wide = false,
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <aside className="relative hidden w-[44%] overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-linear-to-br from-plum-deep via-plum to-plum-light" />
        <div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-gold-glow/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold-glow uppercase backdrop-blur-sm">
              Luxe Commerce
            </span>
            <h1 className="mt-10 font-display text-5xl leading-tight font-semibold text-white xl:text-6xl">
              Curated for
              <span className="mt-1 block text-gold-glow italic">
                the discerning
              </span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70">
              Discover exceptional products, tailored experiences, and a
              shopping journey as refined as your taste.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold-glow">
                ✦
              </span>
              Exclusive member collections
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold-glow">
                ✦
              </span>
              Priority access to new arrivals
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold-glow">
                ✦
              </span>
              Seamless, secure checkout
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8 lg:px-14">
        <div className={`w-full ${wide ? "max-w-2xl" : "max-w-md"}`}>
          <div className="mb-8 lg:hidden">
            <span className="font-display text-2xl font-semibold text-plum-deep">
              Luxe
              <span className="text-gold"> Commerce</span>
            </span>
          </div>

          <div className="rounded-2xl border border-cream-dark/80 bg-white/90 p-8 shadow-xl shadow-plum-deep/5 backdrop-blur-sm sm:p-10">
            <header className="mb-8">
              <h2 className="font-display text-3xl font-semibold text-plum-deep sm:text-4xl">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {subtitle}
              </p>
            </header>

            {children}

            <p className="mt-8 text-center text-sm text-ink-muted">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-semibold text-gold transition-colors hover:text-gold-light"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;

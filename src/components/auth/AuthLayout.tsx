import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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
        <div className="absolute inset-0 bg-linear-to-br from-ruby-deep via-indigo-deep to-teal-deep" />
        <div className="absolute inset-0 bg-linear-to-tr from-saffron-deep/40 via-transparent to-marigold/25" />
        <div className="absolute inset-0 bg-linear-to-bl from-teal/30 via-transparent to-ruby/20" />

        <div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-saffron/35 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-marigold/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute right-1/4 bottom-0 h-80 w-80 translate-y-1/3 rounded-full bg-teal-light/25 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-ruby-light/20 blur-2xl"
          aria-hidden
        />

        <div
          className="rangoli-dots absolute inset-0 opacity-[0.12]"
          aria-hidden
        />

        <svg
          className="absolute top-8 right-8 h-32 w-32 text-marigold/20"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute bottom-12 left-8 h-24 w-24 text-saffron/25"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="28"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-marigold-glow uppercase backdrop-blur-sm">
              <span className="text-saffron" aria-hidden>
                ✦
              </span>
              Bazaar Bharat
            </span>
            <h1 className="mt-10 font-display text-5xl leading-tight font-semibold text-ivory xl:text-6xl">
              Shopping with
              <span className="mt-1 block bg-linear-to-r from-marigold via-marigold-light to-saffron bg-clip-text text-transparent italic">
                soul & colour
              </span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ivory/75">
              Handpicked treasures, vibrant collections, and a marketplace
              inspired by the warmth of Indian bazaars.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-ivory/65">
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-saffron/40 to-marigold/30 text-marigold-glow">
                ◈
              </span>
              Artisan & regional specials
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-teal/40 to-teal-light/30 text-marigold-glow">
                ◈
              </span>
              Festive drops & early access
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-ruby/40 to-saffron/30 text-marigold-glow">
                ◈
              </span>
              Secure, seamless checkout
            </li>
          </ul>
        </div>
      </aside>

      <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8 lg:px-14">
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-ivory-warm/80 via-ivory to-ivory-warm/60"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-marigold/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl"
          aria-hidden
        />

        <div
          className={`relative z-10 w-full ${wide ? "max-w-2xl" : "max-w-md"}`}
        >
          <div className="mb-8 lg:hidden">
            <span className="font-display text-2xl font-semibold text-ruby-deep">
              Bazaar
              <span className="bg-linear-to-r from-saffron to-marigold bg-clip-text text-transparent">
                {" "}
                Bharat
              </span>
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-ivory-dark bg-white/85 p-8 shadow-2xl shadow-ruby-deep/8 backdrop-blur-md sm:p-10">
            <div
              className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-teal via-marigold via-50% to-saffron"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-marigold/10 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-teal/8 blur-2xl"
              aria-hidden
            />

            <header className="relative mb-8">
              <h2 className="font-display text-3xl font-semibold text-ruby-deep sm:text-4xl">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {subtitle}
              </p>
            </header>

            <div className="relative">{children}</div>

            <p className="relative mt-8 text-center text-sm text-ink-muted">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-semibold text-saffron-deep transition-colors hover:text-marigold"
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

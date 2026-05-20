import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

const Panel = ({ children, className = "" }: PanelProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-ivory-dark bg-white/85 p-6 shadow-xl shadow-ruby-deep/5 backdrop-blur-md sm:p-8 ${className}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-teal via-marigold via-50% to-saffron"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default Panel;

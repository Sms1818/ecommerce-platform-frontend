type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
};

const variantClasses = {
  primary:
    "bg-linear-to-r from-saffron-deep via-saffron to-marigold text-white shadow-lg shadow-saffron/30 hover:from-saffron hover:to-marigold-light hover:shadow-xl hover:shadow-marigold/35",
  secondary:
    "border border-ivory-dark bg-white text-ruby-deep shadow-sm hover:border-saffron hover:bg-ivory-warm/80",
  danger:
    "border border-ruby/30 bg-ruby/5 text-ruby-deep hover:border-ruby hover:bg-ruby/10",
};

const Button = ({
  children,
  loading = false,
  type = "submit",
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

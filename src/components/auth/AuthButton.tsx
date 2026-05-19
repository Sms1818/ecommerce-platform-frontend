type AuthButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
};

const AuthButton = ({ children, loading = false }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full rounded-xl bg-linear-to-r from-saffron-deep via-saffron to-marigold px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-saffron/30 transition-all hover:from-saffron hover:to-marigold-light hover:shadow-xl hover:shadow-marigold/35 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
};

export default AuthButton;

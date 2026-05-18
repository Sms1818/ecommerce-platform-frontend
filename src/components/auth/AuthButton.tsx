type AuthButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
};

const AuthButton = ({ children, loading = false }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full rounded-xl bg-linear-to-r from-gold to-gold-light px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/30 hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
};

export default AuthButton;

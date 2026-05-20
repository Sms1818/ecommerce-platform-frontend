import Button from "../ui/Button";

type AuthButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
};

const AuthButton = ({ children, loading = false }: AuthButtonProps) => {
  return (
    <Button loading={loading} className="mt-2 w-full">
      {children}
    </Button>
  );
};

export default AuthButton;

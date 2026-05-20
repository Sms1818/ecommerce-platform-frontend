type AlertProps = {
  variant: "error" | "success";
  message: string;
};

const Alert = ({ variant, message }: AlertProps) => {
  const styles =
    variant === "error"
      ? "border-ruby/30 bg-ruby/5 text-ruby-deep"
      : "border-teal/30 bg-teal/5 text-teal-deep";

  return (
    <p
      className={`rounded-xl border px-4 py-3 text-sm ${styles}`}
      role="alert"
    >
      {message}
    </p>
  );
};

export default Alert;

type AuthFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  as?: "input" | "select";
  children?: React.ReactNode;
};

const fieldClassName =
  "w-full rounded-xl border border-cream-dark bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/60 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";

const labelClassName =
  "mb-1.5 block text-xs font-semibold tracking-wide text-ink-muted uppercase";

const AuthField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  as = "input",
  children,
}: AuthFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      {as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${fieldClassName} cursor-pointer`}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={fieldClassName}
        />
      )}
    </div>
  );
};

export default AuthField;

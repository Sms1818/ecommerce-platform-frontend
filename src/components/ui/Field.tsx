type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  as?: "input" | "select" | "textarea";
  children?: React.ReactNode;
  required?: boolean;
  min?: number;
  step?: string;
  rows?: number;
};

export const fieldClassName =
  "w-full rounded-xl border border-ivory-dark bg-ivory-warm/60 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/60 focus:border-saffron focus:bg-white focus:ring-2 focus:ring-saffron/20";

export const labelClassName =
  "mb-1.5 block text-xs font-semibold tracking-wide text-ruby-deep/80 uppercase";

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  as = "input",
  children,
  required,
  min,
  step,
  rows = 3,
}: FieldProps) => {
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
          required={required}
          className={`${fieldClassName} cursor-pointer`}
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`${fieldClassName} resize-y`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          step={step}
          className={fieldClassName}
        />
      )}
    </div>
  );
};

export default Field;

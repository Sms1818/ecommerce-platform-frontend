import Field from "../ui/Field";

type AuthFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  as?: "input" | "select";
  children?: React.ReactNode;
};

const AuthField = (props: AuthFieldProps) => {
  return <Field {...props} />;
};

export default AuthField;

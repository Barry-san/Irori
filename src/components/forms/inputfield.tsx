import { FieldWrapper } from "./FieldWrapper";
import {} from "react-hook-form";
type inputProps = {
  type: string;
  className?: string;
  label?: string;
  error?: string;
  registration: object;
  placeholder?: string;
};

export const InputField = (props: inputProps) => {
  const { type, className, label, registration, error, placeholder } = props;
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={`${className}`}
        {...registration}
        formNoValidate={true}
        placeholder={placeholder}
      />
      <p className="text-red-400">{error}</p>
    </FieldWrapper>
  );
};

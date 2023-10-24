import { FieldWrapper } from "./FieldWrapper";
import { UseFormRegisterReturn } from "react-hook-form";

type TextfieldProps = {
  label?: string;
  registration: UseFormRegisterReturn;
  placeholder: string;
  columns?: number;
  rows?: number;
  className?: string;
};

export const TextField = ({
  label,
  registration,
  placeholder,
  columns,
  rows,
  className,
}: TextfieldProps) => {
  return (
    <FieldWrapper label={label}>
      <textarea
        cols={columns}
        rows={rows}
        className={className}
        {...registration}
        placeholder={placeholder}
      ></textarea>
    </FieldWrapper>
  );
};

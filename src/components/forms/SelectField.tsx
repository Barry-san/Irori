import { UseFormRegisterReturn } from "react-hook-form";
type selecFieldProps = {
  options: string[];
  registration: UseFormRegisterReturn;
  placeholder?: string;
};
export const SelectField = ({
  options,
  registration,
  placeholder,
}: selecFieldProps) => {
  return (
    <select
      {...registration}
      className="px-8 py-2 border border-black text-lg "
    >
      <option disabled value={placeholder} selected={true}>
        {placeholder}
      </option>
      {options.map((option, index) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

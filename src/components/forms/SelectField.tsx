import { UseFormRegisterReturn } from "react-hook-form";

import React from "react";

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
      <option value="" selected disabled hidden>
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

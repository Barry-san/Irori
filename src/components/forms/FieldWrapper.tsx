import React from "react";
type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
};

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { className, children, label } = props;
  return (
    <div
      className={`flex flex-col gap-1 items-start justify-center ${className}`}
    >
      <label>{label}</label>
      {children}
    </div>
  );
};

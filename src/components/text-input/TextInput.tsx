import { forwardRef } from "react";

interface IInput {
  label?: string;
  name?: string;
  placeholder?: string;
  icon?: JSX.Element;
  type: "email" | "password" | "text" | "radio";
  value?: "man" | "woman";
}

export const TextInput = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { label, name, type, placeholder, icon, value } = props;
  return (
    <label>
      {type !== "radio" && label}
      <div className="input_block">
        {icon}
        <input
          ref={ref}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
        />
        {type === "radio" && label}
      </div>
    </label>
  );
});

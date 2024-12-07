import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  required = false,
  autoComplete,
  className = '',
  ...rest
}) => (
  <div>
    <label htmlFor={id} className="block text-sm/6 text-gray-900 font-bold">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1
             outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light 
             sm:text-sm/6 ${className}`}
        {...rest}
      />
    </div>
  </div>
);

export default InputField;

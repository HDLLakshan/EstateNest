import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  onClick,
  className = '',
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex w-40 justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 mx-auto ${className}`}
  >
    {children}
  </button>
);

export default Button;

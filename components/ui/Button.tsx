import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded font-semibold transition-colors',
        variant === 'default' && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'outline' &&
          'border border-gray-400 text-gray-200 hover:bg-gray-800',
        variant === 'ghost' &&
          'bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300',
        size === 'sm' && 'px-2 py-1 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

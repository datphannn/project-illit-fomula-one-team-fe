import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

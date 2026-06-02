import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div
      id={id}
      className={`mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

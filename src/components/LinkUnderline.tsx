import React from "react";

interface LinkUnderlineProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export const LinkUnderline: React.FC<LinkUnderlineProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <a
      className={`relative inline-block text-ink hover:text-deep transition-colors duration-300 group cursor-pointer ${className}`}
      {...props}
    >
      {children}
      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-deep scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300" />
    </a>
  );
};

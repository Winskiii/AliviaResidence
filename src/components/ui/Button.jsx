import React from "react";

const variantClasses = {
  primary: "bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  secondary: "bg-white hover:bg-gray-50 text-primary border border-gray-200 shadow-sm hover:shadow-md",
  whatsapp: "bg-[#25D366] hover:bg-[#1da851] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
  ghost: "text-primary hover:bg-primary/10",
  accent: "bg-accent hover:bg-accent-dark text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className = "",
  disabled = false,
  type = "button",
  target,
  rel,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer";

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;

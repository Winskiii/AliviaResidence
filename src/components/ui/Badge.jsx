import React from "react";

const Badge = ({ children, variant = "green", className = "" }) => {
  const variantClasses = {
    green: "bg-green-100 text-green-700 border border-green-200",
    gold: "bg-amber-100 text-amber-700 border border-amber-200",
    blue: "bg-blue-100 text-blue-700 border border-blue-200",
    red: "bg-red-100 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
    primary: "bg-primary/10 text-primary border border-primary/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        variantClasses[variant] || variantClasses.green
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

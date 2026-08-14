import React from "react";

const Card = ({
  children,
  className = "",
  hover = true,
  padding = true,
  onClick,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card overflow-hidden ${
        hover ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover cursor-pointer" : ""
      } ${padding ? "p-6" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.Image = ({ src, alt, className = "" }) => (
  <div className={`overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      loading="lazy"
    />
  </div>
);

Card.Body = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

export default Card;

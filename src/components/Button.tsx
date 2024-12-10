import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  color?: "blue" | "red" | "green" | "yellow";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  color = "blue",
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "w-full px-6 py-2 font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-80";
  const colorClasses = {
    blue: "text-white bg-blue-600 hover:bg-blue-500 focus:ring-blue-300",
    red: "text-white bg-red-600 hover:bg-red-500 focus:ring-red-300",
    green: "text-white bg-green-600 hover:bg-green-500 focus:ring-green-300",
    yellow: "text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-yellow-300",
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]} ${className ?? ""}`}
      {...props} 
    >
      {children}
    </button>
  );
}

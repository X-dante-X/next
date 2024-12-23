import { InputHTMLAttributes } from "react";

type InputFieldProps = {
  label?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ label, error, className, ...props }: InputFieldProps) {
  return (
    <div>
      {label ? <label className="block text-sm text-gray-500 dark:text-gray-300">{label}</label> : null}
      <input
        className={`block mt-1 w-full rounded-lg border px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300 
                ${error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-400 focus:ring-blue-300"} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

type CheckboxFieldProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ label, ...props }: CheckboxFieldProps) {
  return (
    <div className="flex flex-row w-full justify-evenly">
      {label ? <label className="block text-sm text-gray-500 dark:text-gray-300">{label}</label> : null}
      <input
        type="checkbox"
        className={`block rounded-lg border text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-900 `}
        {...props}
      />
    </div>
  );
}

import { InputHTMLAttributes } from "react";

type InputFieldProps = {
    label: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
    label,
    error,
    ...props
}: InputFieldProps) {
    return (
        <div>
            <label className="block text-sm text-gray-500 dark:text-gray-300">
                {label}
            </label>
            <input
                className={`block mt-2 w-full rounded-lg border px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300 
                ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300'}`}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} 
        </div>
    );
}

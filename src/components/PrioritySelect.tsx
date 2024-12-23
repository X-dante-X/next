import { TaskPriority } from "@/types/user.types";

interface PrioritySelectProps {
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
  options: TaskPriority[];
  className?: string;
}

export function PrioritySelect({ value, onChange, options, className = "" }: PrioritySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskPriority)}
      className={`block w-full px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300 ${className}`}>
      {options.map((option) => (
        <option
          key={option}
          value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}

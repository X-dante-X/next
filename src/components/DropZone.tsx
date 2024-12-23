import Image from "next/image";
import { ChangeEvent, DragEvent, useState } from "react";

type DropZoneProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  previewImage?: string;
};

export default function DropZone({ onChange, error, previewImage }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileInputEvent = {
        target: { files: e.dataTransfer.files },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(fileInputEvent);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-2">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center w-full p-5 text-center bg-white border-2 border-dashed cursor-pointer rounded-xl dark:bg-gray-900 ${
          isDragging ? "border-blue-500 dark:border-blue-400" : "border-gray-300 dark:border-gray-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-gray-500 dark:text-gray-400">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Upload Avatar</h2>
        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or drag & drop your file SVG, PNG, JPG, or GIF.</p>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>

      {previewImage && (
        <div className="mt-4">
          <Image
            src={previewImage}
            alt="Preview"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-full border border-gray-300 dark:border-gray-700"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

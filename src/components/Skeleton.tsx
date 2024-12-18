interface SkeletonProps {
  className?: string;
}

export function SkeletonText({ className }: SkeletonProps) {
  const width = ["w-14", "w-20", "w-24", "w-28", "w-36"];
  const randomWidth = width[Math.floor(Math.random() * width.length)];
  return <div className={`animate-pulse h-2 bg-gray-200 rounded-lg dark:bg-gray-700 ${randomWidth} ${className}`} />;
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 ${className}`} />;
}

export function SkeletonField({ className }: SkeletonProps) {
  const width = ["w-10", "w-14", "w-16", "w-24", "w-28"];
  const randomWidth = width[Math.floor(Math.random() * width.length)];

  return (
    <div>
      <div className={`h-2`} />
      <div className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 h-2 ${randomWidth} ${className}`} />
      <div className={`h-1`} />
      <div className={`animate-pulse w-full rounded-lg bg-gray-500 dark:bg-gray-800 border-gray-600 mt-1 h-[46px] ${className}`} />
    </div>
  );
}

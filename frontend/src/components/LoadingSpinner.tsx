"use client";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner = ({
  size = "medium",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-border-primary border-t-button-primary rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

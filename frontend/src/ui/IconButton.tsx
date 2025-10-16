"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import Image from "next/image";

const iconButtonClasses = cva(
  "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-background disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-secondary-background border border-border-primary text-text-secondary hover:bg-secondary-light",
        primary: "bg-button-primary text-text-white hover:bg-primary-light",
        secondary:
          "bg-button-secondary text-text-secondary hover:bg-secondary-light",
        ghost: "bg-transparent text-text-secondary hover:bg-secondary-light",
      },
      size: {
        small: "w-8 h-8 p-1",
        medium: "w-10 h-10 p-2",
        large: "w-12 h-12 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
);

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonClasses> {
  // Required parameters with defaults
  src?: string;
  border_border_radius?: string;
  fill_background_color?: string;
  padding?: string;

  // Optional parameters
  layout_width?: string;
  layout_align_self?: string;
  position?: string;

  // Standard React props
  children?: ReactNode;
}

const IconButton = ({
  // Required parameters with defaults
  src,
  border_border_radius = "rounded-sm",
  fill_background_color,
  padding,

  // Optional parameters
  layout_width,
  layout_align_self,
  position,

  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  ...props
}: IconButtonProps) => {
  // Safe validation for optional parameters
  const hasValidWidth =
    layout_width &&
    typeof layout_width === "string" &&
    layout_width.trim() !== "";
  const hasValidAlignSelf =
    layout_align_self &&
    typeof layout_align_self === "string" &&
    layout_align_self.trim() !== "";
  const hasValidPosition =
    position && typeof position === "string" && position.trim() !== "";
  const hasValidPadding =
    padding && typeof padding === "string" && padding.trim() !== "";

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : "",
    hasValidAlignSelf
      ? layout_align_self === "center"
        ? "self-center"
        : layout_align_self === "start"
        ? "self-start"
        : layout_align_self === "end"
        ? "self-end"
        : ""
      : "",
    hasValidPosition ? position : "",
    hasValidPadding ? `p-[${padding}]` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Build custom styles for non-Tailwind properties
  const customStyles: CSSProperties = {
    ...(fill_background_color &&
      !fill_background_color.startsWith("bg-") && {
        backgroundColor: fill_background_color,
      }),
  };

  // Build Tailwind classes for styling
  const styleClasses = [
    border_border_radius,
    fill_background_color && fill_background_color.startsWith("bg-")
      ? fill_background_color
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      style={customStyles}
      className={twMerge(
        iconButtonClasses({ variant, size }),
        styleClasses,
        optionalClasses,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {src ? (
        <Image
          width={8}
          height={8}
          src={src}
          alt="Icon"
          className="w-full h-full object-contain"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default IconButton;

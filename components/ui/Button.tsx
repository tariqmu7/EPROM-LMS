import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-eprom-bright focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-eprom-blue text-white hover:bg-eprom-hover shadow-sm",
  secondary:
    "bg-white text-eprom-blue border-2 border-eprom-blue hover:bg-eprom-blue hover:text-white",
  accent: "bg-eprom-lime text-ink hover:brightness-95 shadow-sm",
  ghost: "bg-transparent text-eprom-blue hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-[15px] px-6 py-3",
};

function classes(variant: Variant, size: Size, className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return <button className={classes(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<typeof Link>) {
  return <Link className={classes(variant, size, className)} {...props} />;
}

import clsx from "clsx";
import React from "react";

export default function Card({
  className,
  children: child,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      onClick={onClick}
    >
      {child}
    </div>
  );
}

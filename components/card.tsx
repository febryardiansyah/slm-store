import clsx from "clsx";
import React from "react";

export default function Card({
  className,
  children: child,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {child}
    </div>
  );
}

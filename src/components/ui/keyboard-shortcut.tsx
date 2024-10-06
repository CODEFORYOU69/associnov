"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, type ComponentPropsWithoutRef } from "react";
import { useKey } from "react-use";

const keyboardShortcutVariants = cva(
  "pointer-events-none inline-flex items-center gap-1 overflow-hidden text-nowrap rounded border font-mono shadow-[0_2px_0px_0px_rgba(0,0,0,0.5)] transition",

  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        success:
          "border-green-400 bg-success text-success-foreground dark:border-green-800",
      },
      size: {
        sm: "h-4 px-1 text-xs font-medium",
        default: "h-5 px-1.5 text-xs font-medium",
        lg: "h-6 px-2 text-sm font-medium",
      },
      isKeyDown: {
        true: "translate-y-0.5 bg-accent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
export type KeyboardShortcutProps = ComponentPropsWithoutRef<"kbd"> &
  VariantProps<typeof keyboardShortcutVariants> & {
    eventKey?: string;
  };

const keyCondition = (event: KeyboardEvent, key?: string) => {
  if (key === "cmd" || key === "ctrl") {
    return event.metaKey || event.key === "Meta";
  }

  if (key === "shift") {
    return event.shiftKey;
  }

  return key === event.key;
};

export const KeyboardShortcut = ({
  children,
  variant,
  size,
  eventKey,
  ...props
}: KeyboardShortcutProps) => {
  const [isKeyDown, setIsKeyDown] = useState(false);

  useKey(
    (event) => keyCondition(event, eventKey),
    () => setIsKeyDown(true),
    { event: "keydown" },
  );

  useKey(
    (event) => keyCondition(event, eventKey),
    () => setIsKeyDown(false),
    { event: "keyup" },
  );

  return (
    <kbd
      className={cn(keyboardShortcutVariants({ variant, size, isKeyDown }))}
      {...props}
    >
      {children}
    </kbd>
  );
};

export const CmdOrOption = () => {
  const isClient = useIsClient();
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

  if (!isClient) {
    return "⌘";
  }

  if (userAgent.includes("Mac OS X")) {
    return "⌘";
  }

  return "Ctrl";
};

"use client";
import { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
  display: boolean;
  close: () => void;
  xPosition?: "left" | "center" | "right";
  motionProps?: HTMLMotionProps<"div">;
}

export default function BaseModal({
  children,
  className,
  display,
  xPosition = "center",
  motionProps,
  close,
}: Props) {
  useEffect(() => {
    const html = document.querySelector("html");
    if (display && html !== null) {
      html.style.overflow = "hidden";
    }
    if (!display && html !== null) {
      html.style.removeProperty("overflow");
    }
  }, [display]);

  return (
    <AnimatePresence>
      {display && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className={classNames(
            "fixed left-0 top-0 z-30 flex h-screen w-screen items-center bg-black/30",
            { "justify-center": xPosition === "center" },
            { "justify-start": xPosition === "left" },
            { "justify-end": xPosition === "right" }
          )}
        >
          <motion.div
            {...(motionProps ?? {
              initial: {
                scale: 0,
              },
              animate: {
                scale: 1,
              },
              exit: {
                scale: 0,
                opacity: 0,
              },
            })}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={classNames("", className)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

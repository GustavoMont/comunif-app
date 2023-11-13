import { useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return {
    isOpen,
    close,
    open,
    toggle,
  };
};

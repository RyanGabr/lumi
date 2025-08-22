import { createContext, useContext, useState, type ReactNode } from "react";

interface CategoryPopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openPopover: () => void;
  closePopover: () => void;
}

const CategoryPopoverContext = createContext<CategoryPopoverContextType | undefined>(undefined);

export function CategoryPopoverProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  return (
    <CategoryPopoverContext.Provider value={{ isOpen, openPopover, closePopover, setIsOpen }}>
      {children}
    </CategoryPopoverContext.Provider>
  );
}

export function useCategoryPopover() {
  const context = useContext(CategoryPopoverContext);
  if (!context) throw new Error("useCategoryPopover must be used within CategoryPopoverProvider");
  return context;
}

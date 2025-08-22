import { createContext, useContext, useState, type ReactNode } from "react";

interface CategorySheetContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openSheet: () => void;
  closeSheet: () => void;
}

const CategorySheetContext = createContext<CategorySheetContextType | undefined>(undefined);

export function CategorySheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return (
    <CategorySheetContext.Provider value={{ isOpen, openSheet, closeSheet, setIsOpen }}>
      {children}
    </CategorySheetContext.Provider>
  );
}

export function useCategorySheet() {
  const context = useContext(CategorySheetContext);
  if (!context) throw new Error("useCategorySheet must be used within CategorySheetProvider");
  return context;
}

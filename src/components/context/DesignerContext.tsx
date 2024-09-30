"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FormElement, FormElementsInstance } from "../builder/FormElements";

type DesignerContextType = {
  elements: FormElementsInstance[];
  addElement: (index: number, element: FormElementsInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: FormElementsInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementsInstance | null>>;

  updateElement: (id: string, element: FormElementsInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementsInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementsInstance | null>(null);

  const addElement = (index: number, element: FormElementsInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);

      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementsInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

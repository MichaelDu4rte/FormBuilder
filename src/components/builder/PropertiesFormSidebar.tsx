import React from "react";
import useDesigner from "../hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "../ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "@radix-ui/react-select";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Propriedades do elemento</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
          className="hover:bg-gray-700 transition duration-200"
        >
          <AiOutlineClose className="text-lg text-red-400 hover:text-red-500" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;

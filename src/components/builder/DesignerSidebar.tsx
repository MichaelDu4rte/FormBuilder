import React from "react";
import { FormElements } from "./FormElements";

import useDesigner from "../hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="fixed left-0 top-15 w-[350px] h-full flex flex-col gap-4 p-6 bg-[hsl(var(--background))] overflow-y-auto rounded-tr-xl rounded-br-xl shadow-lg">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;

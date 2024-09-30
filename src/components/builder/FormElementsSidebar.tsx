import React from "react";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./buttons/SidebarBtnElement";

function FormElementsSidebar() {
  return (
    <div>
      <h3 className="text-xl text-[hsl(var(--foreground))] font-semibold mb-4">
        Elementos
      </h3>
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FormElementsSidebar;

import React from "react";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./buttons/SidebarBtnElement";
import { Separator } from "@radix-ui/react-select";

function FormElementsSidebar() {
  return (
    <div className="pb-20">
      <h3 className="text-sm text-[hsl(var(--foreground))] font-semibold mb-4">
        Elementos
      </h3>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Elementos de layout
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Elementos de formulário
        </p>

        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;

"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElements,
  FormElementsInstance,
  submitFunction,
} from "../builder/FormElements";
import { Label } from "../ui/label";

import { RiSeparator } from "react-icons/ri";

import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
  }),

  designerBtnComponent: {
    icon: RiSeparator,
    label: "Divisor",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  return <p>Esse elemento não possui propriedades para editar</p>;
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  return <Separator />;
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-muted-foreground">Divisor</Label>
      <Separator />
    </div>
  );
}

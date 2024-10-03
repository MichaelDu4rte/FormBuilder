import { TextFieldFormElements } from "../fields/TextFild";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementsInstance;

  designerBtnComponent: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;
};

export type FormElementsInstance = {
  id: string;
  type: ElementsType;
  extraAttibutes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElements,
};

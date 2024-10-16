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
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { IoCheckbox } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "CheckboxField";

const extraAttibutes = {
  label: "Campo de checkbox",
  required: false,
};

const propertiesSchemas = z.object({
  label: z.string().min(2).max(50),
  required: z.boolean().default(false),
});

export const CheckboxFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttibutes,
  }),

  designerBtnComponent: {
    icon: IoCheckbox,
    label: "Campo de checkbox",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementsInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttibutes.required) {
      return currentValue === "true";
    }

    return true;
  },
};

type CustomInstance = FormElementsInstance & {
  extraAttibutes: typeof extraAttibutes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchemas>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchemas),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttibutes.label,
      required: element.extraAttibutes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttibutes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttibutes: {
        label,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3 p-4 rounded-md bg-gray-900 border border-gray-800 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                Título
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-700 text-gray-200 border border-gray-600 rounded p-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition duration-150"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                O título será exibido acima do campo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-sm text-gray-200 font-medium">
                  Obrigatório
                </FormLabel>
                <FormDescription className="text-xs text-gray-400">
                  O campo deve ser obrigatório?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-primary text-primary focus:ring-primary focus:ring-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementsInstance;
  submitValue?: submitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  const { label, required, placeHolder, helperText } = element.extraAttibutes;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-center space-x-3">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);
          if (!submitValue) return;

          const stringValue = value ? "true" : "false";
          const valid = CheckboxFieldFormElements.validate(
            element,
            stringValue
          );

          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid grid-cols-1 gap-2 leading-tight">
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-gray-300 flex items-center",
            error && "border-red-500"
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      </div>
    </div>
  );
}
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttibutes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex items-center space-x-3">
      <Checkbox id={id} />
      <div className="grid grid-cols-1 gap-2 leading-tight">
        <Label
          htmlFor={id}
          className="text-sm font-medium text-gray-300 flex items-center"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      </div>
    </div>
  );
}

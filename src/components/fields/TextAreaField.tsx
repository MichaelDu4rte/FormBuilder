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
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

const type: ElementsType = "TextAreaField";

const extraAttibutes = {
  label: "Campo de Texto",
  helperText: "Texto de ajuda ou observação adicional",
  required: false,
  placeHolder: "Placeholder",
  rows: 3,
};

const propertiesSchemas = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export const TextAreaFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttibutes,
  }),

  designerBtnComponent: {
    icon: BsTextareaResize,
    label: "Campo de texto",
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
      return currentValue.length > 0;
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
      helperText: element.extraAttibutes.helperText,
      required: element.extraAttibutes.required,
      placeHolder: element.extraAttibutes.placeHolder,
      rows: element.extraAttibutes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttibutes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, rows } = values;
    updateElement(element.id, {
      ...element,
      extraAttibutes: {
        label,
        helperText,
        placeHolder,
        required,
        rows,
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
          name="placeHolder"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                Placeholder
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
                Texto que será exibido como dica dentro do campo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                Texto de Ajuda
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
                O texto de ajuda será exibido abaixo do campo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                Tamanho {form.watch("rows")}
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
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
  const [value, setValue] = useState(defaultValue || "");
  const { label, required, placeHolder, helperText, rows } =
    element.extraAttibutes;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-1.5 w-full overflow-auto">
      <Label
        className={cn(
          "text-sm font-medium text-gray-300 flex items-center",
          error && "text-red-500"
        )}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Textarea
        rows={rows}
        placeholder={placeHolder}
        className={cn(
          "bg-gray-800/50 text-gray-300 border border-gray-600 rounded-md p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150 ease-in-out",
          error && "border-red-500"
        )}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;

          const valid = TextAreaFieldFormElements.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p
          className={cn("text-xs text-gray-400 mt-1", error && "text-red-500")}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText, rows } =
    element.extraAttibutes;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-sm font-medium text-gray-300 flex items-center">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Textarea
        readOnly
        disabled
        placeholder={placeHolder}
        className="bg-gray-800/50 text-gray-300 border border-gray-600 rounded-md p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150 ease-in-out"
      />
      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  );
}

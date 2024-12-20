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
import { RxDropdownMenu } from "react-icons/rx";

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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const type: ElementsType = "SelectField";

const extraAttibutes = {
  label: "Campo de Seleção",
  helperText: "Texto de ajuda ou observação adicional",
  required: false,
  placeHolder: "Placeholder",
  options: [],
};

const propertiesSchemas = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttibutes,
  }),

  designerBtnComponent: {
    icon: RxDropdownMenu,
    label: "Campo de Seleção",
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
      options: element.extraAttibutes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttibutes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttibutes: {
        label,
        helperText,
        placeHolder,
        required,
        options,
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
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <div className="flex justify-between items-center">
                <FormLabel className="text-sm text-gray-200 font-medium">
                  Opções
                </FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("Nova opção"));
                  }}
                >
                  <AiOutlinePlus />
                  Adicionar
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>

              <FormDescription className="text-xs text-gray-400">
                Clique no botão "adicionar" para adicionar novas opções.
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
  const [value, setValue] = useState(defaultValue || "");
  const { label, required, placeHolder, helperText, options } =
    element.extraAttibutes;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label
        className={cn(
          "text-sm font-medium text-gray-300 flex items-center",
          error && "text-red-500"
        )}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Select onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-full text-gray-300">
          <span>{value || placeHolder}</span>
        </SelectTrigger>
        <SelectContent className="text-gray-400">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="text-gray-300">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
  const { label, required, placeHolder, helperText } = element.extraAttibutes;
  return (
    <div className="flex flex-col gap-1.5 w-full text-gray-300">
      <Label className="text-sm font-medium text-gray-300 flex items-center">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      <Select>
        <SelectTrigger className="w-full text-gray-300">
          <SelectValue placeholder={placeHolder} className="text-gray-300" />
        </SelectTrigger>
      </Select>
      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  );
}

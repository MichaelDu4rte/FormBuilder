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
import { Calendar } from "../ui/calendar";
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
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const type: ElementsType = "DateField";

const extraAttibutes = {
  label: "Campo de data",
  helperText: "Escolha uma data",
  required: false,
};

const propertiesSchemas = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

export const DateFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttibutes,
  }),

  designerBtnComponent: {
    icon: BsFillCalendarDateFill,
    label: "Campo de data",
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
    },
  });

  useEffect(() => {
    form.reset(element.extraAttibutes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttibutes: {
        label,
        helperText,
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
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const { label, required, helperText } = element.extraAttibutes;
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Selecione uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormElements.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
            initialFocus
            className="rounded-md"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
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
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-sm font-medium text-gray-300 flex items-center">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>Selecione uma data</span>
      </Button>
      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  );
}

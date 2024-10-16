"use client";

import { MdImage } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementsInstance,
} from "../builder/FormElements";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const type: ElementsType = "ImageField";

const extraAttibutes = {
  label: "Campo de imagem",
  imageUrl: "",
  altText: "Descrição da imagem",
};

const defaultImageUrl =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const propertiesSchemas = z.object({
  imageUrl: z
    .string()
    .url("Insira uma URL válida para a imagem")
    .nonempty("A URL da imagem é obrigatória"),
  altText: z
    .string()
    .max(200, "O texto alternativo deve ter no máximo 200 caracteres"),
});

export const ImageFieldFormElements: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttibutes,
  }),

  designerBtnComponent: {
    icon: MdImage,
    label: "Campo de Imagem",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementsInstance): boolean => {
    const element = formElement as CustomInstance;
    return element.extraAttibutes.imageUrl.length > 0;
  },
};

type CustomInstance = FormElementsInstance & {
  extraAttibutes: typeof extraAttibutes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm({
    resolver: zodResolver(propertiesSchemas),
    mode: "onBlur",
    defaultValues: {
      imageUrl: element.extraAttibutes.imageUrl,
      altText: element.extraAttibutes.altText,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttibutes);
  }, [element, form]);

  function applyChanges(values: any) {
    const { imageUrl, altText } = values;

    updateElement(element.id, {
      ...element,
      extraAttibutes: {
        ...element.extraAttibutes,
        imageUrl,
        altText,
      },
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileUrl = reader.result as string;
        form.setValue("imageUrl", fileUrl);
        applyChanges({ ...form.getValues() });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3 p-4 rounded-md bg-gray-900 border border-gray-800 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                URL da Imagem
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-700 text-gray-200 border border-gray-600 rounded p-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition duration-150"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
          <FormLabel className="text-sm text-gray-200 font-medium">
            Upload de Imagem
          </FormLabel>
          <FormControl>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer" // Esconde o input
              />
              <button
                type="button"
                className="bg-gray-700 text-gray-200 border border-gray-600 rounded p-1 text-sm  text-left"
              >
                Escolher arquivo
              </button>
            </div>
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="altText"
          render={({ field }) => (
            <FormItem className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-sm">
              <FormLabel className="text-sm text-gray-200 font-medium">
                Texto Alternativo
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-700 text-gray-200 border border-gray-600 rounded p-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition duration-150"
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
  defaultValue,
}: {
  elementInstance: FormElementsInstance;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { imageUrl, altText } = element.extraAttibutes;

  return (
    <div className="flex items-center justify-center w-full">
      <img
        src={imageUrl || defaultImageUrl}
        alt={altText}
        className="w-full h-[130px] object-cover rounded-md"
      />
    </div>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { imageUrl, altText } = element.extraAttibutes;

  return (
    <div className="flex items-center justify-center w-full">
      <img
        src={imageUrl || defaultImageUrl}
        alt={altText}
        className="w-full h-[130px] object-cover rounded-md"
      />
    </div>
  );
}

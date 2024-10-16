"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElements, FormElementsInstance } from "../builder/FormElements";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { boolean } from "zod";
import { toast } from "@/hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "../../../actions/form";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementsInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());

      toast({
        title: "Erro ao enviar!",
        description:
          "Por favor, revise os campos e corrija as informações inválidas.",
        variant: "destructive",
      });

      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);

      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Ops, algo deu errado!",
        description:
          "Houve um problema ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen  p-6">
        <div className="max-w-[650px] w-full p-12 bg-gradient-to-br from-[hsl(var(--popover))] to-[hsl(var(--card))] rounded-3xl shadow-xl border border-[hsl(var(--border))] transform transition-transform hover:scale-105 duration-300">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-[hsl(var(--primary))]">
              Formulário Enviado com Sucesso!
            </h2>
            <p className="text-[hsl(var(--foreground))] text-lg mb-8">
              Obrigado por preencher o formulário. Suas respostas foram enviadas
              e logo entraremos em contato com você.
            </p>
          </div>
          <div className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]">
            Este formulário foi criado com{" "}
            <a
              href="https://www.formbuilder.com"
              target="_blank"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              FormBuilder
            </a>
            .
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center py-8  bg-[hsl(var(--accent))] ">
      <div
        key={renderKey}
        className="max-w-[620px] w-full p-8 flex flex-col gap-6  bg-[hsl(var(--background))] text-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Preencha o Formulário</h2>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <div
              key={element.id}
              className="bg-[hsl(var(--muted))] p-4 rounded-lg shadow-md border border-[hsl(var(--border))] transition-transform duration-200 hover:shadow-lg"
            >
              <FormElement
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={formErrors.current[element.id]}
                defaultValue={formValues.current[element.id]}
              />
            </div>
          );
        })}
        <Button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center transition-all duration-200"
          onClick={() => {
            startTransition(submitForm);
            submitForm();
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Enviar
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;

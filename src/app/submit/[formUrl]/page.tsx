import React from "react";
import { GetFormContentByUrl } from "../../../../actions/form";
import { FormElementsInstance } from "@/components/builder/FormElements";
import FormSubmitComponent from "@/components/dashboard/FormSubmitComponent";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("Formulario não encontrado!");
  }

  const formContent = JSON.parse(form.content) as FormElementsInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;

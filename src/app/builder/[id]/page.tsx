import React from "react";
import { GetFormsById } from "../../../../actions/form";
import FormBuilder from "@/components/builder/FormBuilder";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormsById(Number(id));

  if (!form) {
    throw new Error("Formulario não encontrado!");
  }

  return <FormBuilder form={form}></FormBuilder>;
}

export default BuilderPage;

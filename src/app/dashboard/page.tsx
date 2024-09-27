import React from "react";
import { Navbar } from "@/components";
import CreateFormBtn from "@/components/dashboard/CreateFormBtn";
import { GetForms } from "../../../actions/form";

import FormCard from "@/components/dashboard/formCard";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <Navbar />
      </div>

      <section className="w-full px-6 py-10">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:textxl md:!leading-snug  mb-2 font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
            Painel de Formulários
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Gerencie e crie seus formulários personalizados para capturar os
            dados que precisa de maneira fácil e rápida.
          </p>
        </div>

        <section className="flex justify-center py-20 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CreateFormBtn />

            {/* Renderização dos cards */}
            <FormCards />
          </div>
        </section>
      </section>
    </>
  );
};

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.length > 0 ? (
        forms.map((form) => <FormCard key={form.id} form={form} />)
      ) : (
        <>
          <span className="text-center text-muted-foreground">
            Nenhum formulário disponível.
          </span>
          <div className="border border-dashed rounded-lg p-6 text-center flex items-center justify-center text-muted-foreground">
            <p>Crie um novo formulário para começar!</p>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;

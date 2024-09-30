"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => console.log(error), [error]);

  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center  text-white">
      <div className="max-w-lg text-center p-8 border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl mb-4">Algo deu errado no processo...</h2>
        <p className="text-gray-400 mb-8">
          Não se preocupe, estamos cientes do problema e trabalhando para
          resolvê-lo. Se precisar de ajuda imediata, você pode{" "}
          <a
            href="mailto:suporte@seudominio.com"
            className="underline text-blue-400 hover:text-blue-300"
          >
            entrar em contato
          </a>
          .
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white">
          <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;

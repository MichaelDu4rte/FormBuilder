"use client";
import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./buttons/PreviewDialogBtn";

import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import Icons from "../global/icons";
import Link from "next/link";
import SaveFormBtn from "./buttons/SaveFormBtn";
import PublishFormBtn from "./buttons/PublishFormBtn";
import useDesigner from "../hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { BsArrowLeft } from "react-icons/bs";
import { IoAnalytics } from "react-icons/io5";

import Confetti from "react-confetti";
import { motion } from "framer-motion";

function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements]);

  if (!isReady) {
    <div className="flex flex-col items-center justify-center w-full h-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>;
  }

  const shareUrlForm = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <motion.div
          className="flex justify-center items-center min-h-screen w-full p-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-[hsl(var(--card))] shadow-lg rounded-lg p-6 md:p-8 max-w-md md:max-w-xl w-full text-center border border-[hsl(var(--border))]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] mb-4">
              🎉 Formulário Publicado!
            </h1>
            <h2 className="text-xl md:text-2xl text-[hsl(var(--foreground))] mb-2">
              Compartilhe seu formulário com facilidade.
            </h2>
            <p className="text-base md:text-lg text-[hsl(var(--muted-foreground))] mb-6 md:mb-8">
              Qualquer pessoa com o link abaixo pode visualizar e enviar
              respostas.
            </p>
            <div className="flex flex-col items-center mb-4 md:mb-6">
              <Input
                className="w-full border border-[hsl(var(--border))] rounded-lg p-2 mb-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] text-sm md:text-base"
                readOnly
                value={shareUrlForm}
              />
              <Button
                className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary), 0.85)] transition-all rounded-lg py-2 text-sm md:text-base"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrlForm);
                  toast({
                    title: "Link copiado!",
                    description: "Compartilhe seu formulário!",
                  });
                }}
              >
                Copiar Link
              </Button>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 mt-4">
              <Button
                variant={"outline"}
                className="w-full md:w-auto flex justify-center items-center"
                asChild
              >
                <Link
                  href={"/"}
                  className="flex items-center gap-2 text-[hsl(var(--primary))]"
                >
                  <BsArrowLeft />
                  Voltar para Home
                </Link>
              </Button>
              <Button
                variant={"outline"}
                className="w-full md:w-auto flex justify-center items-center"
                asChild
              >
                <Link
                  href={`/forms/${form.id}`}
                  className="flex items-center gap-2 text-[hsl(var(--primary))]"
                >
                  <IoAnalytics />
                  Detalhes do Formulário
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <header className="px-4 h-16 sticky top-0 inset-x-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50 shadow-md">
          <div className="flex items-center justify-between h-full mx-auto max-w-screen-xl">
            <div className="flex items-center">
              <Link href={"/"} className="flex items-center gap-2">
                <Icons.logo className="w-8 h-8" aria-label="Logo AIRESUME" />
                <span className="text-lg font-semibold">
                  Form<span className="text-blue-500">Builder</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <PreviewDialogBtn />

              {!form.published && (
                <>
                  <SaveFormBtn id={form.id} />
                  <PublishFormBtn id={form.id} />
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-[hsl(var(--accent))] min-h-screen bg-cover bg-center ">
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;

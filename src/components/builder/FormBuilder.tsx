"use client";
import { Form } from "@prisma/client";
import React from "react";
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

function FormBuilder({ form }: { form: Form }) {
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
                  <SaveFormBtn />
                  <PublishFormBtn />
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-[hsl(var(--accent))] min-h-screen bg-cover bg-center bg-[url(/wiggle.svg)]">
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;

import React, { ReactNode } from "react";
import { GetFormsById, GetFormWithSubmissions } from "../../../../actions/form";
import FormBuilder from "@/components/builder/FormBuilder";
import VisitBtn from "@/components/dashboard/VisitBtn";
import FormLinkShare from "@/components/dashboard/FormLinkShare";
import Link from "next/link";
import PreviewDialogBtn from "@/components/builder/buttons/PreviewDialogBtn";
import { Icons } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  ElementsType,
  FormElementsInstance,
} from "@/components/builder/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

async function FormDetailsPage({
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

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissionRate / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
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
            <Link
              href="/dashboard"
              className={`${buttonVariants({ size: "sm" })} hidden md:flex`}
            >
              Dashboard
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="py-10 bg-[hsl(var(--background))] shadow-md ">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[hsl(var(--primary))] tracking-tight">
            {form.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <FormLinkShare shareUrlForm={form.shareURL} />
            <VisitBtn shareUrlForm={form.shareURL} />
          </div>
        </div>
      </div>

      <div className="py-10 container">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailsPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("Formulario não encontrado!");
  }

  const formElements = JSON.parse(form.content) as FormElementsInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttibutes?.label,
          required: element.extraAttibutes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmssions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div className="p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg border border-[hsl(var(--border))]">
      <h1 className="text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">
        Respostas
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className="uppercase text-[hsl(var(--muted-foreground))]"
              >
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right uppercase text-[hsl(var(--muted-foreground))]">
              Enviado em
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              className="transition-all duration-200 hover:bg-[hsl(var(--popover))]"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className="text-[hsl(var(--foreground))]"
                >
                  {row[column.id]}
                </TableCell>
              ))}
              <TableCell className="text-right text-[hsl(var(--muted-foreground))]">
                {formatDistance(row.submittedAt, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}

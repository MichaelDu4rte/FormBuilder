"use client";
import { Form } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LuView } from "react-icons/lu";
import { FaEdit, FaTimes, FaWpforms } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteForm } from "../../../actions/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { toast } from "@/hooks/use-toast";

function FormCard({ form }: { form: Form }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await DeleteForm(form.id);
      router.refresh();
      toast({
        title: "Formulário excluido",
        description: "O formulário foi excluído com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir formulário",
        description: "Algo deu errado, tente novamente!",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 h-auto sm:h-[190px] flex flex-col">
      <CardHeader className="bg-gray-100 border-b border-dashed border-secondary rounded-t-lg pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 truncate">
            {form.name}
          </CardTitle>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Badge
              className={`px-2 py-1 rounded ${
                form.published
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {form.published ? "Publicado" : "Rascunho"}
            </Badge>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <FaTimes className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-lg shadow-2xl border border-secondary">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-semibold">
                    Confirmar Exclusão
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-500">
                    Você tem certeza de que deseja excluir este formulário? Esta
                    ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="outline"
                      className="text-gray-500 border-gray-300"
                    >
                      Cancelar
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-200"
                      onClick={() => {
                        handleDelete();
                        setOpen(false);
                      }}
                    >
                      Excluir
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <CardDescription className="text-sm text-gray-600 flex-grow mb-1">
          {form.description ? (
            form.description
          ) : (
            <span className="flex items-center justify-center text-gray-400">
              Nenhuma descrição fornecida para este formulário.
            </span>
          )}
        </CardDescription>
        <div className="flex gap-4 text-xs text-gray-500">
          {form.published && (
            <span className="flex items-center gap-1">
              <LuView className="text-primary h-4 w-4" />
              <span>{form.visits ? form.visits.toLocaleString() : "0"}</span>
            </span>
          )}
          {form.published && (
            <span className="flex items-center gap-1">
              <FaWpforms className="text-primary h-4 w-4" />
              <span>
                {form.submissions ? form.submissions.toLocaleString() : "0"}
              </span>
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-2 pt-0">
        <Link
          href={form.published ? `/forms/${form.id}` : `/builder/${form.id}`}
        >
          <Button variant="secondary" className="flex items-center gap-2">
            {form.published ? "Visualizar" : "Editar"}
            {form.published ? (
              <BiRightArrowAlt className="h-5 w-5" />
            ) : (
              <FaEdit className="h-5 w-5" />
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default FormCard;

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { FaIcons } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import { PublishForm } from "../../../../actions/form";
import { useRouter } from "next/navigation";

function PublishFormBtn({ id, disabled }: { id: number; disabled: boolean }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Formulário Publicado com Sucesso!",
        description:
          "Seu formulário agora está disponível para compartilhamento e envio de respostas.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Erro ao Publicar",
        description: "Algo deu errado, tente novamente!",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className={`relative overflow-hidden gap-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 border-0 shadow-xl rounded-lg px-5 py-2.5 hover:from-indigo-500 hover:to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out ${
            disabled || loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled || loading}
        >
          <MdOutlinePublish className="h-5 w-5" />
          Publicar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg shadow-2xl border border-secondary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-semibold">
            Publicar Conteúdo
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            Tem certeza de que deseja publicar este conteúdo? Após a publicação,
            ele ficará disponível publicamente.
            <strong>
              {" "}
              Não se esqueça de salvar seu formulário antes de prosseguir
            </strong>
            , caso contrário, as alterações não serão aplicadas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="text-gray-500 border-gray-300 "
            >
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            <Button className="text-white  gap-2 transition-all duration-200">
              Continuar {loading && <FaIcons className="animate-spin" />}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;

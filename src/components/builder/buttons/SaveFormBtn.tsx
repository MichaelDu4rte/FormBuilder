import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import { UpdateFormContent } from "../../../../actions/form";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({
  id,
  onFormSaved,
}: {
  id: number;
  onFormSaved: () => void;
}) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Conteúdo Atualizado com Sucesso!",
        description: "Seu formulário foi salvo e está pronto para uso.",
      });
      onFormSaved();
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description:
          "Ocorreu um problema ao tentar salvar seu formulário. Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-6 w-6" />
      Salvar
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;

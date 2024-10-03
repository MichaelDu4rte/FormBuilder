import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import { UpdateFormContent } from "../../../../actions/form";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Success",
        description: "Seu formulario foi salvo!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo deu errado, tente novamente!",
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

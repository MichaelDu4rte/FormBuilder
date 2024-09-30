import { Button } from "@/components/ui/button";
import React from "react";
import { HiSaveAs } from "react-icons/hi";

function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-6 w-6" />
      Salvar
    </Button>
  );
}

export default SaveFormBtn;

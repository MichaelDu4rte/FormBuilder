"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareUrlForm }: { shareUrlForm: string }) {
  const [mounted, setMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareUrlForm}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!setMounted) {
    return null;
  }

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link copiado!",
            description: "Compartilhe seu formulário!",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Compartilhar Link
      </Button>
    </div>
  );
}

export default FormLinkShare;

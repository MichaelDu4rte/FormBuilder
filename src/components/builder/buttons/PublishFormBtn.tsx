import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlinePublish } from "react-icons/md";

function PublishFormBtn() {
  return (
    <Button
      variant={"outline"}
      className="relative overflow-hidden gap-2 text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] border-0 shadow-lg rounded-lg px-4 py-2 transition-all duration-300 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] hover:shadow-xl"
    >
      <span className="relative z-10 flex items-center gap-2">
        <MdOutlinePublish className="h-5 w-5" />
        Publicar
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsla(var(--primary),0.2)] to-transparent opacity-0 transition-opacity duration-300  pointer-events-none"></div>
    </Button>
  );
}

export default PublishFormBtn;

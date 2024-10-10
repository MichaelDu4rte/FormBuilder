import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import React from "react";
import { MdPreview } from "react-icons/md";
import { FormElements } from "../FormElements";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed flex border-muted items-center justify-center p-4 bg-opacity-50 ">
        <div className="w-[95vw] max-w-[1200px] bg-background rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-muted">
            <p className="text-2xl font-bold ">Preview</p>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize como seu formulário se apresentará!
            </p>
          </div>
          <div className="flex flex-col flex-grow pt-5 mim-w-screen">
            <div className="flex flex-col gap-4 bg-accent rounded-xl p-6 ">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;

                return (
                  <FormComponent key={element.id} elementInstance={element} />
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;

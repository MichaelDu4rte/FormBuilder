"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { formSchema, formSchemaType } from "../../../schemas/form";
import { CreateForm } from "../../../actions/form";
import { useRouter } from "next/navigation";

function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Formulário criado",
        description: `O formulário foi criado com sucesso!`,
      });
      form.reset();
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado... Tente novamente!",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 transition-all duration-300 ease-in-out"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out">
            Criar Formulário
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto p-6 bg-background border border-secondary shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl font-bold mb-2">
            Novo Formulário
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Crie um novo formulário para capturar dados e melhorar sua coleta de
            informações.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Formulário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Feedback do Produto"
                      value={field.value}
                      onChange={field.onChange}
                      className="focus:ring-secondary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Descreva o propósito do formulário..."
                      value={field.value}
                      onChange={field.onChange}
                      className="focus:ring-secondary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex justify-end items-center mt-6 space-x-4">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full md:w-auto"
          >
            {!form.formState.isSubmitting ? (
              <span>Criar Formulário</span>
            ) : (
              <ImSpinner2 className="animate-spin h-5 w-5 mx-auto" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;

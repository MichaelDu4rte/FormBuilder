import { Form } from '@prisma/client';
'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { stat } from "fs";
import { formSchema, formSchemaType } from "../schemas/form";

class UserNotFoundError extends Error{}

export async function getFormStats() {
    const user = await currentUser();

    if (!user) {
        throw new UserNotFoundError();  
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    });

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate
    };
}


export async function CreateForm(data : formSchemaType) {

    const validation = formSchema.safeParse(data);

    if(!validation.success) {
        throw new Error("Informações invalidas!");
    }

    const user = await currentUser();

    if (!user) throw new UserNotFoundError();


    const {name, description} = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })

    if(!form ) {
        throw new Error("Algo deu errado...");
    }

    return form.id;

}

export async function GetForms() {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    return await prisma.form.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        }
    })
}

export async function DeleteForm(id: number) {
    const user = await currentUser();
  
    if (!user) throw new UserNotFoundError();
  
    return await prisma.form.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  }

export async function GetFormsById(id: number) {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })
}

export async function UpdateFormContent(id:number, jsonContent: string) {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent,
        }
    })
}

export async function PublishForm(id:number) {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            published: true,
        },
    })
}

export async function GetFormContentByUrl(formUrl: string) {
    const form = await prisma.form.findUnique({
      where: { shareURL: formUrl },
    });
  
    if (!form) {
      throw new Error("Formulário não encontrado!");
    }
  
    return await prisma.form.update({
      select: { content: true },
      data: {
        visits: {
          increment: 1,
        },
      },
      where: {
        shareURL: formUrl,
      },
    });
  }


export async function SubmitForm(formUrl: string, content : string) {
        return await prisma.form.update({
            data: {
                submissions: {
                    increment: 1
                },
                FormSubmssions: {
                    create: {
                        content
                    }
                }
            },
            where:{
                shareURL: formUrl,
                published: true
            },
        })
}

export async function  GetFormWithSubmissions(id: number) {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id,
        },
        include: {
            FormSubmssions: true
        },
    })
}
  
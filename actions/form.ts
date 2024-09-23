'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { stat } from "fs";

class UserNotFoundError extends Error{}

export async function getFormStats() {
    const user = await currentUser();

    if(!user) {
        throw new UserNotFoundError;
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissionRate / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits, submissions, submissionRate, bounceRate
    }
}
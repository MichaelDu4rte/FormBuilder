"use client";

import Link from "next/link";
import React from "react";
import Icons from "./icons";
import { buttonVariants } from "../ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="px-4 h-16 sticky top-0 inset-x-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50 shadow-md">
      <div className="flex items-center justify-between h-full mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Icons.logo className="w-8 h-8" aria-label="Logo AIRESUME" />
            <span className="text-lg font-semibold">
              <span className="text-blue-500">IA</span>RESUME
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center gap-8">
            <li className="transition-transform duration-300 hover:scale-105">
              <Link
                href={"#home"}
                className="text-sm font-medium hover:text-foreground/80"
              >
                Home
              </Link>
            </li>
            <li className="transition-transform duration-300 hover:scale-105">
              <Link
                href={"#depoimentos"}
                className="text-sm font-medium hover:text-foreground/80"
              >
                Depoimentos
              </Link>
            </li>
            <li className="transition-transform duration-300 hover:scale-105">
              <Link
                href={"#planos"}
                className="text-sm font-medium hover:text-foreground/80"
              >
                Preço
              </Link>
            </li>
            <li className="transition-transform duration-300 hover:scale-105">
              <Link
                href={"#contato"}
                className="text-sm font-medium hover:text-foreground/80"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className={`${buttonVariants({ size: "sm" })} hidden md:flex`}
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={`${buttonVariants({ size: "sm" })} hidden md:flex`}
              >
                Avaliação Gratuita
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

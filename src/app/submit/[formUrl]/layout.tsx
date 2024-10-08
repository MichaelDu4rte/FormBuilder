import React, { ReactNode } from "react";
import { Navbar } from "@/components";
import SubmitPage from "./page";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="w-full  h-screen">{children}</section>
    </>
  );
}

export default Layout;

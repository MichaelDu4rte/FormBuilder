"use client";

import React, { ReactNode, Suspense } from "react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { Navbar } from "@/components";

const Dashboard = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <Navbar />
      </div>
    </>
  );
};

export default Dashboard;

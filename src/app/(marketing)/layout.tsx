import { Navbar } from "@/components";
import Footer from "@/components/home/footer/footer";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default MarketingLayout;

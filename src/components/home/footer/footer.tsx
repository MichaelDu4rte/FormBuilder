import Icons from "@/components/global/icons";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 relative">
      {/* Background Blur Circles */}
      <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
      <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>

      {/* Logo and Introduction */}
      <div className="text-center mb-8">
        <Icons.logo className="w-10 h-10 mx-auto" />
        <p className="text-muted-foreground mt-4 text-sm">
          Oportunidades começam com um currículo inteligente.{" "}
        </p>
        <span className="mt-4 text-neutral-200 text-sm flex justify-center items-center">
          <Link
            href="https://www.linkedin.com/in/michaeldu4rte/"
            target="_blank"
          >
            By: Michael Duarte
          </Link>
        </span>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border/40 pt-4 w-full text-center mt-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} IaResume. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IaResume | CV Inteligente",
  description:
    "Crie currículos impressionantes com a ajuda da inteligência artificial. O IaResume transforma seu histórico profissional em um currículo atraente e personalizado, aumentando suas chances de conquistar o emprego dos seus sonhos. Simples, rápido e eficaz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
            font.className
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-sky-500 ">
      <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md ", font.className)}>🔐 Auth</h1>
      <p className="text-lg text-white"
      >A simple authentication service</p>
      <div>
        <LoginButton>

          <Button className="" size={"lg"} variant={"secondary"}  >Sign In</Button>

        </LoginButton>

      </div>
    </main >
  );
}

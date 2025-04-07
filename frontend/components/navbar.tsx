import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-background/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Smriti AI</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* Theme switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full hover:bg-blue-500/10"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Buttons */}
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="rounded-full text-blue-500 dark:text-white"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hover:opacity-90 transition-opacity">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

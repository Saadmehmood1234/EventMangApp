"use client"
import { Button } from "./ui/button";
import { SunIcon,MoonIcon } from "@radix-ui/react-icons"; '@radix-ui/react-icons';
import { useTheme } from "next-themes";
const ThemeToggler = () => {
    const {theme,setTheme}=useTheme();

  return (
    <div>
        <Button className="rounded-full max-sm:w-[2.1rem] max-sm:h-[2.1rem] w-[2.6rem] h-[2.6rem] dark:bg-gray-100 dark:text-gray-900 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200 bg-gray-900" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
            <SunIcon className="h-[1.2rem] w-[1.2rem]  rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"/>
            <MoonIcon className="absolute  h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        </Button>
    </div>
  )
}

export default ThemeToggler
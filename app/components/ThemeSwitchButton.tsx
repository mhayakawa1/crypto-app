"use client";
import * as React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Moon from "../../src/icons/Moon.svg";
import Sun from "../../src/icons/Sun.svg";

export function ThemeSwitchButton() {
  const { setTheme } = useTheme();
  const [darkActive, setDarkActive] = useState(localStorage.getItem('theme') === 'dark' || false);

  const toggleTheme = () => {
    setDarkActive((current) => !current);
    const theme = darkActive ? "light" : "dark";
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="flex justify-center items-center w-[48px] h-[48px] rounded-[12px] bg-[--lavender] dark:border dark:border-[#242430] dark:bg-[#191925]"
    >
      <Image alt="" src={darkActive ? Sun : Moon} />
    </Button>
  );
}

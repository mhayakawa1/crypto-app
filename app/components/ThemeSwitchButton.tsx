"use client";
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleTheme } from "@/lib/features/theme/themeSlice";
import Image from "next/image";
import Moon from "../../src/icons/Moon.svg";
import Sun from "../../src/icons/Sun.svg";

export function ThemeSwitchButton() {
  const { setTheme } = useTheme();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const theme = useAppSelector((state) => state.theme);
  const darkActive = theme[0].darkActive;
  const dispatch = useAppDispatch();

  const switchTheme = useCallback(() => {
    const newTheme = darkActive ? "light" : "dark";
    localStorage.setItem("savedTheme", newTheme);
    setTheme(newTheme);
    dispatch(toggleTheme({ darkActive: !darkActive }));
  }, [darkActive, dispatch, setTheme]);

  useEffect(() => {
    if (isFirstRender) {
      const storageItem = localStorage.getItem("savedTheme");
      if (storageItem === "dark") {
        switchTheme();
      }
      setIsFirstRender(false);
    }
  }, [switchTheme, isFirstRender]);

  return (
    <Button
      onClick={switchTheme}
      variant="outline"
      size="icon"
      className="flex justify-center items-center w-[48px] max-md:w-[36px] lg:2xl:w-[96px] h-auto aspect-square rounded-[6px] lg:2xl:rounded-[12px] border-none dark:border dark:border-[--dark-gunmetal] bg-[--lavender] dark:bg-[--mirage]"
    >
      <Image alt="" src={darkActive ? Sun : Moon} className="max-md:h-[18px] lg:2xl:h-[48px] w-auto"/>
    </Button>
  );
}

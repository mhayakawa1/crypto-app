"use client";
import * as React from "react";
import { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleTheme } from "@/lib/features/theme/themeSlice";
import Image from "next/image";
import Moon from "../../src/icons/Moon.svg";
import Sun from "../../src/icons/Sun.svg";

export function ThemeSwitchButton() {
  const { setTheme } = useTheme();
  const theme = useAppSelector((state) => state.theme);
  const darkActive = theme[0].darkActive;
  const dispatch = useAppDispatch();

  const switchTheme = useCallback(
    () => {
      const newTheme = darkActive ? "light" : "dark";
      localStorage.setItem("savedTheme", newTheme);
      setTheme(newTheme);
      dispatch(toggleTheme({ darkActive: !darkActive }));
    },
    [darkActive, dispatch, setTheme]
  );

  useEffect(() => {
    const storageItem = localStorage.getItem("savedTheme");
    if (storageItem === "dark") {
      switchTheme();
    }
  }, [switchTheme]);

  return (
    <Button
      onClick={switchTheme}
      variant="outline"
      size="icon"
      className="flex justify-center items-center w-[48px] h-[48px] rounded-[12px] bg-[--lavender] dark:border dark:border-[#242430] dark:bg-[#191925]"
    >
      <Image alt="" src={darkActive ? Sun : Moon} />
    </Button>
  );
}

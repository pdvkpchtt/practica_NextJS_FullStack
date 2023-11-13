"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import TextMain from "../../shared/Text/TextMain ";
import SettingsBody from "./SettingsBody";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import MoonIcon from "../../shared/icons/MoonIcon";
import SunIcon from "../../shared/icons/SunIcon";
import EyeIcon from "../../shared/icons/EyeIcon";

import settingsbg from "../../assets/settingsbg.png";

const Settings = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(theme);

  return (
    <>
      <div className="max-w-[260px] w-full h-full  bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] p-[20px] rounded-l-[20px] [@media(pointer:coarse)]:hidden">
        <div
          className="[@media(hover)]:min-h-[305px] bg-cover"
          style={{ backgroundImage: `url(${settingsbg.src})` }}
        />
      </div>

      <div className="max-w-[720px] w-full bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] rounded-r-[20px] flex flex-col [@media(pointer:coarse)]:bg-transparent">
        {/* header pc */}
        <div className="border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] p-[12px] flex flex-row justify-between [@media(pointer:coarse)]:hidden">
          <div
            className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </div>

          <TextMain
            text="Настройка"
            style="font-medium text-[22px] leading-[26.4px] tracking-[-0.027em]"
          />

          <div className="flex flex-row gap-[8px] items-center">
            <div
              onClick={() => {
                setTheme(theme == "system" ? "light" : "system");
              }}
              className={`
                px-[12px] py-[10px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none
                font-medium text-[14px] leading-[16px] tracking-[-0.015em]
                ${
                  theme !== "system"
                    ? "bg-[#8295DE] hover:bg-[#5875E8] active:bg-[#3A56C5]"
                    : "bg-[#74899B] bg-opacity-[8%]"
                }
                ${
                  theme !== "system"
                    ? "text-white"
                    : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
                } 
              `}
            >
              Авто
            </div>

            <div
              className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            >
              {theme == "light" && <MoonIcon />}
              {theme == "dark" && <SunIcon />}
              {theme == "system" && <EyeIcon />}
            </div>
          </div>
        </div>
        {/* header pc */}

        {/* header mobile */}
        <div className="fixed px-[16px] top-0 left-0 w-full bg-white dark:bg-[#212122] z-10 border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] py-[10px] [@media(hover)]:hidden">
          <div className="max-w-[476px] w-full mx-auto flex flex-row justify-between">
            <div
              className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
              onClick={() => router.back()}
            >
              <ArrowLeftIcon />
            </div>

            <div className="flex flex-row gap-[8px] items-center">
              <div
                onClick={() => setTheme(theme == "system" ? "light" : "system")}
                className={`
                px-[12px] py-[10px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none
                font-medium text-[14px] leading-[16px] tracking-[-0.015em] 
                ${
                  theme == "system"
                    ? "bg-[#8295DE] hover:bg-[#5875E8]"
                    : "bg-[#74899B] bg-opacity-[8%]"
                }
                ${
                  theme == "system"
                    ? "text-white"
                    : "text-[#5875e8] hover:text-[#3A56C5]"
                }
              `}
              >
                Авто
              </div>

              <div
                className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
                onClick={() => setTheme(theme == "light" ? "dark" : "light")}
              >
                {theme == "light" && <MoonIcon />}
                {theme == "dark" && <SunIcon />}
                {theme == "system" && <EyeIcon />}
              </div>
            </div>
          </div>
        </div>
        {/* header mobile */}

        {/* body */}
        <div className="flex  [@media(pointer:coarse)]:p-[12px]  flex-col [@media(pointer:coarse)]:dark:bg-[#141414] justify-between h-full p-[12px] [@media(pointer:coarse)]:mt-[19px]">
          <SettingsBody />
        </div>
        {/* body */}
      </div>
    </>
  );
};

export default Settings;

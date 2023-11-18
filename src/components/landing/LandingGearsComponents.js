"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EnterIcon from "shared/icons/EnterIcon";

import BgTextSvg from "../../shared/icons/landing/BgText.svg";
import Gear from "./Gear";
import LandingButton from "./LandingButton";

const scrollPoint = 50;

const LandingGearsComponents = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Gear
        scrollPoint={0}
        scrollPosition={1}
        style={"absolute top-[3vh] right-[0vw] w-fit h-fit"}
      />
      <Gear
        scrollPoint={scrollPoint}
        scrollPosition={scrollPosition}
        style={"absolute top-[30vh] right-[8.5vw] w-fit h-fit"}
        points={[-60, -420]}
      />
      <Gear
        scrollPoint={scrollPoint * 2}
        scrollPosition={scrollPosition}
        style={"absolute top-[49vh] right-[21vw] w-fit h-fit"}
        points={[30, 390]}
      />
      <Gear
        scrollPoint={scrollPoint * 3}
        scrollPosition={scrollPosition}
        style={"absolute top-[71vh] right-[33vw] w-fit h-fit"}
        points={[200, -160]}
      />

      <div className="cursor-pointer absolute bottom-[4vh] right-[4vw] [@media(hover)]:w-[118px] text-[16px] font-medium px-[16px] py-[12px] leading-[19px] tracking-[-0.24px] text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] bg-[#647F98] bg-opacity-[15%] flex flex-row gap-[8px] items-center justify-center group rounded-[16px]">
        <EnterIcon />
        Войти
      </div>

      <LandingButton style="absolute left-[46vw] top-[84vh] " /> */}
    </>
  );
};

export default LandingGearsComponents;

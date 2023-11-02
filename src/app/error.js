"use client";

import TextCaption from "../shared/Text/TextCaption";
import { ButtonPrimary } from "../shared/ui/Button";

import f0f from "../assets/505.png";

const E505Page = ({ error, reset }) => {
  return (
    <>
      <div className="z-[202] flex flex-col mt-[25vh] w-full mx-[12px]">
        <p className="text-[#5875e8] [@media(pointer:coarse)]:hidden font-bold select-none text-[48px] leading-[58px] tracking-[-0.075em] [@media(pointer:coarse)]:text-[40px] [@media(pointer:coarse)]:leading-[48px] [@media(pointer:coarse)]:tracking-[-0.0625em]">
          practica
        </p>

        <TextCaption
          text="Ошибка 505."
          style="font-normal [@media(pointer:coarse)]:text-[#5875e8] mt-[5px] text-[24px] leading-[29px] tracking-[-0.0345em] [@media(pointer:coarse)]:text-[22px] [@media(pointer:coarse)]:leading-[26px] [@media(pointer:coarse)]:mt-0 [@media(pointer:coarse)]:tracking-[-0.031625em]"
        />

        <TextCaption
          text="Произошла непредвиденная ошибка."
          style="font-normal mt-[5px] text-[24px] leading-[29px] tracking-[-0.0345em] [@media(pointer:coarse)]:text-[16px] [@media(pointer:coarse)]:leading-[19px] [@media(pointer:coarse)]:tracking-[-0.023em] [@media(pointer:coarse)]:mt-[12px]"
        />

        <ButtonPrimary
          text="Обратно"
          style="w-[133px] mt-[20px]"
          onClick={() => reset()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.54183 5.625L3.9585 10L8.54183 14.375"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0415 10H4.1665"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonPrimary>
      </div>

      <div className="z-[200] bg-[#F6F6F8] dark:bg-[#141414] top-0 left-0 fixed w-[1000vh] h-[100vh]" />

      <div
        style={{ backgroundImage: `url(${f0f.src})` }}
        className="bg-cover z-[201] fixed top-0 right-0 h-full [@media(pointer:coarse)]:hidden w-[696px]"
      />
    </>
  );
};

export default E505Page;

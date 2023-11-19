"use client";

import TextCaption from "../../shared/Text/TextCaption";
import { ButtonPrimary } from "../../shared/ui/Button";
import TextSecondary from "../../shared/Text/TextSecondary";

import f0f from "../../assets/505.png";

const E505Page = ({ error, reset }) => {
  return (
    <>
      <div className="z-[202] flex flex-col justify-center h-full w-full [@media(pointer:coarse)]:p-[24px] mx-[12px]">
        <p className="font-medium text-[#2c2c2c] dark:text-[#fff] [@media(pointer:coarse)]:w-[224px] text-[24px] leading-[29px] tracking-[-0.552px] [@media(pointer:coarse)]:mb-[44px]  [@media(pointer:coarse)]:font-normal [@media(pointer:coarse)]:text-[16px] [@media(pointer:coarse)]:leading-[19px] [@media(pointer:coarse)]:mt-0 [@media(pointer:coarse)]:tracking-[-0.368px]">
          Произошла непредвиденная ошибка :{"("}
        </p>

        <ButtonPrimary
          text="Обратно"
          style="w-[133px] mt-[20px] [@media(pointer:coarse)]:absolute [@media(pointer:coarse)]:bottom-[24px] [@media(pointer:coarse)]:left-[calc(50%-66.5px)] rounded-[16px] [@media(pointer:coarse)]:rounded-[16px]"
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

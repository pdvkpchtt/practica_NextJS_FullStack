"use client";

import TextCaption from "../shared/Text/TextCaption";
import { ButtonPrimary } from "../shared/ui/Button";

import f0f from "../assets/505.png";

const E505Page = ({ error, reset }) => {
  return (
    <>
      <div className="z-[202] flex flex-col justify-center h-[100vh] w-full [@media(pointer:coarse)]:p-[24px] mx-[12px]">
        <p className="font-medium text-[#2c2c2c] dark:text-[#fff] [@media(pointer:coarse)]:w-[224px] text-[24px] leading-[29px] tracking-[-0.552px] [@media(pointer:coarse)]:mb-[44px]  [@media(pointer:coarse)]:font-normal [@media(pointer:coarse)]:text-[16px] [@media(pointer:coarse)]:leading-[19px] [@media(pointer:coarse)]:mt-0 [@media(pointer:coarse)]:tracking-[-0.368px]">
          Произошла непредвиденная ошибка :{"("}
        </p>

        <ButtonPrimary
          text="Обновить страничку"
          style="w-[226px] mt-[20px] [@media(pointer:coarse)]:absolute [@media(pointer:coarse)]:bottom-[24px] [@media(pointer:coarse)]:left-[calc(50%-113px)] rounded-[16px] [@media(pointer:coarse)]:rounded-[16px]"
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
              d="M8.33341 13.334H4.16675V17.5007"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.1816 12.4961C15.7144 13.6526 14.9321 14.6548 13.9236 15.3889C12.9151 16.1229 11.721 16.5593 10.4768 16.6485C9.2327 16.7376 7.98851 16.4759 6.88568 15.8932C5.78286 15.3104 4.86564 14.43 4.23828 13.3519"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.6667 6.66667H15.8334V2.5"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.81836 7.50341C4.28559 6.3469 5.0679 5.34466 6.07637 4.61062C7.08484 3.87659 8.27901 3.44019 9.52314 3.35104C10.7673 3.26189 12.0115 3.52356 13.1143 4.1063C14.2171 4.68905 15.1343 5.5695 15.7617 6.64757"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
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

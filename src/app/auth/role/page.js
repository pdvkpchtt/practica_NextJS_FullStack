"use client";

import { useRouter } from "next/navigation";

import { RoleButton } from "../../../shared/ui/Button";
import authbg from "../../../assets/authbg.png";

import { finishRegistration } from "../../../server/actions/finishRegistration";

const RolePage = async () => {
  const router = useRouter();

  return (
    <>
      <div className="[@media(hover)]:hidden fixed top-[5px] left-0 font-bold text-[32px] leading-[38.4px] tracking-[-0.025em] text-[#5875e8] w-full flex justify-center">
        practica
      </div>

      <div className="flex flex-col [@media(hover)]:fixed top-0 items-center justify-center gap-[16px] z-10 h-full [@media(pointer:coarse)]:px-[12px] [@media(pointer:coarse)]:my-auto w-full [@media(hover)]:max-w-[503px]">
        <RoleButton
          text="Я специалист"
          subtext="Хочу достойный оффер в крутой компании"
          onClick={async () => {
            await finishRegistration("student");
            router.push("/feed");
          }}
        />
        <RoleButton
          text="Мы компания"
          subtext="Хотим стоящего специалиста в команду"
          onClick={async () => {
            await finishRegistration("company");
            router.push("/feed");
          }}
        />
      </div>

      <div
        style={{ backgroundImage: `url(${authbg.src})` }}
        className="bg-cover fixed top-0 right-0 h-full z-0 [@media(pointer:coarse)]:hidden w-[356px] rounded-l-[30px]"
      />
    </>
  );
};

export default RolePage;

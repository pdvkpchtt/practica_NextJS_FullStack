"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import VkIcon from "../../shared/icons/VkIcon";
import { ButtonPrimary } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import TextSecondary from "../../shared/Text/TextSecondary";

const AuthForm = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  return (
    <Card
      style="[@media(hover)]:max-w-[390px] w-full flex flex-col"
      rounded={20}
      padding={10}
    >
      <TextSecondary
        text={"Почта"}
        style="font-medium ml-[4px] text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
      />

      <form
        action={(e) => {
          if (e.get("email")?.toString()?.length > 0) {
            signIn("email", {
              redirect: false,
              callbackUrl: "/",
              email: e.get("email")?.toString(),
            });
            router.push("/auth/verify?email=" + e.get("email")?.toString());
          } else setError(true);
        }}
      >
        <input
          name={"email"}
          placeholder={"practica@practica.com"}
          autoComplete
          className="px-[12px] w-full h-[42px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
          style={{
            borderRadius: 16,
          }}
          type={"email"}
          onChange={() => setError(false)}
        />
        {error && (
          <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
            Введите email
          </p>
        )}
        <ButtonPrimary
          type="submit"
          text="Отправить ссылку"
          style="mt-[10px] w-full"
        />
      </form>

      {/* <TextSecondary
        text={"Войти с помощью"}
        style="font-medium ml-[13px] text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mt-[21px]"
      />

      <div
        className="cursor-pointer hover:opacity-[80%] active:opacity-[70%] transition duration-[250ms] mt-[10px] ml-[13px] w-fit"
        onClick={() => {
          // signIn("vk", { callbackUrl });
        }}
      >
        <VkIcon />
      </div> */}
    </Card>
  );
};

export default AuthForm;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import TextMain from "../../../shared/Text/TextMain ";
import { ButtonPrimary } from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

const VerifyPage = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const router = useRouter();
  const [code, setCode] = useState("");
  return (
    <>
      <div className="[@media(hover)]:hidden fixed top-[5px] left-0 font-bold text-[32px] leading-[38.4px] tracking-[-0.025em] text-[#5875e8] w-full flex justify-center">
        practica
      </div>

      <div className="h-[100vh] flex flex-row items-center justify-between w-full">
        <div className="flex flex-col gap-[10px]">
          <div className="font-medium text-[32px] leading-[37.12px] tracking-[-1.44px] text-[#2c2c2c] dark:text-white w-full">
            отправили ключ к успеху на
            <div className="font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#5875e8]">
              {email}
            </div>
          </div>

          <div className="font-normal text-[21px] leading-[22.05px] tracking-[-0.945px] text-[#8f8f8f] [@media(hover)]:max-w-[449px] w-full">
            Проверьте спам, ссылка может быть там
          </div>
        </div>

        <Card
          style="[@media(hover)]:max-w-[390px] w-full flex flex-col"
          rounded={20}
          padding={10}
        >
          <TextMain
            text="подтвердите адрес электронной почты"
            style={
              "mb-[24px] text-[21px] font-medium leading-[24.36px] tracking-[-0.84px]"
            }
          />
          <input
            placeholder={"Введите ключ к успеху"}
            className="px-[12px] w-full h-[44px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
            style={{
              borderRadius: 16,
            }}
            onChange={(e) => setCode(e.target.value)}
          />
          <ButtonPrimary
            type="submit"
            text="Найти успешный успех"
            style="mt-[24px] w-full"
            onClick={() => {
              window.location.href = `/api/auth/callback/email?email=${encodeURIComponent(
                email
              )}&token=${code}`;
            }}
          />
          <div
            onClick={() => router.push("/auth")}
            className="dark:bg-[#8f8f8f] bg-[#acacac] w-full mt-[10px] text-[#fff] text-[16px] leading-[19px] select-none font-medium tracking-[-0.24px] flex items-center justify-center p-[12px] rounded-[16px] cursor-pointer"
          >
            Назад
          </div>
        </Card>
      </div>
    </>
  );
};

export default VerifyPage;

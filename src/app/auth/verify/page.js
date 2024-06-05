"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import TextMain from "../../../shared/Text/TextMain ";
import { ButtonPrimary } from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

const VerifyPage = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const referal = searchParams.get("referal");
  const type = searchParams.get("type");

  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  return (
    <>
      <div className="h-full  [@media(hover)]:items-center flex flex-row gap-[20px] w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:justify-center justify-between">
        <div className="flex flex-col gap-[10px] [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-[36px]">
          <div className="font-medium text-[32px] leading-[37.12px] tracking-[-1.44px] text-[#2c2c2c] dark:text-white w-full">
            отправили ключ к успеху на
            <div className="font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#5875e8]">
              {email?.toLowerCase()}
            </div>
          </div>

          <div className="font-normal text-[21px] leading-[22.05px] tracking-[-0.945px] text-[#8f8f8f] [@media(hover)]:max-w-[449px] w-full">
            письмо могло попасть не туда, проверьте папку спам
          </div>
        </div>

        <Card
          style="[@media(hover)]:max-w-[390px] w-full flex flex-col"
          rounded={20}
          padding={10}
        >
          <TextMain
            text="подтвердите почту, чтобы войти в профиль"
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
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
          />
          {error && (
            <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
              Введите код
            </p>
          )}
          <ButtonPrimary
            type="submit"
            text="Присоединиться к комьюнити"
            style="mt-[24px] w-full"
            onClick={() => {
              if (code.length > 0) {
                if (!!referal) {
                }

                window.location.href = `/api/auth/callback/email?email=${encodeURIComponent(
                  email?.toLowerCase()
                )}&token=${code}`;
              } else setError(true);
            }}
          />
          <div
            onClick={() => router.back()}
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

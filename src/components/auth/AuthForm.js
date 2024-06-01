"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import VkIcon from "../../shared/icons/VkIcon";
import { ButtonPrimary } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import TextSecondary from "../../shared/Text/TextSecondary";
import Link from "next/link";
import { checkInvite } from "../../server/actions/hr/checkInvite";

const AuthForm = ({ email, hrtoken }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  useEffect(() => {
    router.refresh();
  }, []);

  const checkhrtoken = async () => {
    const answ = await checkInvite(hrtoken, email);

    if (answ.status === false) {
      setError2(true);
      router.push("/error");
    }
  };

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
            if (!!hrtoken) {
              checkhrtoken();

              if (error2 === true) return;
              signIn("email", {
                redirect: false,
                callbackUrl: "/",
                email: e.get("email")?.toString()?.toLowerCase(),
              });
              router.push(
                "/auth/verify?email=" +
                  e.get("email")?.toString()?.toLowerCase() +
                  "&hrtoken=" +
                  hrtoken
              );
              return;
            }

            signIn("email", {
              redirect: false,
              callbackUrl: "/",
              email: e.get("email")?.toString()?.toLowerCase(),
            });
            router.push(
              "/auth/verify?email=" + e.get("email")?.toString()?.toLowerCase()
            );
          } else setError(true);
        }}
      >
        <input
          name={"email"}
          placeholder={"practica@practica.com"}
          autoComplete
          defaultValue={email ? email : ""}
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
          text="Отправить код"
          style="mt-[10px] w-full"
        />

        <p className="text-[#8f8f8f] text-[12px] leading-[14px] mt-[24px]">
          Нажимая «Отправить код», вы принимаете{" "}
          <Link
            href={
              "https://worried-robin-41e.notion.site/practica-2f23d456a24a46c38b89982a2cdebce5"
            }
            className="text-[#cdcdcd] hover:underline"
            target="_blank"
          >
            пользовательское соглашение
          </Link>
          ,{" "}
          <Link
            href={
              "https://www.notion.so/practica-881c68c185544ef28b5c4571fedd6eac?pvs=4"
            }
            className="text-[#cdcdcd] hover:underline"
            target="_blank"
          >
            обработку персональных данных
          </Link>{" "}
          и{" "}
          <Link
            href="https://worried-robin-41e.notion.site/f7d806ac13ae4e1ea402175edb00b331"
            className="text-[#cdcdcd] hover:underline"
            target="_blank"
          >
            оферту
          </Link>
        </p>
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

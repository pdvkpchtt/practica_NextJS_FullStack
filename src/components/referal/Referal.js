"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClipboard } from "use-clipboard-copy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import subscriptions from "../../assets/subscriptions.png";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";

const Referal = ({ data, link, id }) => {
  const router = useRouter();
  const clipboard = useClipboard();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  const getNounPitches = (dig) => {
    if (dig === 0 || dig >= 5 || dig % 10 === 0 || dig % 10 >= 5)
      return "питчей";
    if ((dig > 1 && dig < 5) || (dig % 10 > 1 && dig % 10 < 5)) return "питча";
    else return "питч";
  };

  return (
    <>
      <div className="max-w-[260px] w-full h-full  bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] p-[20px] rounded-l-[20px] [@media(pointer:coarse)]:hidden">
        <div
          className="[@media(hover)]:min-h-[305px] bg-cover"
          style={{ backgroundImage: `url(${subscriptions.src})` }}
        />
      </div>

      <div className="max-w-[720px] w-full bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] rounded-r-[20px] flex flex-col [@media(pointer:coarse)]:bg-transparent">
        {/* header pc */}
        <div className="border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] p-[12px] flex flex-row justify-between items-center [@media(pointer:coarse)]:hidden">
          <div
            className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </div>

          <TextMain
            text="Пригласи друга и получи несгораемые бонусы."
            style="font-medium text-[22px] leading-[26.4px] tracking-[-0.027em]"
          />

          <div
            className={`group rounded-[16px] invisible px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
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
          </div>
        </div>
        {/* header mobile */}

        {/* body */}
        <div className="flex  [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:overflow-y-auto [@media(pointer:coarse)]:mb-[80px] flex-row [@media(pointer:coarse)]:flex-col gap-[12px] [@media(pointer:coarse)]:dark:bg-[#141414] justify-between h-full p-[12px] [@media(pointer:coarse)]:mt-[19px]">
          {data.map((i, key) => (
            <div className="bg-[#74899B] bg-opacity-[8%] w-full h-[261px] min-h-[261px] rounded-[20px] flex flex-col gap-[8px] p-[16px]">
              <TextMain
                text={`${i.name}`}
                style="text-[22px] leading-[26px] tracking-[-0.432px] font-medium"
              />

              <Card
                padding={12}
                rounded={16}
                style={"flex flex-row gap-[8px] items-center mt-[16px]"}
              >
                <PitchIcon black blue={false} />
                <TextMain
                  style={
                    "   font-medium leading-[20px] text-[16px] tracking-[-0.015em]"
                  }
                  text={`${i.pitchesCount} ${getNounPitches(i.pitchesCount)}`}
                />
              </Card>
              <Card
                padding={12}
                rounded={16}
                style={"flex flex-row gap-[8px] items-center "}
              >
                <SuperpitchIcon black blue={false} />
                <TextMain
                  style={
                    "   font-medium leading-[20px] text-[16px] tracking-[-0.015em]"
                  }
                  text={`${i.superPitchesCount} супер${getNounPitches(
                    i.superPitchesCount
                  )}`}
                />
              </Card>

              <TextSecondary
                text={`${link}/auth?referal=${id}&type=${
                  i.name.includes("Starter") ? "starter" : "advanced"
                }`}
                style={
                  "text-[14px] leading-[18px] mb-[6px] tracking-[-0.208px] font-normal clampLine break-all"
                }
              />

              <div
                onClick={() => {
                  toast(`🗂 Ссылка скопирована`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    // theme: "dark",
                    progressStyle: { background: "#5875e8" },
                    containerId: "forCopy",
                  });
                  clipboard.copy(
                    `${link}/auth?referal=${id}&type=${
                      i.name.includes("Starter") ? "starter" : "advanced"
                    }`
                  );
                }}
                className="bg-[#5875e8] cursor-pointer hover:bg-[#3A56C5] select-none mt-auto rounded-[16px] active:bg-[#2C429C] py-[12px] font-medium leading-[19px] tracking-[-0.24px] text-[16px] w-full text-center flex items-center text-white transition duration-[250ms] justify-center"
              >
                Скопировать
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* body */}
    </>
  );
};

export default Referal;

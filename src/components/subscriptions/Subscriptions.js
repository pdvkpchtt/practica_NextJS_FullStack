"use client";

import { useRouter } from "next/navigation";

import TextMain from "../../shared/Text/TextMain ";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import TextSecondary from "../../shared/Text/TextSecondary";

import subscriptions from "../../assets/subscriptions.png";

const Subscriptions = ({ data }) => {
  const router = useRouter();

  const getNoun = (dig) => {
    if (dig === 0 || dig >= 5 || dig % 10 === 0 || dig % 10 >= 5) return "дней";
    if ((dig > 1 && dig < 5) || (dig % 10 > 1 && dig % 10 < 5)) return "дня";
    else return "день";
  };
  const getNounContact = (dig) => {
    if (dig === 0 || dig >= 5 || dig % 10 === 0 || dig % 10 >= 5)
      return "контактов";
    if ((dig > 1 && dig < 5) || (dig % 10 > 1 && dig % 10 < 5))
      return "контакта";
    else return "контакт";
  };
  const getNounPitches = (dig) => {
    if (dig === 0 || dig >= 5 || dig % 10 === 0 || dig % 10 >= 5)
      return "питчев";
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
        <div className="border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] p-[12px] flex flex-row justify-between [@media(pointer:coarse)]:hidden">
          <div
            className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </div>

          <TextMain
            text="Покупка контакта"
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
          {data.reverse().map((i, key) => (
            <div className="bg-[#74899B] bg-opacity-[8%] cursor-pointer w-full [@media(hover)]:w-[224px] h-[261px] min-h-[261px] rounded-[20px] flex flex-col gap-[8px] p-[16px]">
              <TextSecondary
                text="Все регионы"
                style={
                  "text-[14px] leading-[18px] tracking-[-0.182px] font-normal"
                }
              />
              <TextMain
                text={`${i.price}₽`}
                style="text-[32px] leading-[38px] tracking-[-0.416px] font-normal"
              />
              <TextSecondary
                text={`Действует ${
                  i.durationDays + " " + getNoun(i.durationDays)
                }`}
                style={
                  "text-[14px] leading-[18px] tracking-[-0.182px] font-normal"
                }
              />
              <TextSecondary
                text={`${i.contacts + " " + getNounContact(i.contacts)}`}
                style={
                  "text-[14px] leading-[18px] tracking-[-0.182px] font-normal"
                }
              />
              <TextSecondary
                text={`+ ${
                  i.pitchesCount + " " + getNounPitches(i.pitchesCount)
                }`}
                style={
                  "text-[14px] leading-[18px] tracking-[-0.182px] font-normal"
                }
              />
              <TextSecondary
                text={`+ ${
                  i.superPitchesCount +
                  " супер" +
                  getNounPitches(i.superPitchesCount)
                }`}
                style={
                  "text-[14px] leading-[18px] tracking-[-0.182px] font-normal"
                }
              />

              <div className="bg-[#5875e8] hover:bg-[#3A56C5] mt-auto rounded-[16px] active:bg-[#2C429C] py-[12px] font-medium leading-[19px] tracking-[-0.24px] text-[16px] w-full text-center flex items-center text-white transition duration-[250ms] justify-center">
                Купить
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* body */}
    </>
  );
};

export default Subscriptions;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { ButtonSecondary, OneIconButton } from "../../shared/ui/Button";
import { Input, TextArea } from "../../shared/ui/Input";
import DropDown from "../../shared/ui/DropDown";
import SkillsModalContent from "../Edit/SkillsModalContent";
import SkillCard from "../../shared/ui/SkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import BookmarkIcon from "../../shared/icons/BookmarkIcon";
import ReplyModal from "./ReplyModal";

const VacancyRight = ({ data, role = "student", userId }) => {
  const router = useRouter();
  console.log(data);

  const [modalState, setModalState] = useState(false);

  console.log(data, "vac data");

  return (
    <div className="w-full flex flex-col [@media(pointer:coarse)]:p-[12px]">
      {/* header */}
      <div
        className={`${
          modalState
            ? "[@media(pointer:coarse)]:z-[-1]"
            : "[@media(pointer:coarse)]:z-[300]"
        } [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]`}
      >
        <div className="w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton onClick={() => router.push("/search/vacancies")}>
            <ArrowLeftIcon />
          </OneIconButton>

          <div className="flex flex-row gap-[6px] items-center">
            {(role === "student" || role === "hr") && !data.amICreator && (
              <div
                className={`rounded-[30px] w-fit h-[33px] transition duration-[250ms] px-[12px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.013125em] select-none
                ${
                  data.hasMyReply === null
                    ? "active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer"
                    : "bg-[#f6f6f8] dark:bg-[#74899B] dark:bg-opacity-[8%] text-[#BFBFBF]"
                }
            `}
                onClick={() =>
                  data.hasMyReply === null ? setModalState(true) : {}
                }
              >
                {data.hasMyReply === null ? "Откликнуться" : "Вы откликнулись"}
              </div>
            )}

            {role === "student" ||
              (role === "hr" && <BookmarkIcon item={data} userId={userId} />)}
          </div>
        </div>
      </div>
      {/* header */}

      {/* body */}
      <div className="h-fit hideScrollbarNavMobile p-[12px] flex flex-col gap-[16px] rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px] bg-white dark:bg-[#212122]">
        {/* skills */}
        {data.VacancySkills.length > 0 && (
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row flex-wrap gap-[8px]">
              {data.vacArea.map((item) => (
                <SkillCard
                  area
                  hard={false}
                  key={item.id}
                  style="mr-[4px]"
                  text={item.label}
                />
              ))}
              {data.VacancySkills.map((item) => (
                <SkillCard
                  hard={item.skill.type == "hard"}
                  soft={item.skill.type == "soft"}
                  key={item.id}
                  style="mr-[4px]"
                  text={item.skill.name}
                />
              ))}
            </div>
          </div>
        )}
        {/* skills */}

        <div className="flex flex-col gap-[32px]">
          {/* name and short desc */}
          <div className="flex flex-col gap-[8px] w-full">
            <TextMain
              text={data.name}
              style="font-medium text-[24px] w-full leading-[29px] tracking-[-0.312px]"
            />
            <TextMain
              text={data.shortDescription}
              style="font-normal text-[14px] w-full leading-[17px] tracking-[-0.21px]"
            />
          </div>
          {/* name and short desc */}

          {/* descrition */}
          <div className="flex flex-col gap-[8px] w-full">
            <TextMain
              text={"Описание работы и обязанности"}
              style="font-semibold text-[14px] w-full leading-[18px] tracking-[-0.182px]"
            />
            <TextMain
              text={data.description}
              style="font-normal text-[14px] w-full leading-[17px] tracking-[-0.21px]"
            />
          </div>
          {/* descrition */}

          {/* conditions */}
          <div className="flex flex-col gap-[8px] w-full">
            <TextMain
              text={"Условия"}
              style="font-semibold text-[14px] w-full leading-[18px] tracking-[-0.182px]"
            />
            <TextMain
              text={data.conditions}
              style="font-normal text-[14px] w-full leading-[17px] tracking-[-0.21px]"
            />
          </div>
          {/* conditions */}

          {/* waitings */}
          <div className="flex flex-col gap-[8px] w-full">
            <TextMain
              text={"Мы ждём от вас"}
              style="font-semibold text-[14px] w-full leading-[18px] tracking-[-0.182px]"
            />
            <TextMain
              text={data.waitings}
              style="font-normal text-[14px] w-full leading-[17px] tracking-[-0.21px]"
            />
          </div>
          {/* waitings */}

          {/* contact face */}
          {data?.hrCreator && (
            <div className="flex flex-col gap-[8px] w-full">
              <TextMain
                text={"Контактное лицо"}
                style="font-semibold text-[14px] w-full leading-[18px] tracking-[-0.182px]"
              />
              <div className="flex flex-row gap-[12px]">
                <div className="relative overflow-hidden rounded-[8px] h-[50px] w-[50px]">
                  {data?.hrCreator?.image ? (
                    <Image
                      src={data.hrCreator.image}
                      alt="Profile photo"
                      className="w-[50px] h-[50px]"
                      width={50}
                      height={50}
                      quality={100}
                      priority={true}
                    />
                  ) : (
                    <EmptyAvatar fifty />
                  )}
                </div>
                <div className="flex flex-col gap-[4px]">
                  <TextMain
                    onClick={() =>
                      router.push(`/profile/${data?.hrCreator?.username}`)
                    }
                    text={data?.hrCreator?.name}
                    style="font-normal cursor-pointer text-[14px] w-full leading-[17px] tracking-[-0.21px]"
                  />
                  <TextSecondary
                    text={"@" + data?.hrCreator?.username}
                    style="font-normal text-[14px] w-full leading-[17px] tracking-[-0.182px]"
                  />
                </div>
              </div>
            </div>
          )}
          {/* contact face */}
        </div>
      </div>
      {/* body */}

      {data.hasMyReply === null && (
        <ReplyModal
          vacId={data?.id}
          modalState={modalState}
          setModalState={() => setModalState(false)}
        />
      )}
    </div>
  );
};

export default VacancyRight;

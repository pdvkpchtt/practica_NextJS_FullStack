"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import * as HoverCard from "@radix-ui/react-hover-card";

import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import SkillCard from "./SkillCard";
import EmptyAvatar from "./EmptyAvatar";
import { useRouter } from "next/navigation";
import BottomModal from "./BottomModal";
import DeleteVacContent from "./DeleteVacContent";
import Helper from "./Helper";

import BookmarkIcon from "../icons/BookmarkIcon";
import DotsIcon from "../icons/DotsIcon";
import VacCheckedStatusIcon from "../icons/VacCheckedStatusIcon";
import ReplyCountIcon from "../icons/ReplyCountIcon";
import VacViewIcon from "../icons/VacViewIcon";

const VacancyCard = ({ item, role = "student", userId }) => {
  const router = useRouter();

  const [isOpen, toggle] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      {!deleted && (
        <motion.div layoutId={item.id}>
          <Card style="flex flex-col gap-[12px]" padding={12}>
            {/* image name time */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-[12px]">
                <div className="min-w-[67px] h-[67px] aspect-square w-[67px] min-h-[67px]  max-w-[67px] max-h-[67px] overflow-hidden rounded-full">
                  {item?.Company?.image ? (
                    <Image
                      src={item.Company.image}
                      width={67}
                      unoptimized
                      height={67}
                      alt="Profile image"
                      className="min-w-[67px] max-w-[67px] object-cover max-h-[67px] h-[67px] w-[67px] min-h-[67px]"
                    />
                  ) : (
                    <EmptyAvatar sixtySeven />
                  )}
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="flex items-center flex-row text-[#8f8f8f] flex-wrap font-medium text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]">
                    <p
                      onClick={() =>
                        router.push(
                          `/companyprofile/${
                            item.Company.username.length === 0
                              ? item.Company.id
                              : item.Company.username
                          }`
                        )
                      }
                      className="text-[#8f8f8f] font-medium break-all text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]"
                    >
                      {item.Company.username.length === 0
                        ? `@${item.Company.id}`
                        : `@${item.Company.username}`}
                    </p>
                    {item.hrCreator && (
                      <>
                        &nbsp;•&nbsp;
                        {item?.myVac ? (
                          <p
                            className="font-medium text-[#5875e8] text-[14px] break-all cursor-pointer leading-[18px] tracking-[-0.182px] break-words"
                            onClick={() =>
                              router.push(`/profile/${item.hrCreator.username}`)
                            }
                          >
                            {"@" + item.hrCreator.username}
                          </p>
                        ) : (
                          <TextSecondary
                            onClick={() =>
                              router.push(`/profile/${item.hrCreator.username}`)
                            }
                            text={"@" + item.hrCreator.username}
                            style="font-medium text-[14px] break-all cursor-pointer leading-[18px] tracking-[-0.182px]"
                          />
                        )}
                      </>
                    )}
                  </div>

                  {item.currency ? (
                    <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                      {item.salaryStart && `от ${item.salaryStart}`}
                      {item.salaryEnd && ` до ${item.salaryEnd}`}{" "}
                      {item.currency?.label}
                      {(item.Location.length > 0 || item.distantWork) && (
                        <> • </>
                      )}
                      {item.Location.map(
                        (i, key) =>
                          `${i.label}${
                            key !== item.Location.length - 1 ? ", " : ""
                          }`
                      )}
                      {!item.distantWork
                        ? ""
                        : item.Location.length > 0
                        ? ", возможно удаленно"
                        : "возможно удаленно"}
                    </p>
                  ) : (
                    <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                      По договоренности
                      {item.Location.length > 0 && <> • </>}
                      {item.Location.map(
                        (i, key) =>
                          `${i.label}${
                            key !== item.Location.length - 1 ? ", " : ""
                          }`
                      )}
                      {!item.distantWork
                        ? ""
                        : item.Location.length > 0
                        ? ", возможно удаленно"
                        : "возможно удаленно"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-[8px] items-center h-fit">
                {item?.hasMyReply ? (
                  item?.VacancyReply[0]?.status === "wait" ? (
                    <HoverCard.Root openDelay={250}>
                      <HoverCard.Trigger asChild>
                        <div>
                          <VacCheckedStatusIcon />
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-fit rounded-[12px] bg-[#141414] bg-opacity-[50%] px-[12px] py-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                          sideOffset={5}
                        >
                          <p className={"text-[12px] font-medium text-white"}>
                            На рассмотрении
                          </p>

                          <HoverCard.Arrow className="fill-[rgba(20,20,20)] opacity-[50%]" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  ) : item?.VacancyReply[0]?.status === "accepted" ? (
                    <HoverCard.Root openDelay={250}>
                      <HoverCard.Trigger asChild>
                        <div>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 7.49999C11.2501 8.30557 11.034 9.09641 10.6242 9.78996C10.2143 10.4835 9.62583 11.0543 8.92011 11.4428C8.21439 11.8313 7.41733 12.0232 6.61212 11.9985C5.80692 11.9739 5.0231 11.7335 4.3425 11.3025L2.25 12L2.9475 9.90749C2.57428 9.31774 2.34334 8.64927 2.27295 7.95491C2.20256 7.26055 2.29464 6.55933 2.54191 5.90668C2.78918 5.25404 3.18487 4.66785 3.6977 4.19446C4.21053 3.72107 4.82644 3.37345 5.49675 3.17908C6.16706 2.9847 6.87339 2.94891 7.55991 3.07452C8.24644 3.20013 8.89433 3.48371 9.45239 3.90283C10.0104 4.32195 10.4634 4.86514 10.7754 5.48944C11.0873 6.11375 11.2498 6.80207 11.25 7.49999Z"
                              stroke="#5875E8"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.00195 11.9925C7.22667 12.631 7.59245 13.2106 8.07208 13.6881C8.55172 14.1657 9.13286 14.529 9.77228 14.751C10.4117 14.973 11.0929 15.0479 11.7653 14.9703C12.4377 14.8926 13.084 14.6644 13.656 14.3025L15.7485 15L15.051 12.9075L15.1575 12.7305C15.5481 12.0461 15.7521 11.271 15.7491 10.483C15.7461 9.6949 15.5362 8.92144 15.1405 8.23997C14.7447 7.5585 14.1768 6.99292 13.4938 6.59982C12.8108 6.20672 12.0365 5.99988 11.2485 6L11.0797 6.003L10.995 6.0075"
                              stroke="#5875E8"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-fit rounded-[12px] bg-[#141414] bg-opacity-[50%] px-[12px] py-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                          sideOffset={5}
                        >
                          <p className={"text-[12px] font-medium text-white"}>
                            У вас свидание с HR
                          </p>
                          <HoverCard.Arrow className="fill-[rgba(20,20,20)] opacity-[50%]" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  ) : item?.VacancyReply[0]?.status === "declined" ? (
                    <HoverCard.Root openDelay={250}>
                      <HoverCard.Trigger asChild>
                        <div>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.75 9.00001C15.7502 10.2084 15.426 11.3947 14.8112 12.435C14.1965 13.4753 13.3137 14.3315 12.2552 14.9142C11.1966 15.497 10.001 15.7849 8.79318 15.7478C7.58537 15.7108 6.40965 15.3502 5.38875 14.7038L2.25 15.75L3.29625 12.6113C2.73641 11.7266 2.39001 10.7239 2.28442 9.6824C2.17883 8.64085 2.31695 7.58903 2.68786 6.61006C3.05877 5.63109 3.65231 4.75181 4.42155 4.04172C5.1908 3.33163 6.11466 2.8102 7.12012 2.51864C8.12559 2.22709 9.18508 2.1734 10.2149 2.36181C11.2447 2.55023 12.2165 2.97559 13.0536 3.60428C13.8907 4.23296 14.5701 5.04773 15.038 5.98419C15.506 6.92065 15.7498 7.95313 15.75 9.00001Z"
                              stroke="#8F8F8F"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.5 10.5L10.5 7.5"
                              stroke="#8F8F8F"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.5 7.5L10.5 10.5"
                              stroke="#8F8F8F"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-fit rounded-[12px] bg-[#141414] bg-opacity-[50%] px-[12px] py-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                          sideOffset={5}
                        >
                          <p className={"text-[12px] font-medium text-white"}>
                            Отказ
                          </p>
                          <HoverCard.Arrow className="fill-[rgba(20,20,20)] opacity-[50%]" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  ) : null
                ) : null}

                <div className="flex flex-row gap-[4px] items-center">
                  {item?.partOfTeam?.userId && (
                    <DotsIcon onClick={() => toggle(true)} />
                  )}
                  {(role === "student" || role.includes("hr")) && (
                    <BookmarkIcon item={item} userId={userId} />
                  )}
                </div>
              </div>
            </div>
            {/* image name time */}

            {/* name and short desc */}

            <a href={`/vacancy/${item.id}`} target="_blank">
              <TextMain
                text={item.name}
                style="font-medium cursor-pointer text-[16px] leading-[19.2px] tracking-[-0.24px]"
                // onClick={() => router.push()}
              />
            </a>
            {item.shortDescription && (
              <TextSecondary
                text={item.shortDescription}
                style={
                  "text-[14px] leading-[17px] whitespace-pre-line tracking-[-0.252px]"
                }
              />
            )}
            {/* name and short desc */}

            {/* skills */}
            {(item.VacancySkills.length > 0 || item.vacArea.length > 0) && (
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row flex-wrap overflow-hidden gap-[8px] h-[24px] [@media(pointer:coarse)]:h-fit [@media(pointer:coarse)]:max-h-[56px]">
                  {item.vacArea.length > 0 &&
                    item.vacArea.map((item) => (
                      <SkillCard
                        area
                        hard={false}
                        key={item.id}
                        style="mr-[4px]"
                        text={item.label}
                      />
                    ))}
                  {item.VacancySkills.length > 0 &&
                    item.VacancySkills.map(
                      (item) =>
                        item.type === "hard" && (
                          <SkillCard
                            hard={item.type == "hard"}
                            soft={item.type == "soft"}
                            key={item.id}
                            style="mr-[4px]"
                            text={item.name}
                          />
                        )
                    )}
                  {item.VacancySkills.length > 0 &&
                    item.VacancySkills.map(
                      (item) =>
                        item.type === "soft" && (
                          <SkillCard
                            hard={item.type == "hard"}
                            soft={item.type == "soft"}
                            key={item.id}
                            style="mr-[4px]"
                            text={item.name}
                          />
                        )
                    )}
                </div>
              </div>
            )}
            {/* skills */}

            {/* counts */}
            <div className="w-full flex flex-row gap-[12px] items-center justify-end">
              <Helper text="Отклики">
                <div className="flex flex-row gap-[4px] items-center justify-center">
                  <ReplyCountIcon />
                  <p className="text-[#8F8F8F] text-[13px] leading-[16px] font-medium tracking-[-0.351px] select-none">
                    {item.replyCount}
                  </p>
                </div>
              </Helper>
              <Helper text="Просмотры">
                <div className="flex flex-row gap-[4px] items-center justify-center">
                  <VacViewIcon />
                  <p className="text-[#8F8F8F] text-[13px] leading-[16px] font-medium tracking-[-0.351px] select-none">
                    {item.viewsCount}
                  </p>
                </div>
              </Helper>
            </div>
            {/* counts */}
          </Card>
        </motion.div>
      )}

      {/* modal */}
      <BottomModal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        translate="translate(-50%, 0%)"
      >
        <DeleteVacContent
          id={item.id}
          setDeleted={() => setDeleted(true)}
          handleClose={() => toggle(false)}
        />
      </BottomModal>
      {/* modal */}
    </>
  );
};

export default VacancyCard;

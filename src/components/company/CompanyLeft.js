"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClipboard } from "use-clipboard-copy";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import useWindowDimensions from "../../components/Profile/useWindowDimensions";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import RecrutersModal from "./RecrutersModal";
import FollowersModal from "./FollowersModal";

import PenIcon from "../../shared/icons/PenIcon";
import SettingsIcon from "../../shared/icons/SettingsIcon";
import AddVacancyIcon from "../../shared/icons/AddVacancyIcon";
import RecruterIcon from "../../shared/icons/RecruterIcon";

const CompanyLeft = ({
  navState,
  data,
  withoutActions = false,
  onClick,
  refElement = null,
  opacity = false,
  trigger = false,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);

  console.log(data);

  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5) return " рекрутеров";
    if (dig % 10 > 1 && dig % 10 < 5) return " рекрутера";
    else return " рекрутер";
  };

  // console.log(data);
  return (
    <>
      <motion.div
        className={`${
          navState == true
            ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
            : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px]  [@media(pointer:coarse)]:gap-[12px]"
        }
   
  transition-all duration-[250ms] ${
    !trigger
      ? "[@media(hover)]:fixed [@media(hover)]:top-[86px]"
      : opacity
      ? "[@media(hover)]:fixed [@media(hover)]:bottom-[24px]"
      : "[@media(hover)]:top-[86px]"
  } [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full h-fit`}
        ref={refElement}
      >
        <Card
          style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="relative overflow-hidden rounded-full aspect-square [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
            {data.image ? (
              <Image
                src={data.image}
                alt="Profile photo"
                className="[@media(hover)]:min-w-[110px] object-cover  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] [@media(hover)]:min-h-[110px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full w-full"
                width={110}
                height={110}
                quality={100}
                priority={true}
              />
            ) : (
              <EmptyAvatar hungredAndTen />
            )}
          </div>

          {/* name and username */}
          <div className="flex flex-col gap-[8px]">
            <TextMain
              text={data.name}
              onClick={onClick}
              style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] ${
                onClick && "cursor-pointer"
              }`}
            />
            <TextSecondary
              text={`@${data.username.length !== 0 ? data.username : data.id}`}
              onClick={() => {
                toast(`🗂 Текст скопирован`, {
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
                clipboard.copy(data.username);
              }}
              style="font-medium text-[16px] leading-[20px] cursor-pointer tracking-[-0.24px] w-full text-center"
            />
          </div>
          {/* name and username */}

          {/* about */}
          {data.about && (
            <TextSecondary
              text={data.about}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] w-full text-center"
            />
          )}

          {!data.Cities || data.Cities.length === 0 ? null : (
            <TextSecondary
              text={data.Cities.map(
                (item, key) =>
                  true &&
                  `${item.label}${key !== data.Cities.length - 1 ? ", " : ""}`
              )}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] font-medium w-full text-center"
            />
          )}
          {/* about */}
        </Card>
        {!withoutActions && (
          <>
            {/* ссылки */}
            {data?.Links?.length !== 0 && (
              <Card
                style=" 
      [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
      flex flex-row gap-[16px] flex-wrap 
      hideScrollbarNavMobile [@media(hover)]:h-fit"
                padding={12}
              >
                {data?.Links?.map((item, key) => (
                  <a
                    key={key}
                    href={item.link}
                    target="_blank"
                    className={
                      "text-[14px] whitespace-nowrap text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-normal leading-[18px] tracking-[-0.21px] cursor-pointer"
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </Card>
            )}
            {/* ссылки */}

            <Card
              style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[8px]"
              padding={12}
            >
              {/* views and connections */}
              <div
                className="flex flex-row cursor-pointer gap-[4px]"
                onClick={() => setModalState2(true)}
              >
                <TextMain
                  text={data.followersCount}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text="подписчиков"
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
              {/* <div className="flex flex-row gap-[4px]">
                <TextMain
                  text={0}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text="сотрудников в practica"
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div> */}
              <div
                className="flex flex-row gap-[4px] cursor-pointer"
                onClick={() => setModalState(true)}
              >
                <TextMain
                  text={data.hrcount}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text={getNoun(data.hrcount)}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
              {/* views and connections */}
            </Card>

            <Card
              style="max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px]"
              padding={12}
            >
              <ButtonGhost
                text="Добавить вакансию"
                onClick={() =>
                  router.push("/companyprofile/createvacancy", {
                    query: { data: "update" },
                  })
                }
              >
                <AddVacancyIcon fill={"#5875e8"} />
              </ButtonGhost>

              {/* <ButtonGhost
              text="Мои рекрутеры"
              onClick={() => setModalState(true)}
            >
              <RecruterIcon />
            </ButtonGhost> */}

              <ButtonGhost
                text="Редактировать"
                onClick={() =>
                  router.push("/companyprofile/edit", {
                    query: { data: "update" },
                  })
                }
              >
                <PenIcon fill={"#5875e8"} />
              </ButtonGhost>

              <ButtonGhost
                text="Настройки"
                onClick={() => router.push("/settings")}
              >
                <SettingsIcon fill={"#5875e8"} />
              </ButtonGhost>
            </Card>
          </>
        )}
      </motion.div>
      <RecrutersModal
        comapnyId={data.id}
        modalState={modalState}
        setModalState={setModalState}
      />
      <FollowersModal
        comapnyId={data.id}
        modalState={modalState2}
        setModalState={setModalState2}
      />
    </>
  );
};

export default CompanyLeft;

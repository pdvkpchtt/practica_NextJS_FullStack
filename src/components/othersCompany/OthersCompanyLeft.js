"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useClipboard } from "use-clipboard-copy";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import { followCompany } from "../../server/actions/companyFollowing/followCompany";
import { unfollowCompany } from "../../server/actions/companyFollowing/unfollowCompany";
import { checkIfIFollowCompany } from "server/actions/companyFollowing/checkIfIFollowCompany";
import CustomLoader from "../../shared/ui/CustomLoader";
import useWindowDimensions from "../../components/Profile/useWindowDimensions";
import RecrutersModal from "../../components/company/RecrutersModal";
import FollowersModal from "../../components/company/FollowersModal";

import NotifyIcon from "../../shared/icons/NotifyIcon";
import CrossIcon from "../../shared/icons/CrossIcon";
import RecruterIcon from "../../shared/icons/RecruterIcon";
import PenIcon from "../../shared/icons/PenIcon";
import SettingsIcon from "../../shared/icons/SettingsIcon";
import AddVacancyIcon from "../../shared/icons/AddVacancyIcon";
import useInterval from "use-interval";
import Helper from "../../shared/ui/Helper";
import CopyIcon from "../../shared/icons/CopyIcon";

const OthersCompanyLeft = ({
  navState,
  data,
  refElement = null,
  opacity = false,
  trigger = false,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5 || dig > 999) return "рекрутеров";
    if (dig % 10 > 1 && dig % 10 < 5) return "рекрутера";
    else return "рекрутер";
  };

  const getNoun2 = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5 || dig > 999) return "подписок";
    if (dig % 10 > 1 && dig % 10 < 5) return "подписки";
    else return "подписка";
  };

  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);

  const [ifFollow, setIfFollow] = useState(false);
  const [loading, setloading] = useState(true);

  const checkIffollow = async () => {
    const followInfo = await checkIfIFollowCompany(data.id);
    console.log(followInfo, "followInfo");
    setIfFollow(followInfo);
    setloading(false);
  };

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  useInterval(
    () => {
      checkIffollow();
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    setloading(true);
    checkIffollow();
  }, []);

  // console.log(data);
  return (
    <>
      <motion.div
        className={`${
          navState == true
            ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px]"
            : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px]"
        }
   
  transition-all duration-[250ms] ${
    !trigger
      ? "[@media(hover)]:fixed [@media(hover)]:top-[86px]"
      : opacity
      ? "[@media(hover)]:fixed [@media(hover)]:bottom-[24px]"
      : "[@media(hover)]:top-[86px]"
  } [@media(hover)]:max-w-[260px]  w-full h-fit`}
        ref={refElement}
      >
        <Card
          style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="relative overflow-hidden bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50  rounded-full aspect-square [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
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
              style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] `}
            />
            <Helper text="Скопировать ссылку на профиль" styled="mx-auto">
              <div
                className="flex flex-row gap-[2px] items-center cursor-pointer"
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
                  clipboard.copy(
                    "https://practica.team/companyprofile/" + data.username
                  );
                }}
              >
                <TextSecondary
                  text={`@${
                    data.username.length !== 0 ? data.username : data.id
                  }`}
                  style="font-medium text-[16px] leading-[20px] cursor-pointer tracking-[-0.24px] w-fit text-center"
                />

                <CopyIcon />
              </div>
            </Helper>
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
            className="flex flex-row gap-[4px] cursor-pointer"
            onClick={() => setModalState2(true)}
          >
            <TextMain
              text={abbreviateNumber(data?.followersCount)}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
            <TextSecondary
              text={getNoun2(data?.followersCount)}
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
            className="flex cursor-pointer flex-row gap-[4px]"
            onClick={() => setModalState(true)}
          >
            <TextMain
              text={abbreviateNumber(data?.hrcount)}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
            <TextSecondary
              text={getNoun(data?.hrcount)}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
          </div>
          {/* views and connections */}
        </Card>

        {data.imHr ? (
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
            // onClick={() => setModalState(true)}
          >
            <RecruterIcon />
          </ButtonGhost> */}

            <ButtonGhost
              text="Редактировать"
              onClick={() =>
                router.push(`/companyprofile/${data?.username}/edit`, {
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
        ) : (
          <Card
            style={`max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px] ${
              loading && "items-center"
            }`}
            padding={12}
          >
            {!ifFollow && !loading && (
              <ButtonGhost
                text="Подписаться"
                onClick={async () => {
                  await followCompany(data.id);
                  toast(`🔔 Вы подписались`, {
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
                }}
              >
                <NotifyIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
            {ifFollow && !loading && (
              <ButtonGhost
                text="Отписаться"
                onClick={async () => {
                  await unfollowCompany(data.id);
                  toast(`🔕 Вы отписались`, {
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
                }}
              >
                <CrossIcon size={20} fill={"#5875e8"} hard={false} soft />
              </ButtonGhost>
            )}
            {loading && (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            )}
          </Card>
        )}

        {/* <Card
        style="max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px]"
        padding={12}
      >
        <ButtonGhost
          text="Отправить сообщение"
          //   onClick={() => router.push("/settings")}
        >
          <MessengeIcon fill={"#5875e8"} />
        </ButtonGhost>
      </Card> */}
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

export default OthersCompanyLeft;

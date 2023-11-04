"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

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

const OthersCompanyLeft = ({ navState, data }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const { height, width } = useWindowDimensions();

  const location = [data.city, data.country];

  const [trigger, setTrigger] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined")
      setTrigger(height - ref?.current?.clientHeight < 86);
  }, [height]);

  const changeOpacity = () => {
    if (window.scrollY >= 16) setOpacity(true);
    if (window.scrollY < 16) setOpacity(false);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", changeOpacity);

  const [ifFollow, setIfFollow] = useState(false);
  const [loading, setloading] = useState(true);

  const checkIffollow = async () => {
    setloading(true);
    setIfFollow(await checkIfIFollowCompany(data.user.id));
    setloading(false);
  };

  useEffect(() => {
    checkIffollow();
  }, []);

  // console.log(data);
  return (
    <motion.div
      whileHover={
        navState
          ? trigger && !isMobile
            ? { y: height - ref?.current?.clientHeight - 86 - 24 }
            : { y: 0 }
          : {}
      }
      animate={
        trigger
          ? opacity && !isMobile
            ? {
                y: height - ref?.current?.clientHeight - 86 - 24,
              }
            : { y: 0 }
          : { y: 0 }
      }
      transition={{ duration: 0.01 }}
      className={`${
        navState == true
          ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px]"
          : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px]"
      }
   
  transition duration-[250ms] [@media(hover)]:top-[86px] [@media(hover)]:fixed [@media(hover)]:max-w-[260px]  w-full`}
      ref={ref}
    >
      <Card
        style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
        padding={12}
      >
        <div className="relative overflow-hidden rounded-full h-[110px] w-[110px] mx-auto">
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              className="[@media(hover)]:w-[110px] w-full"
              width={110}
              height={110}
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar />
          )}
        </div>

        {/* name and username */}
        <div className="flex flex-col gap-[8px]">
          <TextMain
            text={data.name}
            style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] `}
          />
          <TextSecondary
            text={`@${data.username.length !== 0 ? data.username : data.id}`}
            style="font-medium text-[16px] leading-[20px] tracking-[-0.24px] w-full text-center"
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
            text={data?.followersCount}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="подписчиков"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div>
        <div className="flex flex-row gap-[4px]">
          <TextMain
            text={0}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="сотрудников в practica"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div>
        <div
          className="flex cursor-pointer flex-row gap-[4px]"
          onClick={() => setModalState(true)}
        >
          <TextMain
            text={data?.hrcount}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="рекрутеров"
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
                await followCompany(data.user.id);
                setIfFollow(true);
                toast(`🦄 Вы подписались`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
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
                await unfollowCompany(data.user.id);
                setIfFollow(false);
                toast(`🦄 Вы отписались`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
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
  );
};

export default OthersCompanyLeft;

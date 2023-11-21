"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import useInterval from "use-interval";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import ConnectionsModal from "./ConnectionsModal";
import UpdatesModal from "./UpdatesModal";
import useWindowDimensions from "./useWindowDimensions";
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import CustomLoader from "../../shared/ui/CustomLoader";
import { getMyProfileInfoTimer } from "../../server/actions/profileTimer/getMyProfileInfoTimer";

import LocationIcon from "../../shared/icons/LocationIcon";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import PenIcon from "../../shared/icons/PenIcon";
import SettingsIcon from "../../shared/icons/SettingsIcon";
import BellIcon from "../../shared/icons/BellIcon";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "shared/icons/SuperpitchIcon";
import PitchesModal from "./PitchesModal";
import ContactsIcon from "shared/icons/ContactsIcon";
import ContactsModal from "./ContactsModal";

const Left = ({ navState, data, pitchesFirst, superPitchesFirst }) => {
  // console.log(data, "saasassaasas2");
  const router = useRouter();
  const ref = useRef(null);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const { height, width } = useWindowDimensions();

  const location = [data.city, data.country];

  const getNoun = (dig) => {
    if (dig === 0 || dig >= 5 || dig % 10 === 0 || dig % 10 >= 5)
      return "питчев";
    if ((dig > 1 && dig < 5) || (dig % 10 > 1 && dig % 10 < 5)) return "питча";
    else return "питч";
  };

  const [trigger, setTrigger] = useState(false);
  const [opacity, setOpacity] = useState(false);

  const [modalState, setModalState] = useState(false);
  const [modal2State, setModal2State] = useState(false);
  const [pitchesModalState, setPitchesModalState] = useState(false);
  const [contactsModalState, setContactsModalState] = useState(false);

  const [updatesState, setUpdatesState] = useState(null);

  const getInfoAboutUpdates = async () => {
    const updatesCount = await getMyProfileInfoTimer();
    // console.log(updatesCount, "jopa");
    setUpdatesState(updatesCount);
  };

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      getInfoAboutUpdates();
      getPitchesCountHanler();
    },
    isRunning ? delay : null
  );

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

  // here we are getting pitches count
  const [pitchesState, setPitchesState] = useState(null);
  const [superpitchesState, setSuperPitchesState] = useState(null);

  const getPitchesCountHanler = async () => {
    setPitchesState(await getPitchesCount());
    setSuperPitchesState(await getPitchesCount("superpitch"));
  };

  // useEffect(() => {
  //   getPitchesCountHanler();
  // }, []);
  // here we are getting pitches count

  return (
    <>
      <motion.div
        whileHover={
          trigger && !isMobile
            ? { y: height - ref?.current?.clientHeight - 86 - 24 }
            : { y: 0 }
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
            ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
            : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
        }
       
      transition duration-[250ms] [@media(hover)]:top-[86px] [@media(hover)]:fixed [@media(hover)]:max-w-[260px]  w-full`}
        ref={ref}
      >
        <Card
          style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="rounded-[8px] overflow-hidden aspect-square [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]">
            {data.image ? (
              <Image
                src={data.image}
                alt="Profile photo"
                className="[@media(hover)]:min-w-[236px] object-cover [@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(hover)]:min-h-[236px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
                width={236}
                height={236}
                quality={100}
                priority={true}
              />
            ) : (
              <EmptyAvatar />
            )}
          </div>

          <div className="flex flex-col">
            {/* name and username */}
            <div className="flex flex-col gap-[8px]">
              <TextMain
                text={data.name}
                style="font-medium text-[18px] leading-[21.6px] tracking-[-0.025em]"
              />
              <TextSecondary
                text={`@${data.username}`}
                style="font-medium text-[14px] leading-[16px] tracking-[-0.015em]"
              />
            </div>
            {/* name and username */}

            {/* location and birth date */}
            <div className="flex flex-col">
              {(data.city === null && data.country === null) ||
              (data.city?.length === 0 && data.country?.length === 0) ? null : (
                <div className="flex flex-row gap-[8px] mt-[12px]">
                  <LocationIcon />
                  <TextSecondary
                    text={location.map((i, key) =>
                      !i
                        ? ""
                        : `${i}${
                            location[key + 1] === null ||
                            location[key + 1]?.length === 0 ||
                            key === location.length - 1
                              ? ""
                              : ", "
                          }`
                    )}
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              )}

              {data.birthDate && (
                <div className="flex flex-row gap-[8px] mt-[12px]">
                  <CalendarIcon />
                  <TextSecondary
                    text={data.birthDate}
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              )}
            </div>
            {/* location and birth date */}

            {/* views and connections */}
            <div
              className="flex flex-col gap-[8px] mt-[12px] cursor-pointer"
              onClick={() => {
                setModalState(true);
              }}
            >
              <div className="flex flex-row gap-[4px]">
                <TextMain
                  text={data.connections}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text="Связей"
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
            </div>
            {/* views and connections */}
          </div>
        </Card>

        <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
          <ButtonGhost text="Обновления" onClick={() => setModal2State(true)}>
            <BellIcon />
          </ButtonGhost>
          {updatesState === null
            ? data.UpdatesToMe.length > 0 && (
                <div className="w-[8px] h-[8px] bg-[#5875e8] rounded-full ml-[8px]" />
              )
            : updatesState > 0 && (
                <div className="w-[8px] h-[8px] bg-[#5875e8] rounded-full ml-[8px]" />
              )}
        </div>

        {/* hr */}
        {data.role === "hr" && (
          <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
            <ButtonGhost
              text={data.hrCompany.company.name}
              onClick={() => router.push(`/companyprofile`)}
            >
              <div className="rounded-full overflow-hidden aspect-square w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
                {data.hrCompany.company.image ? (
                  <Image
                    src={data.hrCompany.company.image}
                    alt="hr company photo"
                    className="w-[20px] h-[20px] min-w-[20px] object-cover min-h-[20px] max-w-[20px] max-h-[20px]"
                    width={20}
                    height={20}
                    quality={100}
                    priority={true}
                  />
                ) : (
                  <div className="rounded-full h-[20px] w-[20px] bg-[#f6f6f8] dark:bg-[#141414]" />
                )}
              </div>
            </ButtonGhost>
          </div>
        )}
        {/* hr */}

        {/* contacts */}
        <div
          className={` p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
        >
          <button
            className={`group text-center h-[28px] w-fit whitespace-nowrap items-center flex-row gap-[8px] flex 
          font-medium leading-[20px] text-[16px] tracking-[-0.015em]
       cursor-pointer select-none transition duration-[250ms] text-[#2с2с2с] dark:text-[#fff]`}
            onClick={() => setContactsModalState(true)}
          >
            <ContactsIcon />
            {data.phoneVerified && data.phone
              ? "Контакты"
              : "Контакты отсутсвуют"}
          </button>
        </div>
        {/* contacts */}

        {/* pitches + superpitches */}
        <div
          className={`${
            "" // pitchesState === null && "justify-center"
          } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
        >
          <button
            className={`group text-center h-[28px] w-fit whitespace-nowrap items-center flex-row gap-[8px] flex 
          font-medium leading-[20px] text-[16px] tracking-[-0.015em]
       cursor-pointer select-none transition duration-[250ms] text-[#2с2с2с] dark:text-[#fff]`}
            onClick={() => setPitchesModalState(true)}
          >
            {/* {pitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : ( */}
            <>
              <PitchIcon black blue={false} />
              {pitchesState === null
                ? pitchesFirst + " " + getNoun(pitchesFirst)
                : pitchesState + " " + getNoun(pitchesState)}
            </>
            {/* )} */}
          </button>
        </div>

        <div
          className={`${
            "" // superpitchesState === null && "justify-center"
          } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
        >
          <button
            className={`group text-center h-[28px] w-fit whitespace-nowrap items-center flex-row gap-[8px] flex 
          font-medium leading-[20px] text-[16px] tracking-[-0.015em]
       cursor-pointer select-none transition duration-[250ms] text-[#2с2с2с] dark:text-[#fff]`}
            onClick={() => setPitchesModalState(true)}
          >
            {/* {superpitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : ( */}
            <>
              <SuperpitchIcon black blue={false} />
              {superpitchesState === null
                ? superPitchesFirst + " супер" + getNoun(superPitchesFirst)
                : superpitchesState + " супер" + getNoun(superpitchesState)}
            </>
            {/* )} */}
          </button>
        </div>
        {/* pitches + superpitches */}

        <Card
          style="max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] gap-[8px] flex flex-col"
          padding={12}
        >
          <ButtonGhost
            text="Редактировать"
            onClick={() =>
              router.push("/profile/edit", { query: { data: "update" } })
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
      </motion.div>

      {/* friend requests modal */}
      <UpdatesModal
        modalState={modal2State}
        setModalState={setModal2State}
        data={data}
      />
      {/* friend requests modal */}

      {/* modal for connections handling */}
      <ConnectionsModal
        userId={data.id}
        modalState={modalState}
        setModalState={setModalState}
      />
      {/* modal for connections handling */}

      {/* pitchesModal */}
      <PitchesModal
        // userId={data.id}
        modalState={pitchesModalState}
        setModalState={setPitchesModalState}
      />
      {/* pitchesModal */}

      {/* contactsModal */}
      <ContactsModal
        phone={data.phone}
        phoneVerified={data.phoneVerified}
        modalState={contactsModalState}
        setModalState={setContactsModalState}
      />
      {/* contactsModal */}
    </>
  );
};

export default Left;

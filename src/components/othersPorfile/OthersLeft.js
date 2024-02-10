"use client";

import Image from "next/image";
import useInterval from "use-interval";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useClipboard } from "use-clipboard-copy";

import TextMain from "../..//shared/Text/TextMain ";
import TextSecondary from "../..//shared/Text/TextSecondary";
import { ButtonGhost } from "../..//shared/ui/Button";
import Card from "../..//shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

import LocationIcon from "../../shared/icons/LocationIcon";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import { sendFriendRequest } from "../../server/actions/connections/sendFriendRequest";
import { cancelFriendRequest } from "../../server/actions/connections/cancelFriendRequest";
import { checkIfRequestSent } from "../../server/actions/connections/checkIfRequestSent";
import { checkIfFriend } from "../../server/actions/connections/checkIfFriend";
import { removeConnection } from "../../server/actions/connections/removeConnection";
import { checkIfOtherSentRequest } from "../../server/actions/connections/checkIfOtherSentRequest";
import { addConnection } from "../../server/actions/connections/addConnection";
import CustomLoader from "../../shared/ui/CustomLoader";
import useWindowDimensions from "../../components/Profile/useWindowDimensions";
import { chechIfChatExist } from "../../server/actions/messenger/chechIfChatExist";
import ConnectionsModal from "../../components/Profile/ConnectionsModal";
import OthersContactsModal from "./OthersContactsModal";
import SubscrModal from "../../components/Profile/SubscrModal";
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import { getOtherProfileWithTimer } from "../../server/actions/profileTimer/getOtherProfileWithTimer";
import NoPitchesModal from "../../components/messenger/NoPitchesModal";

import AddFriendIcon from "../../shared/icons/AddFriendIcon";
import ClockIcon from "../../shared/icons/ClockIcon";
import MessengeIcon from "../../shared/icons/MessengeIcon";
import CrossIcon from "../../shared/icons/CrossIcon";
import CheckIcon from "../../shared/icons/CheckIcon";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import ContactsIcon from "../../shared/icons/ContactsIcon";
import PitchesModalOthers from "./PitchesModalOthers";
import Helper from "../../shared/ui/Helper";
import CopyIcon from "../../shared/icons/CopyIcon";
import CardOpacity from "../../shared/ui/CardOpacity";

const OthersLeft = ({
  navState,
  isFirstTime,
  data,
  ifChatExist,
  pitchesFirst,
  superPitchesFirst,
  refElement = null,
  opacity = false,
  trigger = false,
}) => {
  const router = useRouter();

  const getNoun2 = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5 || dig > 999) return "Связей";
    if (dig % 10 > 1 && dig % 10 < 5) return "Связи";
    else return "Связь";
  };
  const getNoun3 = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5 || dig > 999) return "Подписок";
    if (dig % 10 > 1 && dig % 10 < 5) return "Подписки";
    else return "Подписка";
  };

  console.log(data, "other profile");

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [modalState, setModalState] = useState(false);
  const [pitchmodalState, setPitchmodalState] = useState(false);
  const [modal3State, setModal3State] = useState(false);
  const [contactsModalState, setContactsModalState] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);
  const [friendStatus, setFriendStatus] = useState(false);
  const [ifHeSentRequest, setIfHeSentRequest] = useState(false);
  const [modalExplain, setModalExplain] = useState(false);
  const [loading, setloading] = useState(true);

  const allChecks = async () => {
    const dataTimer = await getOtherProfileWithTimer({ userId: data.id });
    console.log(dataTimer, ifChatExist, "data timer");
    setRequestStatus(dataTimer.requestStatus);
    setFriendStatus(dataTimer.friendStatus);
    setIfHeSentRequest(dataTimer.ifHeSentRequest);
    setloading(false);
  };
  const clipboard = useClipboard();

  useEffect(() => {
    setloading(true);
    allChecks();
  }, []);

  useEffect(() => {
    router.refresh();
  }, [friendStatus]);

  // here we are getting pitches count
  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5) return "питчей";
    if (dig % 10 > 1 && dig % 10 < 5) return "питча";
    else return "питч";
  };

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

  const [pitchesState, setPitchesState] = useState(null);
  const [superpitchesState, setSuperPitchesState] = useState(null);

  const getPitchesCountHanler = async () => {
    setPitchesState(await getPitchesCount());
    setSuperPitchesState(await getPitchesCount("superpitch"));
  };

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      allChecks();
      getPitchesCountHanler();
    },
    isRunning ? delay : null
  );

  // here we are getting pitches count

  return (
    <>
      <motion.div
        className={`${
          navState == true
            ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
            : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
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
          style={`[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[12px] ${
            data.role.includes("hr") && "mb-[8px]"
          }`}
          padding={12}
        >
          <div className="rounded-[8px] overflow-hidden  aspect-square [@media(pointer:coarse)]:w-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]">
            {data?.image ? (
              <Image
                src={data?.image}
                alt="Profile photo"
                className="object-cover [@media(hover)]:min-w-[236px] [@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(hover)]:min-h-[236px]  [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
                width={236}
                height={236}
                quality={100}
                unoptimized
                priority={true}
              />
            ) : (
              <EmptyAvatar />
            )}
          </div>

          <div className="flex flex-col">
            {/* name and username */}
            <div className="flex flex-col gap-[8px]">
              <Helper
                text={
                  data?.isFirstCircle?.length > 0
                    ? "Твои друзья"
                    : data?.isSecondCircle?.find((i2) => i2 === true)
                    ? "Друзья через одно рукопожатие"
                    : data?.isThirdCircle?.length > 0
                    ? "Друзья через два рукопожатия"
                    : "Друзья через три и более рукопожатия"
                }
              >
                <TextMain
                  text={`${data.name}${
                    data.lastname ? " " + data.lastname : ""
                  }${
                    data?.isFirstCircle?.length > 0
                      ? " • 1"
                      : data?.isSecondCircle?.find((i2) => i2 === true)
                      ? " • 2"
                      : data?.isThirdCircle?.length > 0
                      ? " • 3"
                      : " • 3+"
                  }`}
                  style="font-medium text-[18px] leading-[21.6px] tracking-[-0.025em]"
                />
              </Helper>
              <Helper text="Скопировать ссылку на профиль" styled="">
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
                      "https://practica.team/profile/" + data.username
                    );
                  }}
                >
                  <TextSecondary
                    text={`@${data.username}`}
                    style="font-medium text-[16px] leading-[20px] cursor-pointer tracking-[-0.24px]"
                  />

                  <CopyIcon />
                </div>
              </Helper>
            </div>
            {/* name and username */}

            {/* location and birth date */}
            <div className="flex flex-col">
              {data?.city === null || data?.city?.length === 0 ? null : (
                <div className="flex flex-row gap-[8px] mt-[12px]">
                  <LocationIcon />
                  <TextSecondary
                    text={data?.city}
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              )}

              {data?.birthDate && (
                <div className="flex flex-row mt-[12px] gap-[8px]">
                  <CalendarIcon />
                  <TextSecondary
                    text={data?.birthDate}
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              )}
            </div>
            {/* location and birth date */}

            {/* views and connections */}
            <div className="flex flex-col gap-[8px] mt-[12px]">
              <div
                className="flex flex-row gap-[4px] cursor-pointer"
                onClick={() => setModalState(true)}
              >
                <TextMain
                  text={abbreviateNumber(data?.connections)}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text={getNoun2(data?.connections)}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
              <div
                className="flex flex-row gap-[4px] cursor-pointer"
                onClick={() => {
                  setModal3State(true);
                }}
              >
                <TextMain
                  text={abbreviateNumber(data?.companiesIFollow)}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
                <TextSecondary
                  text={getNoun3(data?.companiesIFollow)}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
              {/* <div className="flex flex-row gap-[4px]">
              <TextMain
                text={data.views}
                style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
              />
              <TextSecondary
                text="Просмотров"
                style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
              />
            </div> */}
            </div>
            {/* views and connections */}
          </div>
        </Card>

        {/* hr */}
        {data.role.includes("hr") && (
          <>
            {data?.hrCompany?.map((i, key) => (
              <CardOpacity
                styled={`w-full h-[52px] gap-[8px] justify-start items-center cursor-pointer ${
                  key === data?.hrCompany?.length - 1 && "mb-[8px]"
                }`}
                rounded={20}
                onClick={() =>
                  router.push(`/companyprofile/${i?.company?.username}`)
                }
              >
                <div className="rounded-full overflow-hidden aspect-square w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
                  {i.image ? (
                    <Image
                      src={i?.company?.image}
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
                <p className="font-medium leading-[20px] text-[16px] tracking-[-0.015em] text-[#5875e8] select-none cursor-pointer group-hover:text-[#3A56C5] group-active:text-[#2C429C] transition duration-[250ms]">
                  {i?.company?.name}
                </p>
              </CardOpacity>
            ))}
          </>
        )}
        {/* hr */}

        {/* contacts */}
        {data?.phone && data?.phoneVerified && data?.inSearch && (
          <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
            <ButtonGhost
              text="Контактные данные"
              onClick={() => setContactsModalState(true)}
            >
              <ContactsIcon
                style={
                  "stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
                }
              />
            </ButtonGhost>
          </div>
        )}
        {/* contacts */}

        {/* ёбка с питчами */}
        {data?.isFirstCircle?.length > 0 ? (
          <Card
            style={`max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px] ${
              "" // loading && "items-center"
            }`}
            padding={12}
          >
            {/* {loading && (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            )} */}
            {!ifChatExist?.id && (
              <ButtonGhost
                text="Отправить сообщение"
                onClick={() => {
                  router.push(`/messenger/preview?user_id=${data.id}`);
                }}
              >
                <MessengeIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
            {ifChatExist?.id && (
              <ButtonGhost
                text="Отправить сообщение"
                onClick={() => router.push(`/messenger/${ifChatExist?.id}`)}
              >
                <MessengeIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
          </Card>
        ) : data?.isSecondCircle?.find((i2) => i2 === true) ? (
          <div
            className={`${
              "" // pitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {/* {pitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              /> */}
            {/* ) : ( */}
            <ButtonGhost
              text={
                pitchesState === null
                  ? pitchesFirst + " " + getNoun(pitchesFirst)
                  : pitchesState + " " + getNoun(pitchesState)
              }
              onClick={async () => {
                if (pitchesFirst === 0 || pitchesState === 0) {
                  setModalExplain(true);
                  return;
                }
                if (isFirstTime === true) {
                  setPitchmodalState(true);
                } else
                  router.push(
                    !ifChatExist.id
                      ? `/messenger/preview?user_id=${data?.id}`
                      : `/messenger/${ifChatExist?.id}`
                  );
              }}
            >
              <PitchIcon />
            </ButtonGhost>
            {/* )} */}
          </div>
        ) : data?.isThirdCircle?.length > 0 ? (
          <div
            className={`${
              "" // superpitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {/* {superpitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : ( */}
            <ButtonGhost
              text={
                superpitchesState === null
                  ? superPitchesFirst + " супер" + getNoun(superPitchesFirst)
                  : superpitchesState + " супер" + getNoun(superpitchesState)
              }
              onClick={async () => {
                if (superPitchesFirst === 0 || superpitchesState === 0) {
                  setModalExplain(true);
                  return;
                }

                if (isFirstTime === true) {
                  setPitchmodalState(true);
                } else
                  router.push(
                    !ifChatExist.id
                      ? `/messenger/preview?user_id=${data?.id}`
                      : `/messenger/${ifChatExist?.id}`
                  );
              }}
            >
              <SuperpitchIcon />
            </ButtonGhost>
            {/* )} */}
          </div>
        ) : (
          <div
            className={`${
              "" // superpitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {/* {superpitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : ( */}
            <ButtonGhost
              text={
                superpitchesState === null
                  ? superPitchesFirst + " супер" + getNoun(superPitchesFirst)
                  : superpitchesState + " супер" + getNoun(superpitchesState)
              }
              onClick={async () => {
                if (superPitchesFirst === 0 || superpitchesState === 0) {
                  setModalExplain(true);
                  return;
                }

                if (isFirstTime === true) {
                  setPitchmodalState(true);
                } else
                  router.push(
                    !ifChatExist.id
                      ? `/messenger/preview?user_id=${data?.id}`
                      : `/messenger/${ifChatExist?.id}`
                  );
              }}
            >
              <SuperpitchIcon />
            </ButtonGhost>
            {/* )} */}
          </div>
        )}

        {/* тут кнопки все, которые будут, можешь потестить */}
        {(ifChatExist?.id || data?.isFirstCircle?.length > 0) && (
          <Card
            style={`max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px] ${
              loading && "items-center"
            }`}
            padding={12}
          >
            {loading && (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            )}
            {friendStatus && !ifHeSentRequest && !requestStatus && !loading && (
              <ButtonGhost
                text="Удалить из друзей"
                onClick={async () => {
                  await removeConnection(data.id);
                  router.refresh();

                  toast(`🚫 Пользователь удалён из друзей`, {
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
            {requestStatus && !loading && !ifHeSentRequest && !friendStatus && (
              <ButtonGhost
                text="Заявка на рассмотрении"
                onClick={async () => {
                  await cancelFriendRequest(data?.id);
                  toast(`🙅 Заявка в друзья отменена`, {
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
                  // setRequestStatus(false);
                }}
              >
                <ClockIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
            {!requestStatus &&
              !friendStatus &&
              !loading &&
              !ifHeSentRequest && (
                <ButtonGhost
                  text="Подружиться"
                  onClick={async () => {
                    await sendFriendRequest(data?.id);
                    // setRequestStatus(true);
                    toast(`🌐 Заявка в друзья отправлена`, {
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
                  <AddFriendIcon fill={"#5875e8"} />
                </ButtonGhost>
              )}
            {ifHeSentRequest && !loading && !requestStatus && !friendStatus && (
              <ButtonGhost
                text="Принять заявку"
                onClick={async () => {
                  await addConnection(data?.id);
                  // setIfHeSentRequest(false);
                  router.refresh();
                  toast(`🤝 Заявка принята`, {
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
                <CheckIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
          </Card>
        )}
        {/* тут кнопки все, которые будут, можешь потестить */}
      </motion.div>

      {/* pitches modal other */}
      <PitchesModalOthers
        type={
          data?.isSecondCircle?.find((i2) => i2 === true)
            ? "pitch"
            : data?.isThirdCircle?.length > 0
            ? "superpitch"
            : "superpitch"
        }
        modalState={pitchmodalState}
        setModalState={() => setPitchmodalState(false)}
        onClick={() => {
          router.push(
            !ifChatExist.id
              ? `/messenger/preview?user_id=${data?.id}`
              : `/messenger/${ifChatExist?.id}`
          );
        }}
      />
      {/* pitches modal other */}

      {/* modal for connections handling */}
      <ConnectionsModal
        userId={data?.id}
        modalState={modalState}
        setModalState={setModalState}
      />
      {/* modal for connections handling */}

      {/* contactsModal */}
      <OthersContactsModal
        name={data?.username}
        phone={data?.phone}
        modalState={contactsModalState}
        setModalState={setContactsModalState}
      />
      {/* contactsModal */}

      {/* subscr modal */}
      <SubscrModal
        userId={data?.id}
        modalState={modal3State}
        setModalState={setModal3State}
      />
      {/* subscr modal */}

      {/* no ptches modal */}
      <NoPitchesModal
        modalState={modalExplain}
        setModalState={setModalExplain}
      />
      {/* no ptches modal */}
    </>
  );
};

export default OthersLeft;

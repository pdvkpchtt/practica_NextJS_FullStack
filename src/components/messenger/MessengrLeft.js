"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useRouter } from "next/navigation";

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
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";

import AddFriendIcon from "../../shared/icons/AddFriendIcon";
import ClockIcon from "../../shared/icons/ClockIcon";
import MessengeIcon from "../../shared/icons/MessengeIcon";
import CrossIcon from "../../shared/icons/CrossIcon";
import CheckIcon from "../../shared/icons/CheckIcon";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";

const MessengrLeft = ({ navState, data }) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [requestStatus, setRequestStatus] = useState(false);
  const [friendStatus, setFriendStatus] = useState(false);
  const [ifHeSentRequest, setIfHeSentRequest] = useState(false);
  const [ifChatExist, setIfChatExist] = useState({ id: undefined });
  const [loading, setloading] = useState(true);

  const allChecks = async () => {
    setloading(true);
    setRequestStatus(await checkIfRequestSent(data.id));
    setFriendStatus(await checkIfFriend(data.id));
    setIfHeSentRequest(await checkIfOtherSentRequest(data.id));
    setIfChatExist(await chechIfChatExist(data.id));
    setloading(false);
  };

  useEffect(() => {
    allChecks();
  }, []);

  const location = [data.city, data.contry];

  // here we are getting pitches count
  const getNoun = (dig) => {
    if (dig === 0 || dig >= 5) return "питчей";
    if (dig > 1 && dig < 5) return "питча";
    else return "питч";
  };

  const [pitchesState, setPitchesState] = useState(null);
  const [superpitchesState, setSuperPitchesState] = useState(null);

  const getPitchesCountHanler = async () => {
    setPitchesState(await getPitchesCount());
    setSuperPitchesState(await getPitchesCount("superpitch"));
  };

  useEffect(() => {
    getPitchesCountHanler();
  }, []);
  // here we are getting pitches count

  return (
    <>
      <div
        className={`${"[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"}
 
transition duration-[250ms] [@media(hover)]:mt-[63px] [@media(hover)]:max-w-[260px]`}
      >
        <Card
          style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="rounded-[8px] overflow-hidden [@media(pointer:coarse)]:w-full [@media(hover)]:w-[236px]">
            {data.image ? (
              <Image
                src={data.image}
                alt="Profile photo"
                className="[@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
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
                text={`${data.name}${
                  data.isFirstCircle
                    ? " • 1-ый"
                    : data.isSecondCircle.find((i2) => i2 === true)
                    ? " • 2-ой"
                    : data.isThirdCircle
                    ? " • 3-ий"
                    : " • 3+"
                }`}
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
              {(location[0] != null || location[1] != null) &&
              (location[0] != undefined || location[1] != undefined) ? (
                <div className="flex flex-row gap-[8px] mt-[12px]">
                  <LocationIcon />
                  <TextSecondary
                    text={
                      data.city != null && data.contry != null
                        ? location.join(", ")
                        : location
                    }
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              ) : null}

              {data.birthDate && (
                <div className="flex flex-row mt-[12px] gap-[8px]">
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
            <div className="flex flex-col gap-[8px] mt-[12px]">
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
        {data.role === "hr" && (
          <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
            <ButtonGhost
              text={data.hrCompany.company.name}
              onClick={() =>
                router.push(
                  `/companyprofile/${
                    data.hrCompany.company.username.length > 0
                      ? data.hrCompany.company.username
                      : data.hrCompany.company.id
                  }`
                )
              }
            >
              <div className="rounded-full overflow-hidden w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
                {data.hrCompany.company.image ? (
                  <Image
                    src={data.hrCompany.company.image}
                    alt="hr company photo"
                    className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]"
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

        {/* ёбка с питчами */}
        {data.isFirstCircle ? (
          <></>
        ) : data.isSecondCircle.find((i2) => i2 === true) ? (
          <div
            className={`${
              pitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {pitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <ButtonGhost text={pitchesState + " " + getNoun(pitchesState)}>
                <PitchIcon />
              </ButtonGhost>
            )}
          </div>
        ) : data.isThirdCircle ? (
          <div
            className={`${
              superpitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {superpitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <ButtonGhost
                text={superpitchesState + " супер" + getNoun(superpitchesState)}
              >
                <SuperpitchIcon />
              </ButtonGhost>
            )}
          </div>
        ) : (
          <div
            className={`${
              superpitchesState === null && "justify-center"
            } p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
          >
            {superpitchesState === null ? (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <ButtonGhost
                text={superpitchesState + " супер" + getNoun(superpitchesState)}
              >
                <SuperpitchIcon />
              </ButtonGhost>
            )}
          </div>
        )}

        {/* тут кнопки все, которые будут, можешь потестить */}
        {(ifChatExist.id || data.isFirstCircle) && (
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
                  setFriendStatus(false);
                  toast(`🦄 Пользователь удалён из друзей`, {
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
            {requestStatus && !loading && !ifHeSentRequest && !friendStatus && (
              <ButtonGhost
                text="Заявка на рассмотрении"
                onClick={async () => {
                  await cancelFriendRequest(data.id);
                  toast(`🦄 Заявка в друзья отменена`, {
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
                  setRequestStatus(false);
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
                    await sendFriendRequest(data.id);
                    setRequestStatus(true);
                    toast(`🦄 Заявка в друзья отправлена`, {
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
                  <AddFriendIcon fill={"#5875e8"} />
                </ButtonGhost>
              )}
            {ifHeSentRequest && !loading && !requestStatus && !friendStatus && (
              <ButtonGhost
                text="Принять заявку"
                onClick={async () => {
                  await addConnection(data.id);
                  setIfHeSentRequest(false);
                  setFriendStatus(true);
                  toast(`🦄 Заявка принята`, {
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
                <CheckIcon fill={"#5875e8"} />
              </ButtonGhost>
            )}
          </Card>
        )}
        {/* тут кнопки все, которые будут, можешь потестить */}
      </div>
    </>
  );
};

export default MessengrLeft;

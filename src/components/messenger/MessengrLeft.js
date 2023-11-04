"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { getProfileByChatId } from "../../server/actions/messenger/getProfileByChatId";
import { MessengerContext } from "./MessengerContextWrap";
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";

import AddFriendIcon from "../../shared/icons/AddFriendIcon";
import ClockIcon from "../../shared/icons/ClockIcon";
import MessengeIcon from "../../shared/icons/MessengeIcon";
import CrossIcon from "../../shared/icons/CrossIcon";
import CheckIcon from "../../shared/icons/CheckIcon";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";

const MessengrLeft = ({ navState, chatId, user_id }) => {
  const router = useRouter();

  const {
    pitchesState,
    superpitchesState,
    getUserChatsWithTimer,
    returnPremSender,
  } = useContext(MessengerContext);

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [requestStatus, setRequestStatus] = useState(false);
  const [friendStatus, setFriendStatus] = useState(false);
  const [ifHeSentRequest, setIfHeSentRequest] = useState(false);
  const [ifChatExist, setIfChatExist] = useState({ id: undefined });
  const [loading2, setloading2] = useState(null);

  const allChecks = async () => {
    await getUserInfoHandler();
    setloading2(true);
    if (profileData !== null) {
      await returnPremSender(profileData.id);
      setRequestStatus(await checkIfRequestSent(profileData.id));
      setFriendStatus(await checkIfFriend(profileData.id));
      setIfHeSentRequest(await checkIfOtherSentRequest(profileData.id));
      setIfChatExist(await chechIfChatExist(profileData.id));
      console.log("fuck u");
    }
    setloading2(false);
  };
  const [profileData, setProfileData] = useState(null);

  const getUserInfoHandler = async () => {
    setProfileData(await getProfileByChatId(user_id, chatId));
  };

  useEffect(() => {
    allChecks();
  }, [getUserChatsWithTimer]);

  // here we are getting pitches count
  const getNoun = (dig) => {
    if (dig === 0 || dig >= 5) return "питчей";
    if (dig > 1 && dig < 5) return "питча";
    else return "питч";
  };
  // here we are getting pitches count

  if (profileData === null) {
    return (
      <div className="w-[260px] flex items-center justify-center [@media(pointer:coarse)]:hidden">
        <CustomLoader diameter={28} strokeWidth={6} strokeWidthSecondary={6} />
      </div>
    );
  }

  const location = [profileData.city, profileData.contry];
  return (
    <>
      <div
        className={`${"[@media(hover)]:flex [@media(pointer:coarse)]:hidden ml-[728px] fixed flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"}
 
transition duration-[250ms] [@media(hover)]:mt-[63px] [@media(hover)]:w-[260px]`}
      >
        <Card
          style="[@media(hover)]:w-[260px] flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="rounded-[8px] overflow-hidden [@media(pointer:coarse)]:w-full [@media(hover)]:w-[236px]">
            {profileData.image ? (
              <Image
                src={profileData.image}
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
                text={`${profileData.name}${
                  profileData.isFirstCircle
                    ? " • 1-ый"
                    : profileData.isSecondCircle.find((i2) => i2 === true)
                    ? " • 2-ой"
                    : profileData.isThirdCircle
                    ? " • 3-ий"
                    : " • 3+"
                }`}
                style="font-medium cursor-pointer text-[18px] leading-[21.6px] tracking-[-0.025em]"
                onClick={() => router.push(`/profile/${profileData.username}`)}
              />
              <TextSecondary
                text={`@${profileData.username}`}
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
                      profileData.city != null && profileData.contry != null
                        ? location.join(", ")
                        : location
                    }
                    style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                  />
                </div>
              ) : null}

              {profileData.birthDate && (
                <div className="flex flex-row mt-[12px] gap-[8px]">
                  <CalendarIcon />
                  <TextSecondary
                    text={profileData.birthDate}
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
                  text={profileData.connections}
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
        {profileData.role === "hr" && (
          <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
            <ButtonGhost
              text={profileData.hrCompany.company.name}
              onClick={() =>
                router.push(
                  `/companyprofile/${
                    profileData.hrCompany.company.username.length > 0
                      ? profileData.hrCompany.company.username
                      : profileData.hrCompany.company.id
                  }`
                )
              }
            >
              <div className="rounded-full overflow-hidden w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
                {profileData.hrCompany.company.image ? (
                  <Image
                    src={profileData.hrCompany.company.image}
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
        {profileData.isFirstCircle ? (
          <></>
        ) : profileData.isSecondCircle.find((i2) => i2 === true) ? (
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
        ) : profileData.isThirdCircle ? (
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
        {(ifChatExist.id || profileData.isFirstCircle) && (
          <Card
            style={`max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px] ${
              loading2 === null && "items-center"
            }`}
            padding={12}
          >
            {loading2 === null && (
              <CustomLoader
                diameter={28}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            )}
            {friendStatus &&
              !ifHeSentRequest &&
              !requestStatus &&
              loading2 !== null && (
                <ButtonGhost
                  text="Удалить из друзей"
                  onClick={async () => {
                    await removeConnection(profileData.id);
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
                    router.refresh();
                  }}
                >
                  <CrossIcon size={20} fill={"#5875e8"} hard={false} soft />
                </ButtonGhost>
              )}
            {requestStatus &&
              loading2 !== null &&
              !ifHeSentRequest &&
              !friendStatus && (
                <ButtonGhost
                  text="Заявка на рассмотрении"
                  onClick={async () => {
                    await cancelFriendRequest(profileData.id);
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
              loading2 !== null &&
              !ifHeSentRequest && (
                <ButtonGhost
                  text="Подружиться"
                  onClick={async () => {
                    await sendFriendRequest(profileData.id);
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
                    // router.refresh();
                  }}
                >
                  <AddFriendIcon fill={"#5875e8"} />
                </ButtonGhost>
              )}
            {ifHeSentRequest &&
              loading2 !== null &&
              !requestStatus &&
              !friendStatus && (
                <ButtonGhost
                  text="Принять заявку"
                  onClick={async () => {
                    await addConnection(profileData.id);
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
                    router.refresh();
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

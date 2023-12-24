"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Waypoint } from "react-waypoint";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  months: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
});

import TextSecondary from "../../shared/Text/TextSecondary";
import { OneIconButton, SendButton } from "../../shared/ui/Button";
import MessageItem from "./MessageItem";
import CustomLoader from "../../shared/ui/CustomLoader";
import { MessengerSearchInput } from "../../shared/ui/Input";
import sendMessage from "../../server/actions/messenger/sendMessage";
import SendIcon from "../../shared/icons/SendIcon";
import { fetchMessages } from "../../server/actions/messenger/fetchMessages";
import { createChat } from "../../server/actions/messenger/createChat";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import TextMain from "../../shared/Text/TextMain ";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import { MesContext } from "./MesContextWrap";
import useInterval from "use-interval";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import ReplyItem from "./ReplyItem";
import BigLogoSvg from "../../shared/icons/BigLogoSvg";
import NoPitchesModal from "./NoPitchesModal";
import CardOpacity from "../../shared/ui/CardOpacity";
import ConfirmReplyIcon from "../../shared/icons/ConfirmReplyIcon";
import DeclineReplyIcon from "../../shared/icons/DeclineReplyIcon";
import { changeReplyStatus } from "server/actions/messenger/changeReplyStatus";

const ChatsPanel = ({ chatId, user_id, profileData, setTimer, timer }) => {
  // const { currentChatCursor, setCurrentChatCursor } = useContext(MesContext);

  const pathname = usePathname();
  const router = useRouter();
  const [currentChatCursor, setCurrentChatCursor] = useState("");

  const [input, setInput] = useState(""); // Messages
  const [wait, setWait] = useState(false); // Messages
  const [searchInput, setSearchInput] = useState(""); // Messages
  const [hasNextPageMessages, setHasNextPageMessages] = useState(true);
  const [dataStateMessages, setDataStateMessages] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [lastDateMessages, setLastDateMessages] = useState("");
  const [circle, setCircle] = useState(null);
  const [currentVacReply, setCurrentVacReply] = useState(null);
  const [noModal, setNoModal] = useState(false);

  // -------------- messages
  const getMessages = async () => {
    console.log("fetching");
    // if (loadingMessages) return;
    setLoadingMessages(true);
    const data = await fetchMessages(
      chatId,
      currentChatCursor,
      searchInput,
      false,
      user_id
    );
    console.log("client messages", data);
    setCurrentVacReply(data?.checkVacReply);
    if (currentChatCursor?.length) {
      setDataStateMessages([...dataStateMessages, ...data.data]);
    } else {
      setDataStateMessages(data.data);
    }
    if (!data.check && !data.checkVacReply) {
      setCircle(data.circle);
      setTimer(null);
    } else {
      setCircle("");
      if (data?.check?.id)
        setTimer({ time: data?.check?.createdAt, multiply: 3 });
      if (data?.checkVacReply?.id)
        setTimer({ time: data?.checkVacReply?.createdAt, multiply: 5 });
    }
    console.log(data, "fucking slave");
    setCurrentChatCursor(data.cursor);
    setHasNextPageMessages(data.hasNextPage);
    setLastDateMessages(data.lastDate);
    setLoadingMessages(false);
  };

  // with timer
  const getUserMessengerWithTimer = async () => {
    console.log("timer messages");
    if (loadingMessages) return;

    console.log(lastDateMessages);
    const data = await fetchMessages(
      chatId,
      lastDateMessages,
      searchInput,
      true,
      user_id
    );
    setCurrentVacReply(data?.checkVacReply);
    if (!data.check && !data.checkVacReply) {
      setCircle(data.circle);
      setTimer(null);
    } else {
      setCircle("");
      if (data?.check?.id) {
        setTimer({ time: data?.check?.createdAt, multiply: 3 });
      }
      if (data?.checkVacReply?.id) {
        setTimer({ time: data?.checkVacReply?.createdAt, multiply: 5 });
      }
    }
    console.log(circle, "fucking slave");
    console.log("messenges update", data);
    if (loadingMessages) return;
    setDataStateMessages(data?.data);

    // setCursorMessages(data?.cursorMessages);
    // setHasNextPageMessages(data?.hasNextPageMessages);
  };
  // -------------- messages

  const sendMsg = async () => {
    let res = null;
    if (input.length !== 0 && !wait) {
      setWait(true);
      console.log(input);
      res = await sendMessage(input, chatId);
      setInput("");
      setCurrentChatCursor("");
      // await getMessages("");
      setWait(false);
    }

    return res;
  };

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      getUserMessengerWithTimer();
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    getMessages();
  }, []);

  if (chatId === undefined || chatId === null)
    return (
      <div className="[@media(hover)]:absolute [@media(pointer:coarse)]:max-w-[500px] [@media(pointer:coarse)]:mx-auto top-[50%] z-[203] [@media(hover)]:mt-[-27px] [@media(pointer:coarse)]:mt-[50%] [@media(hover)]:left-[calc(50%-24px)] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:flex [@media(pointer:coarse)]:justify-center">
        <CustomLoader />
      </div>
    );

  return (
    <div className="[@media(hover)]:mt-[62px] [@media(hover)]:w-[436px] w-full [@media(pointer:coarse)]:mb-[-80px]">
      {/* pc header */}
      <div className="w-full px-[12px] py-[12px] [@media(pointer:coarse)]:hidden [@media(hover)]:rounded-t-[20px] z-10 bg-white border-b-[0.7px] border-b-[#e7e7e7] dark:border-b-[#282828] dark:bg-[#212122]">
        <MessengerSearchInput
          placeholder="Поиск по чату"
          value={searchInput}
          onChange={(val) => setSearchInput(val)}
          showCross={searchInput.length != 0}
        />
      </div>
      {/* pc header */}
      {/* mobile header */}
      <div
        className="w-full p-[10px] [@media(hover)]:hidden
        [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:left-0
        rounded-t-[20px] [@media(pointer:coarse)]:rounded-[0px] z-10 flex justify-center
        bg-white dark:bg-[#212122]
        border-b-[0.7px] border-b-[#e7e7e7] dark:border-b-[#2f2f2f]
        "
      >
        <div className="items-center flex flex-row w-full max-w-[468px] max-auto">
          <OneIconButton
            onClick={() => router.push("/messenger")}
            style="mr-[16px]"
          >
            <ArrowLeftIcon />
          </OneIconButton>
          {profileData === null ? (
            <div className="absolute left-0 flex items-center justify-center w-full">
              <CustomLoader
                diameter={22}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col ml-[-4px] gap-[2px] w-full items-center truncate">
                <TextMain
                  text={`${profileData.name}${
                    profileData?.lastname ? " " + profileData?.lastname : ""
                  }${
                    profileData.isFirstCircle
                      ? " • 1"
                      : profileData.isSecondCircle.find((i2) => i2 === true)
                      ? " • 2"
                      : profileData.isThirdCircle
                      ? " • 3"
                      : " • 3+"
                  }`} //////////////////
                  style="font-medium text-center text-[18px] leading-[21.6px] tracking-[-0.015em] w-full overflow-hidden whitespace-nowrap truncate"
                  onClick={() => router.push(`/proile/${profileData.username}`)}
                />
                {/* <TextSecondary
              text="онлайн"
              style="font-medium text-[11px] leading-[12px] tracking-[-0.027em]"
            /> */}
              </div>

              <div className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] aspect-square rounded-full overflow-hidden ml-[16px]">
                {profileData?.image ? (
                  <Image
                    src={profileData?.image}
                    alt="Profile photo"
                    className="object-cover min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
                    width={236}
                    height={236}
                    quality={100}
                    priority={true}
                  />
                ) : (
                  <EmptyAvatar thirty />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* mobile header */}

      {/* body */}
      <div className="overflow-y-auto flex flex-col-reverse relative [@media(pointer:coarse)]:h-full hideScrollbarNavMobile h-full [@media(hover)]:h-[calc(100%-67px)] pt-[6px] pb-[8px] px-[8px] bg-white dark:bg-[#212122]">
        {!dataStateMessages ? (
          <div className="w-full flex justify-center items-center h-full">
            <CustomLoader diameter={36} />
          </div>
        ) : dataStateMessages?.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[234px]">
              <TextSecondary
                text={
                  pathname.includes("/preview")
                    ? circle === "pitch"
                      ? "Отправляя питч незнакомцу, постарайтесь написать локанично и кратко"
                      : circle === "superpitch"
                      ? "Отправляя суперпитч незнакомцу, постарайтесь написать локанично и кратко"
                      : "Здесь пока ничего нет"
                    : "Нет сообщений"
                }
                style={
                  "h-full text-center w-full leading-[19px] text-[16px] font-medium tracking-[-0.24px] flex justify-center items-center select-none"
                }
              />
            </div>
          </div>
        ) : (
          <>
            {/* {dataStateMessages?.length === 1 &&
              dataStateMessages[dataStateMessages.length - 1].type === "superpitch" &&
              dataStateMessages[dataStateMessages.length - 1].myMessage && <BigLogoSvg />} */}
            {dataStateMessages.map((item, key, messages) => (
              <>
                {key > 0 &&
                !dayjs(item.createdAt).isSame(
                  dayjs(messages[key - 1].createdAt),
                  "day"
                ) ? (
                  <TextSecondary
                    text={dayjs(messages[key - 1].createdAt).calendar(dayjs(), {
                      sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
                      nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
                      nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
                      lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
                      lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
                      sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
                    })}
                    style="flex items-center mt-[16px] mb-[14px] select-none justify-center"
                  />
                ) : null}
                <>
                  {item.type.includes("vacancyReply") ? (
                    <ReplyItem
                      type={item.type}
                      lastMsg={dataStateMessages[0]}
                      item={item}
                      key={key}
                      style={`${
                        dataStateMessages[key + 1]?.myMessage
                          ? "mt-[2px]"
                          : "mt-[2px]"
                      }
                    `}
                    />
                  ) : (
                    <MessageItem
                      item={item}
                      key={key}
                      style={`${
                        dataStateMessages[key + 1]?.myMessage
                          ? "mt-[2px]"
                          : "mt-[2px]"
                      }
                    `}
                    />
                  )}

                  {/* логика первого сообщения */}
                  {/* отклик */}
                  {dataStateMessages?.length === 1 &&
                    dataStateMessages[0]?.vacancyReply && (
                      <div className="w-full items-center justify-center flex text-center flex-col gap-[8px]">
                        <BigLogoSvg style="fill-[#F6F6F8] dark:fill-[#141414]" />
                        <TextMain
                          text={
                            dataStateMessages[0]?.myMessage
                              ? "Вы откликнулись на вакансию"
                              : `@${dataStateMessages[0]?.user?.username} откликнулся на вакансию`
                          }
                          style="mt-[8px] select-none font-medium text-[20px] leading-[22px] tracking-[-0.4px]"
                        />
                        <p
                          onClick={() => {
                            console.log(
                              dataStateMessages[0]?.vacancyReply.vacancy?.id
                            );
                            router.push(
                              `/vacancy/${dataStateMessages[0]?.vacancyReply.vacancy?.id}`
                            );
                          }}
                          className="text-[#5875e8] mb-[42px]  hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] cursor-pointer text-[14px] font-medium leading-[18px] tracking-[-0.182px]"
                        >
                          {dataStateMessages[0]?.vacancyReply?.vacancy?.name}
                        </p>
                      </div>
                    )}
                  {/* суперпитч */}
                  {dataStateMessages?.length === 1 &&
                    dataStateMessages[0]?.type === "superpitch" && (
                      <div className="w-full items-center justify-center flex text-center flex-col gap-[8px]">
                        <BigLogoSvg />
                        <TextMain
                          text={
                            dataStateMessages[0]?.myMessage
                              ? "Вы отправили суперпитч"
                              : `Новый суперпитч`
                          }
                          style="mt-[8px] select-none font-medium text-[20px] leading-[22px] tracking-[-0.4px]"
                        />
                        <TextSecondary
                          style={
                            "mb-[42px] text-[16px] leading-[20px] select-none tracking-[-0.24px]"
                          }
                          text={
                            dataStateMessages[0]?.myMessage
                              ? "Теперь нужно немного подождать. Cобеседник ответит вам, если заинтересуется"
                              : `@${dataStateMessages[0]?.user?.username} отправил вам суперпитч. Можете ответить, если хотите дружить с этим человеком`
                          }
                        />
                      </div>
                    )}
                  {/* питч */}
                  {dataStateMessages?.length === 1 &&
                    dataStateMessages[0]?.type === "pitch" && (
                      <div className="w-full items-center justify-center flex text-center flex-col gap-[8px]">
                        <BigLogoSvg style="fill-[#F6F6F8] dark:fill-[#141414]" />
                        <TextMain
                          text={
                            dataStateMessages[0]?.myMessage
                              ? "Вы отправили питч"
                              : `Новый питч`
                          }
                          style="mt-[8px] select-none font-medium text-[20px] leading-[22px] tracking-[-0.4px]"
                        />
                        <TextSecondary
                          style={
                            "mb-[42px] text-[16px] leading-[20px] select-none tracking-[-0.24px]"
                          }
                          text={
                            dataStateMessages[0]?.myMessage
                              ? "Теперь нужно немного подождать. Cобеседник ответит вам, если заинтересуется"
                              : `@${dataStateMessages[0]?.user?.username} отправил вам питч. Можете ответить, если хотите дружить с этим человеком`
                          }
                        />
                      </div>
                    )}
                  {/* логика первого сообщения */}

                  {messages.length - 1 == key ? (
                    <TextSecondary
                      text={dayjs(item.createdAt).calendar(dayjs(), {
                        sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
                        nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
                        nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
                        lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
                        lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
                        sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
                      })}
                      style="flex items-center mt-[16px] mb-[14px] select-none justify-center"
                    />
                  ) : null}
                </>
              </>
            ))}
            {hasNextPageMessages ? (
              <Waypoint
                onEnter={async () => {
                  console.log("Enter waypoint");
                  await getMessages();
                }}
                topOffset="-50px"
              >
                <div className="w-full flex justify-center items-center h-full">
                  <CustomLoader diameter={36} />
                </div>
              </Waypoint>
            ) : null}
          </>
        )}
      </div>

      <div className="bg-white dark:bg-[#212122] fixed left-0 top-0 w-full h-full z-[-1] [@media(hover)]:hidden" />

      {/* pc input */}

      <>
        <div
          className={`pt-[11.3px] pb-[12px] p-[12px] flex flex-row gap-[8px] border-t-[0.7px] bg-white dark:bg-[#212122] [@media(pointer:coarse)]:hidden [@media(hover)]:rounded-b-[20px] ${"border-t-[#e7e7e7] dark:border-t-[#282828]"}`}
        >
          {dataStateMessages?.length > 0 &&
          dataStateMessages[0]?.type === "vacancyReply" ? (
            <HRsBottomButtons
              myMessage={dataStateMessages[0]?.myMessage}
              onLeftClick={async () => {
                await changeReplyStatus(
                  currentVacReply?.vacancyReply?.id,
                  "accepted"
                );
                await sendMessage(
                  "Ура! Вам назначили собеседование, успех в ваших руках.\n\nСвяжитесь с рекрутером в удобном мессенджере. Успешного собеседования. 🤝",
                  chatId,
                  true
                );
              }}
              onRightClick={async () => {
                await changeReplyStatus(
                  currentVacReply?.vacancyReply?.id,
                  "declined",
                  currentVacReply?.id
                );
                await sendMessage(
                  "Благодарим за уделенное время и интерес к вакансии. К сожалению, пока что мы не готовы взять вас в нашу компанию.",
                  chatId,
                  true
                );
              }}
            />
          ) : (
            <>
              <MessengerSearchInput
                searchIcon={false}
                placeholder="Сообщение..."
                value={input}
                onChange={(e) => {
                  setInput(e);
                }}
                onKeyDown={async (event) => {
                  if (event === "Enter" && input.length !== 0) {
                    if (pathname.includes("/messenger/preview")) {
                      setWait(true);
                      setInput("");
                      const chatId = await createChat(user_id, input);
                      console.log(chatId?.status);
                      if (chatId?.status === "error") {
                        setNoModal(true);
                        setWait(false);
                      } else {
                        router.push(`/messenger/${chatId}`);
                      }
                    } else {
                      const res = await sendMsg();
                      if (res?.status === "error") {
                        console.log(res?.status);
                        console.log(res, "fuck1");
                        setNoModal(true);
                      }
                    }
                  }
                }}
              />
              <SendButton
                onClick={async () => {
                  if (input.length !== 0) {
                    if (pathname.includes("/messenger/preview")) {
                      setWait(true);
                      setInput("");
                      const chatId = await createChat(user_id, input);
                      console.log(chatId?.status);
                      if (chatId?.status === "error") {
                        setNoModal(true);
                        setWait(false);
                      } else {
                        router.push(`/messenger/${chatId}`);
                      }
                    } else {
                      const res = await sendMsg();
                      console.log(res?.status);
                      if (res?.status === "error") setNoModal(true);
                    }
                  }
                }}
              >
                {wait || !dataStateMessages ? (
                  <Oval
                    height={20}
                    width={20}
                    color="rgba(255, 255, 255, 1)"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loadingMessages"
                    secondaryColor="rgba(255, 255, 255, 0.3)"
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                  />
                ) : circle === "pitch" ? (
                  <PitchIcon blue={false} white />
                ) : circle === "superpitch" ? (
                  <SuperpitchIcon blue={false} white />
                ) : (
                  <SendIcon />
                )}
              </SendButton>
            </>
          )}
        </div>
        {/* pc input */}
        {/* mobile input */}
        <div
          className="w-full p-[10px] [@media(hover)]:hidden
        [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:bottom-0 [@media(pointer:coarse)]:left-0
        rounded-t-[20px] [@media(pointer:coarse)]:rounded-[0px] z-10 flex justify-center
        bg-white dark:bg-[#212122]
        border-t-[0.7px] border-t-[#e7e7e7] dark:border-t-[#2f2f2f]
        "
        >
          <div className="items-center flex flex-row w-full gap-[8px] max-w-[468px] max-auto">
            {dataStateMessages?.length > 0 &&
            dataStateMessages[0]?.type === "vacancyReply" ? (
              <HRsBottomButtons myMessage={dataStateMessages[0]?.myMessage} />
            ) : (
              <>
                <MessengerSearchInput
                  searchIcon={false}
                  placeholder="Сообщение..."
                  value={input}
                  onChange={(e) => {
                    setInput(e);
                  }}
                  onKeyDown={async (event) => {
                    if (event === "Enter" && input.length !== 0) {
                      if (pathname.includes("/messenger/preview")) {
                        setWait(true);
                        setInput("");
                        const chatId = await createChat(user_id, input);
                        if (chatId?.status === "error") {
                          setNoModal(true);
                          setWait(false);
                        } else {
                          router.push(`/messenger/${chatId}`);
                        }
                      } else {
                        const res = await sendMsg();
                        if (res?.status === "error") setNoModal(true);
                      }
                    }
                  }}
                />
                <SendButton
                  onClick={async () => {
                    if (input.length !== 0) {
                      if (pathname.includes("/messenger/preview")) {
                        setWait(true);
                        setInput("");
                        const chatId = await createChat(user_id, input);
                        console.log(chatId?.status);
                        if (chatId?.status === "error") {
                          setNoModal(true);
                          setWait(false);
                        } else {
                          router.push(`/messenger/${chatId}`);
                        }
                      } else {
                        const res = await sendMsg();
                        if (res?.status === "error") setNoModal(true);
                      }
                    }
                  }}
                >
                  {wait || !dataStateMessages ? (
                    <Oval
                      height={20}
                      width={20}
                      color="rgba(255, 255, 255, 1)"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loadingMessages"
                      secondaryColor="rgba(255, 255, 255, 0.3)"
                      strokeWidth={5}
                      strokeWidthSecondary={5}
                    />
                  ) : circle === "pitch" ? (
                    <PitchIcon blue={false} white />
                  ) : circle === "superpitch" ? (
                    <SuperpitchIcon blue={false} white />
                  ) : (
                    <SendIcon />
                  )}
                </SendButton>
              </>
            )}
          </div>
        </div>
      </>

      <NoPitchesModal
        modalState={noModal}
        setModalState={setNoModal}
        type={circle}
      />
    </div>
  );
};

export default ChatsPanel;

const HRsBottomButtons = ({
  myMessage = false,
  onLeftClick = () => {},
  onRightClick = () => {},
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  if (myMessage === false)
    return (
      <>
        <CardOpacity
          styled="w-full gap-[8px] justify-center cursor-pointer"
          rounded={16}
          onClick={onLeftClick}
        >
          <ConfirmReplyIcon />
          <p className="text-[16px] text-[#5875e8] group-hover:text-[#3A56C5] group-active:text-[#2C429C] font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]">
            Назначить собес
          </p>
        </CardOpacity>
        <CardOpacity
          styled="w-full gap-[8px] justify-center cursor-pointer"
          rounded={16}
          onClick={onRightClick}
        >
          <DeclineReplyIcon />
          <p className="text-[16px] text-[#F04646] group-hover:text-[#C92121] group-active:text-[#8a3838] font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]">
            Не ваш вариант
          </p>
        </CardOpacity>
      </>
    );
  else
    return (
      <div className="w-full p-[12px] flex-row gap-[8px] bg-[#74899B] bg-opacity-[8%] rounded-[12px] text-center h-[44px] flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={14}
          height={15}
          fill="#5875e8"
        >
          <path
            fill={isMobile ? "url(#asswecan2)" : "url(#asswecan)"}
            d="M0 14.48h14v-14H0v14Z"
          />
          <defs>
            <pattern
              id={isMobile ? "asswecan2" : "asswecan"}
              width={1}
              height={1}
              patternContentUnits="objectBoundingBox"
            >
              <use
                xlinkHref={isMobile ? "#brobro2" : "#brobro"}
                transform="scale(.01563)"
              />
            </pattern>
            <image
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAARpklEQVR4nOVbWWwd13n+/jNn7sJFXCxTFKmF2iJZdpWojhU7NuLGdpu0bopmQVCkMFIgaB8SIGiRvOahfXLTNkCTPjhAkbpIH4rEbuqiWZykqePC8Jo68SJ5kWhSlEiKFCUul/fOzDnn//twZiOt6PJSdAQ0R7i6M/ee+ef82/d/559L4Nd4CKBJrvcqrvNQ13sB13vo63nzh7/x9SBOEgJgr9ca6KGHvvYrudENA9vrlVr3/nOz8yeaRt7TSnhsNUr6mBl9vb2r9Wow6eLVl/u6q8+PDA2+AWD5V7EuPTqy+x29weyFCwcT1B54ddZ8CKE9GJm+G5g0VFUjqCsoAJeTBBdXLQhVXGzQ6nQrerPKK08dHB14GMAL7+T66FuPPPKOCFZs956ZXvxCFA5+LKgPjFbqPQgCDR2GCAINUgGICCwC5yysSRDHsX8lBiaJUVV26cZ68oP926sPAvj5O7FOeuyxf99yoZeXVx+YbVW/1H3j2KF6vRdKKaggRFirIww1iB3ExmBrIACUDkG6AoZCK4qxvLSE1cYyotggimPU0Zzf2xv9/Uh/5csAzFaulX7wn9/ZMmEzs3NhonsfdL17/mJweIwUKVgHhLU6Ak7QuDCBixOnsHzhLMzqItglUETQlToqPQPovnE3Bne/C9079iKRAAsXF7CysoTYMFzSRFdz/JF7bzv8WQDzW7Vmeu7p/9kSQYuLy/VnXx3/+oH33vfA0M49aCw3kbBGRVksTfwCEy8+iYXpU2BZggosoIBABwgCjTAIUAmr0KoKcT2oDRzA0NHb0T92C5ZbFvMXZpFYQRy3sCOY++lHf+v4pwBMb8W6afb82WsWooKQHvvRk18fueXEnw6PjOH89BISRwiaF3D2+e/jrZNPwmEBHDBiV22xdE3V6n2vVav1GSLloqi53drWEa2isR2DtW39XV2A7Udl+zEMH78HttKPmelZxJZhTYz+1hs/+Z07j30cwOI1G+DMm6eu2QAvvT7xhZ7RA3978KZDeO10A40Wo9KYwPhTj2Jq6jm0uIHY9U6NjNz8T4M37PreQP8NbwGYK8uI4rhvcfHSvkbj0l2zs6//2d6d4W+MDu4AVY9g8Nhvg7t3YPr8HIwomNWLGMHkPwP4k2tdO/3Lv37rmgSM7dn9viWn/vvOu07UX5lMMD0XoSeawtnnH8X4xNNoJI537rrtH/oH9nwVwJmNyIyiaOjiwvlPJ83xL92yf7h32w23oveme7GKfkzPzoN0De7iSRzdbj4D4BvXsn760ePf3fTF24d21l+fOPf93/29D929kFTwwhsN9NgFrJ76Ll565Yc4N7eyMrrn/Z8D8M3NyN+1e+ze5575zj++//i+sV2HPoza/rswfcni0uIqwoChZp+ZvPP4kdsBzG5WBz06MrLZa3Hm7MyHbz565O7uSgXPTsQIXYTK5Vfw6sTzuLicRLfe9rHPAPj2ZuXbJPqvW9/7B3/09AuP/dsHu58ZObBzDMM3HkCzGUOUBm3bs/fkqy9/EcAXN3sPffLVlzd14Z79R+qNZvPPjxzYh6kGsLiSYDvP4dLMS5icnsX77vjEX+EalC+NZ++574HP/vQnDz86NHo4GD62F0uD3bhwcRXd/aNonB3/41uP3fR3AGY2I1wfPnJ0U6tabiY37983dqcONM7OG4QcoRJN4c0zr6HSteuZe+67/282JfjK47E33/zFQ88/+8TnPnH4DuzcvhuXlyKIrkB13TA8fvr1TwN4cDOC9fjp1ze1Ig5777vj9hNBU4DLKwl6qIHW4llcXknMe37zngef+MnjW7rDu//+T37la1/90qdmJl8a2Hd8H871VLG0kqCnbxiLE2c++r677v0KgKRTufrwzcc7XszE5Nna+dnZjwwM9GN6FTCJQc0tYmLmHBy6T+3bf+j7HQttM6KoNX7g4Lu/+erLL37+2IkPY3t/FYvLMSrdA6CunsOT46cPAjjZqVw9OX6648WwCvcMDg4cqYRVXJy3gEugeQUX5hcwuH30iSefeLxjT2xk3HT0Pd9+9unHP5usLOih/hFMTisIVQAV9C3Mz3wAmzHAwnzn2NG3Y/fw6MjOPgGwtGqgJYGNltGKrDt667Et9342dgyPvNFYdecuXpgZ235wF6q1AM5YBJU6FmbP3QHgoU5l6qXLCx0vRKrb9h7YNxYYAK3IQUuCZmMRStdmhoaGN1dWNnJf5rlavefnc3NzY3uOAtWKQpQI+rp60Fxd3nv43e8PALhOZOrdB2/peCFT56ffVQlDxAzExqILFnGrAWN4ThEtdiywg9HfP3ByaXn5DzUBlUChyQIVBKhVqz3dPb01AKudyNPdPb0dL+LSpUt7qtUKWglgjQWJQRRFiBK7FCVJq2OBHYyoFZ231gHMCAJARBAoBUWozc/NVdCpAebn5trPKo1du3dTtVrZISKIEgdrLSAGrVYLoGDxR997lDsS2OkI6svOWThnQcJgZpBScNaGU5NvBZ2K01OTb3V0wblz5ytLi0vbSCnEiYE1Bo4srGNEcbzY6QI6HXv374tNYpAkMZgd2FkIMVpRFLz42unODfCz/32x02vi4dHdqtmM0WKDZmTQEIOVRgvCWOpUWKejq7tnxVqHOLKIY4skcTAwuLy4zLpSX+lUntaVettJX/7rv+xaWbk01N3dQ2fGT/f8+Mc/7J6aeg2RnsXKhQUYdwlLjQWEFTP00Y9/8tC23m44B4RhKIq0kFJQSoGUEgIgAAj+P/JHAAAR+Ec1IiQsEDCEHVnriMVQEAT8wgs/O7S62sDkW69gYaaFxctNEJ9DUHHVj/z+3cc+8IG7LzQaDSRJtAjgcjvd6NTJ5646oRJ29dr4lYejePH2Vsso55xaWV0dhJC2LEgSA+csnEmglIqq1eqKMRbMToQdmJ2wMCDsNRSBwD+QI28Bf0wEEIFIgRRBEaWzQCKAEyEISZIktcSYbUoFMNbBsUDEQSu43m19l5nZGBNTb1f/+PHjn/gkgPNX008HdPW0aaxcHjCtMx88dNPRAefqiOMIwkAcx7DWgpnhHMOxwDpXi6OoZq2Dcw7OmfTdz/MGYTj231trYEwC6/znyFVWKAKDUrsJRARECkGo4KyB1kAIAYMgQLC0PL/dOQOYVcQL0zumBk4NtTXA1MTVW2K7xm6RlUutRmP5wkBXzzBqNQEzQ2sFdtor7xjsGI4JXO8GM4NZwOwXzenivSIMaxlxkqDZjLDabCJOIhhjvJEke1wr6XEWLQKhNIKYoSAQFrAwRLxxFTsoZ+GiCEB9udbV05YU6VpXz1UniDAUKbE2wmpjDsIxnDWwxsJaTj2cGoGRK1EoD79o8aqICKxjJIlBq2XQiqI0jXxJQ8kA/v7wKSPpZ/m5lwnh1Lg+zYgZ4hygKZdxVQNsZJJAQPmCGJyGtbMOPtwZjhnsBC41gPeOlMLXy/JPghjWWDhr4KwFOwd2nCohAFGKFbnOPgIkW4Nk3slTA2mwlL/bgGrQ7SYVGK1ApAAKAFIgCkCUpquQf5FAKQKzAEpAXPImSfom/joKQOS8TCgQCSAEodRzRHm5oFREZpj0DZItLjMMCJS7akP6Q7ebRETQOoQOuxBW+8BchdYJnLWpF20OguwYLD4SOMv9NBUyb7L4dFHaQiiCkwBCMaxzEOYixHPdyl7Pwl5K55JeJ2mlIQQuhFLaV5Z2Bmg3iUVgrYW1LYACsItgTQJrDIxxcOUUYLkiAKYpC0DyFEgShySOfRUwCZzjIqThvV7kPgplc/eWjMCZ8gKwA1sLUq4EqFcxQPtJGZikaCsMEVc6zlDYKy7MhddLGJDltORAWQavQiEphXimeAF8xXkp6YE1QV9+tR8b+IVIGsbsFff826WonZ4zp+HObw/9Ug0HUKoKmfJlY2UeLd09z+9C8TVpkYNg8RIuSmZ7A7SZJAIYY2BNCyyAiVswSQKTWFjr0lJYVIE1tZ+9AXgNovsUMMYhjg2SyMBYm1aBDMGvjAPZgnIcQMkQWRqwgzUWwBalACmgUq1AV3ugwx7osIowiWGMhVvDBUr5X+IBOSdINRMGrGNoYwGVQJAAxoCdWxMpmSXKOZ9+Uip3hfeFfZoSK5BUEKgQpNr/Bky3nSRAectSbGLgyxL5d1JpXUp/eJdhq4BAKpMDQAGK02vIf6cIEKI0/68AyiJ5eSS/JfArStHSU4f1dX/LMCAlJZJxeQcp5X/G79ml4Je9pFQK85CFJ0icgSaXCBMX5KekQHZt9pmUvI81xymAZgaTQkYbA7SbVObkadhl18j6mcVnZaBep1OJ2awb69nrevnpeblK5KSoEFxcvIEgaMsEvSjJy1+B/A7MFs45T4FTLu/SCPB5v64KpMfOCZzz0SOlaHib56S4f67T24hRuRIwUKo+GxltU4AICMMQOuxBGPaCdRVBEMNqCxvatUTIZQZIN0brSlwWztYxSBsIElhWYBBIeUOUk2Bt/X976BebIq+8pJshpTUCpQsguqoB2kwSQerlBE7FYI7hrKfCzhZVIGeBbn0VKCIgcy4zpziylhDlSmU3ztdQfCbZeyn3M4zy3s8MydhIGLTlAQBSYLNwnIBtAmt9M8Sat+8Gcx6wphdQLN6nAKccIoGzxjc2nUtp8zoYlBTq1xOgkiEKIsRAmlJCvBYSfqkBNjApG5T+U6SgSKW7v8zLAJT3Cku6fRaBKkUBwacFiS+bSvkdJqXbSgIXu8DCBEix3ZtBJN3xecNQCVBFijKd266dAdpNEgGSxMCkTNAmLZg4gTEW1jCsc7Cu8H7GAMtMMANDoOgHGMOIY+NZpbF5SczRvYQGa7tEhWa558sbInawiQW025oU8CCooXUVga6lN1YAGZBikLUgy3Cq2AWyCNS6VMjCWQkAeB4RKAelAi8njSDyrAZII0aQtRK8ouU/cChXgKyfAPK/P1SB2hoQBABSCirQUEEIjcyyCqQciAIoVZTADAxFsIYOF+AFKMeAsnACWAEYAKsMEHP18rec/mKd53OA5fwclKUWrWm5/1IDtJ0kSGt1yvqcTdtYFjZrhuQ9wczj2XFRrgrQ9gbyjRS/s/Rl012RB8gVjnNOcYUqkPGAMme4qgE2MikfGe9P9wClznXB4UuhSCQewCTr6hYXeA+1AWqCl+UF+H0ASqmBErkkv0coBMoG/J/2Tq82BEi9aUHO+I6wNWlD08FZD4RF/c9IEBccINsNZkyQsx1ktp9IS5dcwfNACfTyL9OoSsM+T4OsDKb9gK3YCygCdKgR6Dp02J02MzWUMlCBgzIOgSuToVI1KIFgxgNYBOQYLBZaE4wVKCYIaM28HAxzhTMLSBYQyLpJkvYCSTzwKR2AVLBVIFjuT5F/bKUUVBBACRAIAcS+jrPvBCuRNV2hvAuU6qAUQySAdYC26fcg8PodYepxyVIoP8+JR5pyCiTe80Rt0uptBmgzPHNzYBfDKQ22WVN0bUfIPyIrvJ9XABZwib9DAMu+KWqSpEgn59JWmKy5d+kktUlhkBw0SyyQ06dUSraqKSq+DFaqFVSqFZjYQBzB+fKArE8gnPF4vzDKQpl87Ze8k+LPlUpf5MFKgSDERblEGc/KlSQlPuUqkA6l/MNV0f5Zw0ZG+4YIkRJn9KW5WczOrGBudgEry020IgOTuKL8lUpY1ujNmZuXU1Q3ETiWNQC6piGyRrkC6/NUKC8vFa2UgtaEShigGjr09oaBsGtrBS189eeHgdbJubPz9B+PPIW3JhtoRRacd219wjnnfKTkpTDj6BnLSB99Y92c9HwtDK2r8R7tSiBYGDYIAv8YXbKNj0AB0IHBwYP7ardY0/bvi7SxV59jHOaq2058fuRg/21De412zirnLFlrVJLEJCLU19evlCJlrSVmUewsOWbF7IidI3aWmA0xJ8TsSFhIxBcqiKShS0KKRKlAlKpIEITpcSAq0KJUwCoIJAgU6yAQFSheXloSay1XqjUJdYXDUIsKtISVihsZ3X/mwLtOjLczAE2Mv9luzv/r8Wv/t8MkHgiv29/uXu/xfxM9X9mo6G3JAAAAAElFTkSuQmCC"
              id={isMobile ? "brobro2" : "brobro"}
              width={64}
              height={64}
            />
          </defs>
        </svg>

        <div
          className={
            "text-[#BFBFBF]  overflow-hidden whitespace-nowrap truncate leading-[17px] text-[14px] font-normal tracking-[-0.182px] select-none"
          }
        >
          Чат откроется, после назначения собеседования
        </div>
      </div>
    );
};

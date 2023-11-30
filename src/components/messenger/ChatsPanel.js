"use client";

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
import Image from "next/image";

const ChatsPanel = ({ chatId, user_id, profileData }) => {
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
    if (currentChatCursor?.length) {
      setDataStateMessages([...dataStateMessages, ...data.data]);
    } else {
      setDataStateMessages(data.data);
    }
    if (!data.check && !data.checkVacReply) setCircle(data.circle);
    else setCircle("");
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
    if (!data.check && !data.checkVacReply) setCircle(data.circle);
    else setCircle("");
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
            <div className="w-full ml-[calc(50vw-88px)]">
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
                  {item.type === "vacancyReply" ? (
                    <ReplyItem
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
                              ? "Теперь нужно немного подождать. Cобеседник ответит вам, если захочет"
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
                              ? "Теперь нужно немного подождать. Cобеседник ответит вам, если захочет"
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
      <div
        className={`pt-[11.3px] pb-[12px] p-[12px] flex flex-row gap-[8px] border-t-[0.7px] bg-white dark:bg-[#212122] [@media(pointer:coarse)]:hidden [@media(hover)]:rounded-b-[20px] ${"border-t-[#e7e7e7] dark:border-t-[#282828]"}`}
      >
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
        </div>
      </div>
      <NoPitchesModal
        modalState={noModal}
        setModalState={setNoModal}
        type={circle}
      />
    </div>
  );
};

export default ChatsPanel;

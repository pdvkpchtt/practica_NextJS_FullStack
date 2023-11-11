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

const ChatsPanel = ({ chatId, user_id }) => {
  const { currentChatCursor, setCurrentChatCursor } = useContext(MesContext);

  const pathname = usePathname();
  const router = useRouter();

  const [input, setInput] = useState(""); // Messages
  const [wait, setWait] = useState(false); // Messages
  const [searchInput, setSearchInput] = useState(""); // Messages
  const [hasNextPageMessages, setHasNextPageMessages] = useState(true);
  const [dataStateMessages, setDataStateMessages] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [lastDateMessages, setLastDateMessages] = useState("");

  // -------------- messages
  const getMessages = async () => {
    console.log("fetching");
    // if (loadingMessages) return;
    setLoadingMessages(true);
    const data = await fetchMessages(
      chatId,
      currentChatCursor,
      searchInput,
      false
    );
    console.log("client messages", data);
    if (currentChatCursor?.length) {
      setDataStateMessages([...dataStateMessages, ...data.data]);
    } else {
      setDataStateMessages(data.data);
    }
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
      true
    );
    console.log("messenges update", data);
    if (loadingMessages) return;
    setDataStateMessages(data?.data);

    // setCursorMessages(data?.cursorMessages);
    // setHasNextPageMessages(data?.hasNextPageMessages);
  };
  // -------------- messages

  const sendMsg = async () => {
    if (input.length !== 0) {
      setWait(true);
      console.log(input);
      await sendMessage(input, chatId);
      setInput("");
      setCurrentChatCursor("");
      await getMessages("");
      setWait(false);
    }
  };

  useEffect(() => {
    getUserMessengerWithTimer();
    const timer = setInterval(() => {
      console.log("messages list timer");
      getUserMessengerWithTimer();
    }, [5000]);

    return () => {
      clearInterval(timer);
    };
  }, [currentChatCursor]);

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

          <div className="flex flex-col gap-[2px] w-full items-center truncate">
            <TextMain
              text={"Имя"} //////////////////
              style="font-medium text-center text-[18px] leading-[21.6px] tracking-[-0.015em] w-full overflow-hidden whitespace-nowrap truncate"
            />
            <TextSecondary
              text="онлайн"
              style="font-medium text-[11px] leading-[12px] tracking-[-0.027em]"
            />
          </div>

          <div className="min-w-[44px] ml-[16px]">
            <EmptyAvatar thirty />
          </div>
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
          <TextSecondary
            text={
              pathname.includes("/preview")
                ? "Здесь пока ничего нет"
                : "Нет сообщений"
            }
            style={"h-full w-full flex justify-center items-center select-none"}
          />
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
                setWait(false);

                router.push(`/messenger/${chatId}`);
              } else {
                sendMsg();
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
                setWait(false);

                router.push(`/messenger/${chatId}`);
              } else {
                sendMsg();
              }
            }
          }}
        >
          {wait ? (
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
                  setWait(false);

                  router.push(`/messenger/${chatId}`);
                } else {
                  sendMsg();
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
                  setWait(false);

                  router.push(`/messenger/${chatId}`);
                } else {
                  sendMsg();
                }
              }
            }}
          >
            {wait ? (
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
            ) : (
              <SendIcon />
            )}
          </SendButton>
        </div>
      </div>
    </div>
  );
};

export default ChatsPanel;

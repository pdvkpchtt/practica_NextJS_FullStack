"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  months: [
    "янв.",
    "фев.",
    "марта",
    "апр.",
    "мая",
    "июня",
    "июля",
    "авг.",
    "сен.",
    "окт.",
    "нояб.",
    "дек.",
  ],
});
import TextMain from "../../shared/Text/TextMain ";

import ChatReadStatus from "../../shared/icons/ChatReadStatus";
import TextSecondary from "../../shared/Text/TextSecondary";
import EmptyAvatar from "shared/ui/EmptyAvatar";
import LittlePitchIcon from "../../shared/icons/LittlePitchIcon";
import LittleSuperPitchIcon from "../../shared/icons/LittleSuperPitchIcon";

const MessageCart = ({ item, onClick, active = false, last = false }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          item.id === pathname.slice(11, pathname.length)
            ? "[@media(hover)]:bg-[#e7e7e7] [@media(hover)]:dark:bg-[#282828]"
            : "[@media(hover)]:bg-transparent"
        } flex flex-row w-full [@media(hover)]:px-[12px] [@media(pointer:coarse)]:dark:bg-[#212122] [@media(pointer:coarse)]:bg-white [@media(pointer:coarse)]:rounded-[20px] [@media(hover)]:cursor-pointer [@media(pointer:coarse)]:p-[12px] 
          [@media(hover)]:pb-[12px]
          [@media(hover)]:pt-[12px] [@media(hover)]:border-b-[0.7px] border-b-[#e7e7e7] [@media(hover)]:dark:border-b-[#282828]`}
        onClick={() => (onClick ? onClick() : {})}
      >
        <div className="relative z-0 bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 rounded-[8px] mr-[8px] overflow-hidden">
          {item.chatImage ? (
            <Image
              src={item.chatImage}
              className="object-cover select-none h-[67px] min-h-[67px] max-h-[67px]"
              alt="Profile photo"
              width={67}
              height={67}
            />
          ) : (
            <EmptyAvatar sixtySeven />
          )}
          <div className="absolute bottom-0 left-0 bg-[#282828] bg-opacity-[80%] select-none rounded-[8px] text-[#fff] font-medium text-[9px] leading-[15px] tracking-[-0.013em] px-[4px]">
            {dayjs(item.lastMessageCreatedAt).calendar(dayjs(), {
              sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
              nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
              nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
              lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
              lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
              sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
            }) === "Сегодня"
              ? dayjs(item.lastMessageCreatedAt).format("HH:mm")
              : dayjs(item.lastMessageCreatedAt).calendar(dayjs(), {
                  sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
                  nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
                  nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
                  lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
                  lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
                  sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
                })[0] === "0"
              ? dayjs(item.lastMessageCreatedAt)
                  .calendar(dayjs(), {
                    sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
                    nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
                    nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
                    lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
                    lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
                    sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
                  })
                  .slice(1)
              : dayjs(item.lastMessageCreatedAt).calendar(dayjs(), {
                  sameDay: "[Сегодня]", // В тот же день (сегодня в 2:30 утра)
                  nextDay: "[Завтра]", // Позавчера (вчера в 2:30 ночи)
                  nextWeek: "DD MMMM", // На следующей неделе (воскресенье в 2:30 ночи)
                  lastDay: "[Вчера]", // Позавчера (вчера в 2:30 ночи)
                  lastWeek: "DD MMMM", // Прошлая неделя (последний понедельник в 2:30 ночи)
                  sameElse: "DD MMMM", // Всё остальное ( 17/10/2011 )
                })}
          </div>
        </div>

        <div className="flex flex-col gap-[4px] flex-1 h-[58px] overflow-hidden">
          <TextMain
            text={item.chatLabel}
            style="font-medium [@media(pointer:coarse)]:select-none text-[16px] leading-[16.8px] tracking-[-0.015em] h-[19px] whitespace-nowrap truncate"
          />

          {item?.lastMessageType !== "vacancyReply" &&
          !item?.lastMessageType?.includes("pitch") ? (
            <TextSecondary
              text={
                item.myMessageIsLast ? "Вы: " + item.chatText : item.chatText
              }
              style="font-medium [@media(pointer:coarse)]:select-none text-[14px] leading-[18px] tracking-[-0.013em] flex-1 line-clamp-2"
            />
          ) : (
            item.lastMessageType === "vacancyReply" && (
              <p
                className={`${
                  item.myMessageIsLast ? "text-[#8f8f8f]" : "text-[#5875e8]"
                } font-medium [@media(pointer:coarse)]:select-none text-[14px] leading-[18px] tracking-[-0.013em] flex-1 line-clamp-2`}
              >
                {item.chatText}
              </p>
            )
          )}
          {item.lastMessageType === "superpitch" && (
            <p
              className={`${
                item.myMessageIsLast ? "text-[#8f8f8f]" : "text-[#5875e8]"
              } font-medium [@media(pointer:coarse)]:select-none gap-[4px] text-[14px] leading-[18px] tracking-[-0.013em] flex flex-row line-clamp-2`}
            >
              <LittleSuperPitchIcon
                fill={item.myMessageIsLast ? "#8f8f8f" : "#5875e8"}
              />
              {item.chatText}
            </p>
          )}
          {item.lastMessageType === "pitch" && (
            <p
              className={`${
                item.myMessageIsLast ? "text-[#8f8f8f]" : "text-[#5875e8]"
              } font-medium [@media(pointer:coarse)]:select-none gap-[4px] text-[14px] leading-[18px] tracking-[-0.013em] flex flex-row line-clamp-2`}
            >
              <LittlePitchIcon
                fill={item.myMessageIsLast ? "#8f8f8f" : "#5875e8"}
              />
              {item.chatText}
            </p>
          )}
        </div>

        <div className={`ml-[8px] my-auto`}>
          {item.chatIsUnread && item.myMessageIsLast ? (
            <ChatReadStatus fill={"#5875e8"} />
          ) : null}
        </div>
      </div>
      {/* <div
        className={`[@media(hover)]:my-[12px] [@media(pointer:coarse)]:hidden [@media(hover)]:border-b-[0.7px] [@media(hover)]:border-[#e7e7e7] ${
          last && "hidden"
        }`}
      /> */}
    </>
  );
};

export default MessageCart;

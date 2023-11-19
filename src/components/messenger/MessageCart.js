"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
        <div className="relative z-0 rounded-[8px] mr-[8px] overflow-hidden">
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
            {dayjs(item.lastMessageCreatedAt).format("HH:mm")}
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

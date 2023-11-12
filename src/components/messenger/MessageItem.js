import Image from "next/image";
import dayjs from "dayjs";
// import relativetime from "dayjs/plugin/relativeTime";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

const MessageItem = ({ item, style, last = false }) => {
  return (
    <div
      className={`${style} flex items-center ${
        item.myMessage ? "flex-row-reverse gap-[8px]" : "flex-row gap-[8px]"
      }`}
    >
      {!item.myMessage &&
        (item.user.image ? (
          <Image
            src={item.user.image}
            alt="person image"
            height={30}
            width={30}
            quality={100}
            className={`h-[30px] w-[30px] select-none object-cover rounded-[12px] [@media(pointer:coarse)]:hidden`}
          />
        ) : (
          <EmptyAvatar thirty />
        ))}
      <TextMain
        text={item.text}
        style={`font-medium max-w-[288px] w-fit text-[14px] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] ${
          item.myMessage
            ? "bg-[#cad5ff] dark:bg-[#5875e8]"
            : "bg-[#e7e7e7] dark:bg-[#2c2c2c]"
        } rounded-[12px]`}
      />
      <TextSecondary
        text={dayjs(item.createdAt).format("HH:mm")}
        style="font-normal text-[14px] select-none flex flex-row items-center leading-[16.8px] tracking-[-0.013em] h-full"
      />

      {item.unRead && item.myMessage && (
        <div className="bg-[#5875e8] rounded-full min-[12px] max-h-[12px] h-[12px] w-[12px] min-w-[12px] max-w-[12px]" />
      )}
    </div>
  );
};

export default MessageItem;

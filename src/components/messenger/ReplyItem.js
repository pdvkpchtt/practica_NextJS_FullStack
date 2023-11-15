import Image from "next/image";
import dayjs from "dayjs";
// import relativetime from "dayjs/plugin/relativeTime";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

const ReplyItem = ({ item, style, last = false }) => {
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

      <div
        className={`max-w-[350px] ${
          item.myMessage ? "items-end" : "items-start"
        } w-full flex flex-col gap-[8px]`}
      >
        <div
          className={`flex items-center w-full ${
            item.myMessage ? "flex-row-reverse gap-[8px]" : "flex-row gap-[8px]"
          }`}
        >
          <TextMain
            text={item.vacancyReply.message}
            style={`font-medium max-w-[288px] w-full text-[14px] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px]`}
          />
          <TextSecondary
            text={dayjs(item.createdAt).format("HH:mm")}
            style="font-normal text-[14px] select-none flex flex-row items-center leading-[16.8px] tracking-[-0.013em] h-full"
          />

          {item.unRead && item.myMessage && (
            <div className="bg-[#5875e8] rounded-full min-[12px] max-h-[12px] h-[12px] w-[12px] min-w-[12px] max-w-[12px]" />
          )}
        </div>
        <div className="flex flex-col gap-[8px] max-w-[288px] w-full items-start p-[12px] bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px]">
          {item.vacancyReply?.file.map((i, key) => (
            <a
              href={i.path}
              key={key}
              target="_blank"
              className={` text-[#5875e8] w-full max-w-[264px] truncate hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] text-[16px] font-normal leading-[19px] tracking-[-0.24px] underline cursor-pointer`}
            >
              {i.name}
            </a>
          ))}
        </div>

        <div
          className={`font-medium flex items-start max-w-[288px] w-full overflow-hidden truncate text-[#5875e8] text-[14px] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px]`}
        >
          <a
            href={item.vacancyReply.link}
            target="_blank"
            className={`text-[#5875e8] flex-1 truncate hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] text-[16px] font-normal leading-[19px] tracking-[-0.24px] underline cursor-pointer`}
          >
            {item.vacancyReply.link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;

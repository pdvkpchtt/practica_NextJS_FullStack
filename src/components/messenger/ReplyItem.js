import Image from "next/image";
import dayjs from "dayjs";
// import relativetime from "dayjs/plugin/relativeTime";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Link from "next/link";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import Card from "../../shared/ui/Card";

const ReplyItem = ({ lastMsg, item, style, type = "vacancyReply" }) => {
  if (!item?.vacancyReply)
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
          className={`bg-[#e7e7e7] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white rounded-[12px] p-[12px] max-w-[288px] w-fit flex flex-row text-[14px] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] ${
            item.myMessage
              ? "bg-[#cad5ff] dark:bg-[#5875e8]"
              : "bg-[#e7e7e7] dark:bg-[#2c2c2c]"
          } rounded-[12px]`}
        >
          <TextSecondary
            text="Вакансия удалена"
            style={"text-[14px] font-medium"}
          />
        </div>
        <TextSecondary
          text={dayjs(item.createdAt).format("HH:mm")}
          style="font-normal text-[14px] select-none flex flex-row items-center leading-[16.8px] tracking-[-0.013em] h-full"
        />

        {item.unRead && item.myMessage && (
          <div className="bg-[#5875e8] rounded-full min-[12px] max-h-[12px] h-[12px] w-[12px] min-w-[12px] max-w-[12px]" />
        )}
      </div>
    );

  if (type === "vacancyReplyDeclined")
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
          className={`bg-[#e7e7e7] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white rounded-[12px] p-[12px] max-w-[288px] w-fit flex flex-row text-[14px] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] ${
            item.myMessage
              ? "bg-[#cad5ff] dark:bg-[#5875e8]"
              : "bg-[#e7e7e7] dark:bg-[#2c2c2c]"
          } rounded-[12px]`}
        >
          Отклик на&nbsp;
          <a
            href={"https://practica.team/vacancy/" + item?.vacancy?.id}
            target="_blank"
            className={
              item.myMessage
                ? "text-white underline transition duration-[250ms] сursor-pointer"
                : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] сursor-pointer"
            }
          >
            вакансию
          </a>
          &nbsp;отклонён
        </div>
        {/* <TextMain
        text={textWithLinks}
        style={`font-medium max-w-[288px] whitespace-pre-line w-fit text-[14px] leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] ${
          item.myMessage
            ? "bg-[#cad5ff] dark:bg-[#5875e8]"
            : "bg-[#e7e7e7] dark:bg-[#2c2c2c]"
        } rounded-[12px]`}
      /> */}
        <TextSecondary
          text={dayjs(item.createdAt).format("HH:mm")}
          style="font-normal text-[14px] select-none flex flex-row items-center leading-[16.8px] tracking-[-0.013em] h-full"
        />

        {item.unRead && item.myMessage && (
          <div className="bg-[#5875e8] rounded-full min-[12px] max-h-[12px] h-[12px] w-[12px] min-w-[12px] max-w-[12px]" />
        )}
      </div>
    );

  return (
    <div
      className={`${style} flex items-center ${
        item.myMessage ? "flex-row-reverse gap-[8px]" : "flex-row gap-[8px]"
      }`}
    >
      {!item?.myMessage &&
        (item?.user?.image ? (
          <Image
            src={item?.user?.image}
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
        {/* info */}
        <div className="bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px] p-[12px] max-w-[288px] w-full flex flex-col gap-[4px]">
          <Link href={`/vacancy/${item?.vacancy?.id}`} target="_blank">
            <TextMain
              text={item?.vacancy?.name}
              style="text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px] font-medium"
            />
          </Link>
          <Link
            href={`/companyprofile/${item?.vacancy?.Company?.username}`}
            target="_blank"
          >
            <TextSecondary
              text={"@" + item?.vacancy?.Company?.username}
              style="text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px] font-medium"
            />
          </Link>
          {item?.vacancy?.currency ? (
            <p className="font-medium text-[14px] leading-[18px] tracking-[-0.182px] break-words text-[#8f8f8f]">
              {item?.vacancy?.salaryStart && `от ${item?.vacancy?.salaryStart}`}
              {item?.vacancy?.salaryEnd &&
                ` до ${item?.vacancy?.salaryEnd}`}{" "}
              {item?.vacancy?.currency?.label}
            </p>
          ) : (
            <p className="font-medium text-[14px] leading-[18px] tracking-[-0.182px] break-words text-[#8f8f8f]">
              По договоренности
            </p>
          )}
        </div>
        {/* info */}
        <div
          className={`flex items-center w-full ${
            item.myMessage ? "flex-row-reverse gap-[8px]" : "flex-row gap-[8px]"
          }`}
        >
          <TextMain
            text={item?.vacancyReply?.message}
            style={`font-medium max-w-[288px] w-full text-[14px] whitespace-pre-line leading-[18px] tracking-[-0.013em] px-[12px] pt-[12px] pb-[11px] bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px]`}
          />
          <TextSecondary
            text={dayjs(item.createdAt).format("HH:mm")}
            style="font-normal text-[14px] select-none flex flex-row items-center leading-[16.8px] tracking-[-0.013em] h-full"
          />

          {item.unRead && item.myMessage && (
            <div className="bg-[#5875e8] rounded-full min-[12px] max-h-[12px] h-[12px] w-[12px] min-w-[12px] max-w-[12px]" />
          )}
        </div>
        {item?.files?.length > 0 && (
          <div className="flex flex-col gap-[8px] max-w-[288px] w-full items-start p-[12px] bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px]">
            {item?.files?.map((i, key) => (
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
        )}

        {item?.vacancyReply?.link && (
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
        )}

        {lastMsg?.id === item?.id && (
          <div className="bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px] p-[12px] max-w-[288px] w-full flex flex-col gap-[4px]">
            <TextSecondary
              text={
                lastMsg?.myMessage === false
                  ? "Назначьте собеседование, чтобы открыть номер"
                  : "Подождите пока рекрутер, посмотит ваше резюме и примет решение"
              }
              style="text-[16px] tracking-[-0.24px] font-normal"
            />
          </div>
        )}

        {item?.vacancyReply?.status === "accepted" && (
          <div className="bg-[#e7e7e7] dark:bg-[#2c2c2c] rounded-[12px] p-[12px] max-w-[288px] w-full flex flex-col gap-[4px]">
            <TextMain
              text={item?.user?.phone}
              style={"text-[16px] font-normal leading-[19px] trackng-[-0.24px]"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyItem;

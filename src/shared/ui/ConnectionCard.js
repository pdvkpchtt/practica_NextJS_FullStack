"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import EmptyAvatar from "./EmptyAvatar";
import { addConnection } from "../../server/actions/connections/addConnection";
import { declineFriendRequest } from "../../server/actions/connections/declineFriendRequest";
import { removeConnection } from "../../server/actions/connections/removeConnection";

import PlusInCircleIcon from "../../shared/icons/PlusInCircleIcon";
import CrossInCircleIcon from "../../shared/icons/CrossInCircleIcon";
import MessageInCircleIcon from "../../shared/icons/MessageInCircleIcon";
import ClockWaitIcon from "../../shared/icons/ClockWaitIcon";

const ConnectionCard = ({
  item,
  updateModal,
  update = false,
  friend = false,
  role = "",
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const router = useRouter();

  const getNoun = (dig) => {
    if (dig === 0 || dig >= 5) return " связей";
    if (dig > 1 && dig < 5) return " связи";
    else return " связь";
  };

  return (
    <div className="flex flex-row [@media(pointer:coarse)]:p-[8px] justify-between items-center [@media(pointer:coarse)]:rounded-[20px] [@media(pointer:coarse)]:bg-white [@media(pointer:coarse)]:dark:bg-[#212122]">
      <div className="flex flex-row overflow-hidden [@media(pointer:coarse)]:gap-[8px] gap-[10px]">
        {/* image */}
        <div
          className="min-w-[50px] cursor-pointer overflow-hidden min-h-[50px] [@media(pointer:coarse)]:min-w-[40px] [@media(pointer:coarse)]:min-h-[40px] rounded-[10px] [@media(pointer:coarse)]:rounded-[12px]"
          onClick={() =>
            router.push(
              `/profile/${
                friend
                  ? item?.username || item?.id
                  : item?.userFrom?.username || item?.userFrom?.id
              }`
            )
          }
        >
          {item?.image ? (
            <Image
              src={friend ? item?.image : item?.userFrom?.image}
              alt="Profile image"
              width={50}
              height={50}
              className="h-[50px] w-[50px] [@media(pointer:coarse)]:w-[40px] [@media(pointer:coarse)]:h-[40px]"
            />
          ) : (
            <EmptyAvatar
              fifty={isMobile ? false : true}
              little={isMobile ? true : false}
            />
          )}
        </div>
        {/* image */}

        {/* text */}
        <div className="flex flex-col [@media(pointer:coarse)]:gap-[4px] gap-[5px] w-full overflow-hidden">
          {update ? (
            <div className="flex flex-row gap-[8px] ">
              <TextMain
                text={item?.userFrom?.name}
                style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em] whitespace-nowrap truncate"
                onClick={() =>
                  router.push(
                    `/profile/${item?.userFrom?.username || item?.userFrom?.id}`
                  )
                }
              />
              {/* <p
                className={`${
                  //  "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                  "text-[#cfcfcf] cursor-default"
                } text-[16px] truncate break-words font-medium tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal transition duration-[250ms] leading-[19px]`}
              >
                @{item?.userFrom?.username}
              </p> */}
              <TextSecondary
                text={dayjs().to(item?.createdAt)}
                style="font-medium truncate text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal truncate select-none"
              />
            </div>
          ) : (
            <TextMain
              text={item?.name}
              style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em] whitespace-nowrap truncate"
              onClick={() =>
                router.push(`/profile/${item?.username || item?.id}`)
              }
            />
          )}
          <TextSecondary
            text={
              update
                ? item?.text
                : item?.connectionsCount + getNoun(item?.connectionsCount)
            }
            style="font-medium text-[14px] leading-[18px] tracking-[-0.013em]"
          />
        </div>
        {/* text */}
      </div>

      {/* buttons */}
      <div className="flex flex-row ml-[8px] h-full items-center gap-[6px] [@media(pointer:coarse)]:gap-[8px]">
        {item?.type === "request get" && !friend && (
          <>
            <PlusInCircleIcon
              onClick={async () => {
                await addConnection(item?.userFrom?.id);
                updateModal();
              }}
            />
            <CrossInCircleIcon
              onClick={async () => {
                await declineFriendRequest(item?.userFrom?.id);
                updateModal();
              }}
            />
          </>
        )}

        {item?.type === "request sent" && !friend && <ClockWaitIcon />}

        {/* {friend && (
          <>
            <MessageInCircleIcon
              onClick={() => {
                item.chats
                  ? router.push(`/messenger/${item.chats}`)
                  : router.push(`/messenger/preview?user_id=${item.id}`);
                // await addConnection(item.id);
                // updateModal();
              }}
            />
            <CrossInCircleIcon
              onClick={async () => {
                await removeConnection(item.id);
                updateModal();
              }}
            />
          </>
        )} */}
      </div>
      {/* buttons */}
    </div>
  );
};

export default ConnectionCard;

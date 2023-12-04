"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";
import Reaction from "./Reaction";
import EmptyAvatar from "./EmptyAvatar";

import Cross2 from "../icons/Cross2";

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};

const FullPostModal = ({
  item,
  setClose = () => {},
  reactions = [],
  addReaction = () => {},
  toggleReaction = () => {},
  selectedId,
}) => {
  const router = useRouter();
  // useEffect(() => {
  //   if (open) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "unset";
  // }, [open]);

  return (
    <>
      <motion.div className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full dark:bg-opacity-[50%] bg-opacity-[20%] z-[100]">
        <motion.div
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          onClick={setClose}
          variants={modalVariant}
          className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full bg-[#4A5479] dark:bg-black dark:bg-opacity-[50%] bg-opacity-[20%] z-[-1]"
        ></motion.div>
        <motion.div
          layoutId={selectedId}
          className="w-[630px] h-fit mx-auto mt-[86px] z-[200] dark:bg-[#141414] bg-[#F6F6F8] bottom-0 p-[12px] rounded-[20px]"
        >
          <div className="flex flex-row gap-[12px]">
            {/* 1nd col */}
            <div className="flex flex-col gap-[12px] w-full">
              {/* img + name + id */}
              <div className="flex flex-row gap-[12px]">
                {item?.author_image ? (
                  <div className="overflow-hidden rounded-[8px] h-[40px] min-w-[40px] cursor-pointer">
                    <Image
                      src={item?.author_image}
                      alt="Profile image"
                      quality={100}
                      className="h-[40px] w-[40px]"
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <EmptyAvatar little />
                )}

                <div className="flex flex-col gap-[3px] flex-1">
                  <div className="flex flex-row gap-[4px] truncate [@media(pointer:coarse)]:max-w-[239px] [@media(pointer:coarse)]:w-full">
                    <TextMain
                      text={item?.author_name}
                      style="font-medium text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] truncate cursor-pointer"
                      onClick={() =>
                        item.role === "student" || item.role.includes("hr")
                          ? router.push(`/profile/${item.username}`)
                          : router.push(`/companyprofile/${item.username}`)
                      }
                    />
                    <TextSecondary
                      text={dayjs().to(item.createdAt)}
                      style="font-medium truncate text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal truncate select-none"
                    />
                  </div>
                  <p
                    className={`${
                      //  "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                      "text-[#cfcfcf] cursor-default"
                    } text-[16px] font-medium pb-[1px] tracking-[-0.015em] transition duration-[250ms] leading-[19px]`}
                  >
                    @{item?.username || item?.author_id}
                  </p>
                </div>

                <Cross2 onClick={() => setClose(false)} />
              </div>
              {/* img + name + id */}

              {/* scrolable body */}
              <div className="max-h-[341px] hideScrollbarNavMobile mx-[53px] h-full w-[553px] overflow-y-auto flex flex-col gap-[12px]">
                {/* title */}
                <TextMain
                  text={item.title}
                  style="text-[20px] font-medium mr-[53px]  leading-[22px] tracking-[-0.025em]"
                />
                {/* title */}

                {/* text */}
                <TextMain
                  text={item.text}
                  style="font-normal mr-[53px] whitespace-pre-line text-[16px] leading-[19px] tracking-[-0.015em]"
                />
                {/* text */}
              </div>
              {/* scrolable body */}

              {/* reactions */}
              <div className="flex flex-row flex-wrap mx-[53px]  gap-[16px]">
                {reactions.map((item, key) => {
                  if (item.type != "no_display")
                    return (
                      <Reaction
                        inModal
                        key={key}
                        item={item}
                        addReaction={addReaction}
                        toggleReaction={toggleReaction}
                      />
                    );
                })}
              </div>
              {/* reactions */}
            </div>
            {/* 1nd col */}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FullPostModal;

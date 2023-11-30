"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
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
import Reaction from "../ui/Reaction";
import EmptyAvatar from "./EmptyAvatar";
import FullPostModal from "./FullPostModal";
import BottomModal from "./BottomModal";
import PostBottomModalContent from "./PostBottomModalContent";

import DotsIcon from "../icons/DotsIcon";
import ForYouIcon from "shared/icons/feed/ForYouIcon";
import OfftopIcon2 from "shared/icons/feed/OfftopIcon2";
import FutureIcon2 from "shared/icons/feed/FutureIcon2";

const Post = ({
  item,
  addReaction,
  setSelectedId = () => {},
  selectedId,
  userId,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [isOpen, toggle] = useState(false);
  const [reactions, setReactions] = useState(item.reactions || []);
  const [deleted, setDeleted] = useState(false);

  const toggleReaction = (reaction) => {
    addReaction(reaction.postId, reaction.type);
    // loop over the todos list and find the provided id.
    let updatedList = reactions.map((item) => {
      if (item.type == reaction.type) {
        return {
          ...item,
          active: !item.active,
          count: item.active ? item.count - 1 : item.count + 1,
        }; //gets everything that was already in item, and updates "done"
      }
      return {
        ...item,
        active: false,
        count: item.active ? item.count - 1 : item.count,
      }; // else return unmodified item
    });
    console.log("updated", updatedList);

    setReactions(updatedList); // set state to new object with updated list
  };

  return (
    <>
      <LayoutGroup id={selectedId}>
        {!deleted && (
          <motion.div
            layoutId={item.id}
            className={`${
              selectedId == item.id && "hidden z-40"
            } flex flex-col [@media(pointer:coarse)]:min-w-full z-10 [@media(pointer:coarse)]:max-w-full min-w-[630px] max-w-[704px] w-full bg-white dark:bg-[#212122] rounded-[20px]`}
          >
            {/* image profile info time and dots  */}
            <div className="flex flex-row gap-[12px] mt-[12px] mx-[12px]">
              {item?.author_image ? (
                <div className="overflow-hidden aspect-square rounded-[8px] h-[40px] min-w-[40px] cursor-pointer">
                  <Image
                    src={item?.author_image}
                    alt="Profile image"
                    quality={100}
                    unoptimized
                    className="h-[40px] w-[40px] object-cover"
                    width={40}
                    height={40}
                  />
                </div>
              ) : (
                <EmptyAvatar little />
              )}

              <div className="flex flex-col gap-[2px] maw-w-[500px] truncate w-full">
                <div className="flex flex-row gap-[4px] truncate [@media(pointer:coarse)]:max-w-[239px] [@media(pointer:coarse)]:w-full">
                  <TextMain
                    text={item?.author_name}
                    style="font-medium text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] truncate cursor-pointer"
                    onClick={() => router.push(`/profile/${item.username}`)}
                  />

                  <TextSecondary
                    text={dayjs().to(item.createdAt)}
                    style="font-medium truncate text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal truncate select-none"
                  />
                </div>
                <div className="flex flex-row flex-wrap text-[#8f8f8f] font-medium text-[14px] select-none leading-[18px] tracking-[-0.182px]">
                  <p
                    onClick={() => router.push(`/profile/${item?.username}`)}
                    className={`${
                      //  "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                      "text-[#8f8f8f] cursor-pointer"
                    } text-[16px] font-medium pb-[1px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal  transition duration-[250ms] leading-[19px]`}
                  >
                    @{item?.username || item?.author_id}
                  </p>
                  {item?.isHrCompanyId && (
                    <>
                      &nbsp;•&nbsp;
                      <p
                        onClick={() =>
                          router.push(`/companyprofile/${item?.isHrCompanyId}`)
                        }
                        className={`${
                          //  "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                          "text-[#8f8f8f] cursor-pointer"
                        } text-[16px] font-medium pb-[1px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal  transition duration-[250ms] leading-[19px]`}
                      >
                        {"@" + item?.isHrCompanyId}
                      </p>
                    </>
                  )}

                  {item.category?.name === "Офтоп" && (
                    <>
                      &nbsp;•&nbsp;
                      <OfftopIcon2 />
                    </>
                  )}
                  {item.category?.name === "yes future!" && (
                    <>
                      &nbsp;•&nbsp;
                      <FutureIcon2 />
                    </>
                  )}
                </div>
              </div>

              {item.author_id === userId && (
                <DotsIcon onClick={() => toggle(true)} />
              )}
            </div>
            {/* image profile info time and dots */}

            {/* main content */}
            <div className="flex flex-col relative z-[1] gap-[12px] [@media(hover)]:px-[65px] [@media(pointer:coarse)]:pl-[65px] [@media(pointer:coarse)]:pr-[12px] py-[12px]">
              {/* clickable div */}
              <div
                className="absolute cursor-pointer top-0 left-0 w-full h-[calc(100%-46px)]"
                onClick={() => {
                  !isMobile
                    ? setSelectedId(item.id)
                    : router.push(`/feed/post/${item?.id}`);
                }}
              />
              {/* clickable div */}

              {/* header and text */}
              <TextMain
                text={item.title}
                style="text-[20px] font-medium leading-[22px] tracking-[-0.025em] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.014625em]"
              />

              <TextMain
                text={
                  item.text.length <= 200
                    ? item.text
                    : item.text.slice(0, 199) + "..."
                }
                style="font-normal whitespace-pre-line text-[16px] line-clamp-3 overflow-hidden truncate leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0121875em]"
              />
              {/* header and text */}

              {/* reactions */}
              <div className="flex flex-row flex-wrap gap-[16px]">
                {reactions.map((item, key) => {
                  if (item.type != "no_display")
                    return (
                      <Reaction
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
            {/* main content */}
          </motion.div>
        )}
        {selectedId == item.id && (
          <FullPostModal
            item={item}
            reactions={reactions}
            addReaction={addReaction}
            toggleReaction={toggleReaction}
            setClose={() => setSelectedId(false)}
            selectedId={selectedId}
          />
        )}
      </LayoutGroup>

      {/* modal */}
      <BottomModal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        translate="translate(-50%, 0%)"
      >
        <PostBottomModalContent
          postId={item.id}
          author_id={item.author_id}
          setDeleted={() => setDeleted(true)}
          handleClose={() => toggle(false)}
        />
      </BottomModal>
      {/* modal */}
    </>
  );
};

export default Post;

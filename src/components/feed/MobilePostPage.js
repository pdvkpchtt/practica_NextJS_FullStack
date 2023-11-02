"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import Reaction from "../../shared/ui/Reaction";
import CustomLoader from "../../shared/ui/CustomLoader";
import PostBottomModalContent from "../../shared/ui/PostBottomModalContent";

import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import DotsIcon from "../../shared/icons/DotsIcon";
import BottomModal from "../../shared/ui/BottomModal";
import MobileHeader from "../../shared/ui/MobileHeader";

const MobilePostPage = ({ getPost, addReaction, userId }) => {
  const router = useRouter();

  const [postState, setPostState] = useState({});
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, toggle] = useState(false);

  const getCurrentPost = async () => {
    setLoading(true);

    const post = await getPost();

    setPostState(post);
    setReactions(post.reactions);

    setLoading(false);
  };

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

  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <>
      <div className="flex flex-col [@media(pointer:coarse)]:mt-[-12px]">
        {/* white bg */}
        <div className="bg-white dark:bg-[#212122] z-[-1] absolute w-full h-full top-0 left-0" />
        {/* white bg */}

        {/* header */}
        <MobileHeader
          onClick={() =>
            router.push("/feed", { query: { status: "upadtate" } })
          }
        />
        {/* header */}

        {/* body */}
        <div className="flex flex-col  [@media(pointer:coarse)]:p-[12px]  [@media(pointer:coarse)]:min-w-full w-full bg-white dark:bg-[#212122]">
          {loading ? (
            <div className="w-full flex justify-center">
              <CustomLoader diameter={36} />
            </div>
          ) : (
            <>
              {/* image profile info time and dotsIcon  */}
              <div className="flex flex-row gap-[12px]">
                {postState?.author_image ? (
                  <div className="overflow-hidden rounded-[8px] min-h-[40px] min-w-[40px] cursor-pointer">
                    <Image
                      src={postState?.author_image}
                      alt="Profile image"
                      quality={100}
                      className="h-[40px] w-[40px]"
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-[8px] min-h-[40px] min-w-[40px] cursor-pointer">
                    <EmptyAvatar little />
                  </div>
                )}

                <div className="flex flex-col gap-[2px] maw-w-[500px] truncate w-full">
                  <div className="flex flex-row gap-[4px] truncate [@media(pointer:coarse)]:max-w-[239px] [@media(pointer:coarse)]:w-full">
                    <TextMain
                      text={postState?.author_name}
                      style="font-medium text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] truncate cursor-pointer"
                      onClick={() => {
                        item.role === "student" || item.role === "hr"
                          ? postState?.author_id === userId
                            ? router.push("/profile")
                            : router.push(`/profile/${postState.username}`)
                          : router.push(
                              `/companyprofile/${postState.username}`
                            );
                      }}
                    />
                    <TextSecondary
                      text={dayjs().to(postState.createdAt)}
                      style="font-medium truncate text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal truncate select-none"
                    />
                  </div>
                  <p
                    className={`${
                      //  "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                      "text-[#cfcfcf] cursor-default"
                    } text-[16px] truncate font-medium pb-[1px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0140625em] [@media(pointer:coarse)]:font-normal  transition duration-[250ms] leading-[19px]`}
                  >
                    @{postState?.username || postState?.author_id}
                  </p>
                </div>

                <DotsIcon onClick={() => toggle(true)} />
              </div>
              {/* image profile info time and dotsIcon */}

              {/* main content */}
              <div className="flex flex-col mt-[12px] gap-[12px]">
                {/* header and text */}
                <TextMain
                  text={postState.title}
                  style="text-[20px] font-medium leading-[22px] tracking-[-0.025em] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.014625em]"
                />

                <TextMain
                  text={postState.text}
                  style="font-normal text-[16px] leading-[19px] tracking-[-0.015em] [@media(pointer:coarse)]:text-[15px] [@media(pointer:coarse)]:leading-[18px] [@media(pointer:coarse)]:tracking-[-0.0121875em]"
                />
                {/* header and text */}

                {/* reactions */}
                <div className="flex flex-row z-[2] flex-wrap gap-[16px]">
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
            </>
          )}
        </div>
        {/* body */}
      </div>

      {/* modal */}
      <BottomModal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        translate="translate(-50%, 0%)"
      >
        <PostBottomModalContent />
      </BottomModal>
      {/* modal */}
    </>
  );
};

export default MobilePostPage;

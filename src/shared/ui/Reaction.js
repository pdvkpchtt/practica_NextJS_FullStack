"use client";

import Image from "next/image";

import BlowMyMind from "../../shared/icons/reactions/BlowMyMind";
import Clown from "../../shared/icons/reactions/Clown";
import Cry from "../../shared/icons/reactions/Cry";
import Fire from "../../shared/icons/reactions/Fire";
import Smile from "../../shared/icons/reactions/Smile";
import ThumbDown from "../../shared/icons/reactions/ThumbDown";
import BigThumb from "../../shared/icons/reactions/BigThumb";

import big_thumb from "../../shared/icons/reactions/big_thumb.svg";
import blow_my_mind from "../../shared/icons/reactions/blow_my_mind.svg";
import clown from "../../shared/icons/reactions/clown.svg";
import cry from "../../shared/icons/reactions/cry.svg";
import fire from "../../shared/icons/reactions/fire.svg";
import smile from "../../shared/icons/reactions/smile.svg";
import thumb_down from "../../shared/icons/reactions/thumb_down.svg";

const Reaction = ({ item, toggleReaction, inModal = false }) => {
  const reactions = {
    big_thumb: <BigThumb additionToId={inModal ? "inmodal" : ""} />,
    fire: <Fire additionToId={inModal ? "inmodal" : ""} />,
    thumb_down: <ThumbDown additionToId={inModal ? "inmodal" : ""} />,
    blow_my_mind: <BlowMyMind additionToId={inModal ? "inmodal" : ""} />,
    smile: <Smile additionToId={inModal ? "inmodal" : ""} />,
    cry: <Cry additionToId={inModal ? "inmodal" : ""} />,
    clown: <Clown additionToId={inModal ? "inmodal" : ""} />,
  };
  return (
    <div
      className={`${
        item.active
          ? "bg-[#8295DE] [@media(hover)]:hover:bg-[#5875E8]"
          : "bg-[#F6F6F8] [@media(hover)]:hover:bg-[#74899B] [@media(hover)]:hover:bg-opacity-[11%] dark:bg-[#74899b] dark:bg-opacity-[8%]"
      } flex flex-row px-[8px] py-[2px] rounded-[16px] h-[34px] items-center cursor-pointer transition duration-[250ms]`}
      onClick={() => {
        console.log("reacting", { postId: item.postId, type: item.type });
        toggleReaction(item);
        // setActiveState(!activeState);
        // addReaction(item.postId, item.type);
        // setCount(activeState ? count - 1 : count + 1);
      }}
    >
      {/* <Image
        src={reactions[item.type]}
        alt="reaction"
        width={30}
        height={30}
        priority
        unoptimized
        className="select-none"
      /> */}
      {reactions[item.type]}
      <div
        className={`${
          item.active ? "text-[#fff]" : "text-[#2c2c2c] dark:text-white"
        } font-medium text-[12px] leading-[14.4px] tracking-[-0.03em] min-w-[8px] select-none`}
      >
        {item.count}
      </div>
    </div>
  );
};

export default Reaction;

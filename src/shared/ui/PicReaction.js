"use client";

import React, { useState } from "react";

import Image from "next/image";

const PicReaction = ({ icon, mobile = false, setReactitons, state }) => {
  return (
    <div
      className={`cursor-pointer transition duration-[250ms] ${
        icon.active
          ? "bg-[#8295DE] [@media(hover)]:hover:bg-[#5875E8]"
          : "bg-[#F6F6F8] dark:bg-[#262626] bg-opacity-[8%]"
      }`}
      style={{
        borderRadius: mobile ? 16 : 10,
      }}
      onClick={() => {
        let arr = [];

        state.map((item) => item.active == true && arr.push(item.active)); // смотрим кол-во активных реакций

        if (arr.length > 1) {
          // активных реакций 2 и более -> можно нажать и отжать
          setReactitons(
            state.map((item) =>
              item.type == icon.type
                ? { ...item, active: !icon.active }
                : { ...item }
            )
          );
        } else if (arr.length == 1) {
          // активных реакций 1 -> нельзя отжать
          setReactitons(
            state.map((item) =>
              item.type == icon.type && icon.active == false
                ? { ...item, active: !icon.active }
                : { ...item }
            )
          );
        }
      }}
    >
      {/* <Image
        src={icon}
        alt="Reaction"
        className="select-none"
        style={{
          width: mobile ? 48 : 30,
          height: mobile ? 48 : 30,
          minHeight: mobile ? 48 : 30,
          minWidth: mobile ? 48 : 30,
        }}
        quality={100}
      /> */}
      {mobile ? icon.iconMobile : icon.icon}
    </div>
  );
};

export default PicReaction;

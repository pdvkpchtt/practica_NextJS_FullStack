"use client";

import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ModalContext } from "./ModalContext";
import Image from "next/image";
import CreateNoteIcon from "shared/icons/feed/CreateNoteIcon";

const FeedNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setModalCreatePost, navState, setNavState } =
    useContext(ModalContext);

  if (!pathname.includes("/feed/post"))
    return (
      <div className="fixed [@media(pointer:coarse)]:hidden">
        <div className="flex flex-col gap-[8px] w-[151px]">
          {navState.map((item, index) => {
            console.log(item);
            return (
              <FeedNavItem
                key={item.id}
                item={item}
                active={pathname === item.route ? true : false}
                onClick={() => {
                  setNavState(
                    navState.map((item) =>
                      item.id == index
                        ? { ...item, active: true }
                        : { ...item, active: false }
                    )
                  );
                  router.push(`${item.route}`);
                }}
              />
            );
          })}

          <div
            className="bg-[#5875e8] mt-[16px] flex flex-row gap-[6px] transition duration-[250ms] hover:bg-[#3A56C5] active:bg-[#2C429C] rounded-[14px] px-[12px] py-[8px] w-[151px] cursor-pointer"
            onClick={() => {
              setModalCreatePost(true);
            }}
          >
            <CreateNoteIcon />
            <p
              className={`text-white text-[14px] leading-[16px] tracking-[-0.21px] select-none transition duration-[250ms]`}
            >
              создать пост
            </p>
          </div>
        </div>
      </div>
    );
};

export default FeedNav;

const FeedNavItem = ({ item = {}, active = false, onClick = () => {} }) => (
  <div
    className="bg-white dark:bg-[#212122] rounded-[14px] px-[12px] py-[8px] w-[151px] flex flex-row gap-[6px] cursor-pointer"
    onClick={onClick}
  >
    {item.icon}
    <p
      className={`${
        active ? "text-[#5875e8]" : "text-[#2c2c2c] dark:text-[white]"
      } text-[14px] leading-[16px] tracking-[-0.21px] select-none transition duration-[250ms]`}
    >
      {item.name}
    </p>
  </div>
);

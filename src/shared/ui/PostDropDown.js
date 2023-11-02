"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ArrowDown from "../icons/ArrowDown";

const PostDropDown = ({
  styled = "",
  choise = "",
  items = [],
  handleSetChoise = () => {},
}) => {
  const [choiseState, setChoiseState] = useState(choise);
  const [openState, setOpenState] = useState(false);

  const renderItems = () => {
    return items.map((item, key) => (
      <div
        key={key}
        onClick={() => {
          setOpenState(false);
          handleChoise(item);
        }}
      >
        <p
          className={`font-medium select-none text-[14px] px-[12px] leading-[16px] tracking-[-0.013125em] cursor-pointer ${
            key == 0
              ? "pt-[12px] pb-[6px]"
              : key == items.length - 1
              ? "pt-[6px] pb-[12px]"
              : "py-[6px]"
          } ${
            choiseState.name == item.name
              ? "text-[#5875e8]"
              : "text-[#2c2c2c] dark:text-[#fff]"
          }`}
        >
          {item.name}
        </p>
      </div>
    ));
  };

  const handleChoise = (choise = {}) => {
    setChoiseState(choise);

    handleSetChoise(choise);
  };

  return (
    <div className={`relative flex flex-col ${styled}`}>
      <div
        className={`z-0 flex flex-row gap-[8px] group items-end h-[17px] cursor-pointer`}
        onClick={() => setOpenState(!openState)}
      >
        {choiseState.name == "" ? (
          <p className="font-normal text-[14px] select-none leading-[17px] tracking-[-0.011375em] transition duration-[250ms] text-[#5875e8] group-hover:text-[#3A56C5] group-active:text-[#2C429C]">
            {choise}
          </p>
        ) : (
          <p className="font-normal text-[14px] select-none leading-[17px] tracking-[-0.011375em] transition duration-[250ms] text-[#5875e8] group-hover:text-[#3A56C5] group-active:text-[#2C429C]">
            {choiseState.name}
          </p>
        )}

        <ArrowDown style={openState && "transform rotate-180"} />
      </div>

      <AnimatePresence>
        {openState && (
          <motion.div
            className="absolute top-[calc(100%+8px)] left-[-7px] z-20 flex h-fit w-fit border-[1px] border-[#e7e7e7] dark:border-[#1a1a1a] flex-col rounded-[10px] bg-[#FFFFFF] dark:bg-[#2c2c2c] shadow-lg"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {renderItems()}
          </motion.div>
        )}
      </AnimatePresence>
      {/* бекдроп. для дебага задай bg-black */}
      {openState && (
        <div
          className="fixed left-0 top-0 z-10 h-full w-full"
          onClick={() => setOpenState(!openState)}
        />
      )}
      {/* бекдроп. для дебага задай bg-black */}
    </div>
  );
};

export default PostDropDown;

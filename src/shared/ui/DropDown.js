"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DropDownItem from "./DropDownItem";
import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";

import DropDownIcon from "../icons/DropDownIcon";
import TextCaption from "../Text/TextCaption";

const DropDown = ({
  toDrop,
  asList = false,
  contentTop = false,
  label = "",
  styled = "",
  bodystyled = "",
  choise = "",
  itemsFor = "",
  items = [],
  handleSetChoise,
}) => {
  const ref = useRef(null);
  const [choiseState, setChoiseState] = useState(choise);
  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    if (toDrop === false) setChoiseState({ label: itemsFor });
  }, [toDrop]);

  useEffect(() => {
    setChoiseState(choise);
  }, [choise]);

  const renderItems = () => {
    return items.map(
      (item, key) =>
        item.label !== null && (
          <DropDownItem
            asList={asList}
            key={key}
            text={item}
            choise={choiseState}
            setOpen={setOpenState}
            handleChoise={(choise) => handleChoise(choise)}
          />
        )
    );
  };

  const handleChoise = (choise = "") => {
    setChoiseState(choise);

    handleSetChoise(choise);
  };
  return (
    <div className={`relative flex flex-col ${styled}`} ref={ref}>
      {label && (
        <TextSecondary
          text={label}
          style="font-medium text-[14px] leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
      )}

      <button
        className={`${bodystyled} z-0 flex w-full flex-row items-center h-[42px] transition-all duration-[200ms]  justify-between rounded-[8px] bg-[#F6F6F8] dark:bg-[#2c2c2c] p-[12px] ${
          openState && !contentTop && "rounded-b-none"
        } ${openState && contentTop && "rounded-t-none"}`}
        onClick={() => setOpenState(!openState)}
      >
        <div
          className={`${
            asList
              ? choiseState.label === itemsFor
                ? "text-[#bfbfbf] dark:text-[#8f8f8f]"
                : "text-[#2c2c2c] dark:text-white"
              : choiseState === itemsFor
              ? "text-[#bfbfbf] dark:text-[#8f8f8f]"
              : "text-[#2c2c2c] dark:text-white"
          } break-words font-normal text-start text-[14px] mr-[15px] leading-[18px] tracking-[-0.015em]`}
        >
          {asList ? choiseState.label : choiseState}
        </div>

        <DropDownIcon
          style={openState && "transform rotate-180 cursor-default"}
        />
      </button>

      <AnimatePresence>
        {openState && (
          <motion.div
            style={{ width: ref.current?.offsetWidth }}
            className={`absolute ${
              contentTop ? "bottom-[100%]" : "top-[100%]"
            } z-[60] flex max-h-[200px] flex-col overflow-y-auto hideScrollbarNavMobile rounded-[8px] ${
              contentTop ? "rounded-b-[0px]" : "rounded-t-[0px]"
            } bg-[#F6F6F8] dark:bg-[#2c2c2c] ${
              contentTop
                ? "shadow-[0_-3px_15px_-3px_rgba(0,0,0,0.3)]"
                : "shadow-lg"
            }`}
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
          className="fixed left-0 top-0 z-[55] h-full w-full"
          onClick={() => setOpenState(!openState)}
        />
      )}
      {/* бекдроп. для дебага задай bg-black */}
    </div>
  );
};

export default DropDown;

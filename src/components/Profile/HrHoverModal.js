"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TextMain from "../../shared/Text/TextMain ";

import CheckIcon from "../../shared/icons/CheckIcon";
import { useEffect } from "react";

const HrHoverModal = ({
  setHoverModal = () => {},
  hoverModal = false,
  contactsComp = {},
  contactsCompState = () => {},
  compsList = [],
}) => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (hoverModal === false) setMode(false);
  }, [hoverModal]);

  console.log(contactsComp, compsList, "shared");

  return (
    <AnimatePresence>
      {hoverModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="absolute pt-[33px] top-[12px] right-[0px] cursor-default z-[25] w-fit h-fit"
          onMouseEnter={() => setHoverModal(true)}
          onMouseLeave={() => setHoverModal(false)}
        >
          <div
            className={`h-full ${
              !mode ? "w-full" : "min-w-[170px] w-full"
            } whitespace-pre-line text-center bg-[#FFFFFF] transition-all duration-[250ms] dark:bg-[#2c2c2c] rounded-[12px] p-[8px] flex flex-col`}
          >
            {!mode ? (
              <>
                <TextMain
                  text={
                    "Оплата контактов\nот компании " +
                    contactsComp?.company?.name
                  }
                  style={"text-[12px] leading-[16px]"}
                />
                <p
                  onClick={() => setMode(true)}
                  className="text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] w-fit mx-auto transition duration-[250ms] text-[12px] leading-[16px] cursor-pointer"
                >
                  Изменить
                </p>
              </>
            ) : (
              <>
                {compsList?.map((i, key) => (
                  <div
                    onClick={() => contactsCompState(i)}
                    key={key}
                    className={`p-[8px] flex flex-row cursor-pointer justify-between gap-[16px]`}
                  >
                    <TextMain
                      text={i?.company?.name}
                      style={"text-[16px] text-start leading-[20px] break-keep"}
                    />

                    {i?.company?.id === contactsComp?.company?.id && (
                      <CheckIcon />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HrHoverModal;

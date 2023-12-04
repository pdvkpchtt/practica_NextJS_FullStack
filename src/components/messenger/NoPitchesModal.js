"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";

const NoPitchesModal = ({
  modalState = false,
  setModalState = () => {},
  type = "pitch",
}) => {
  const router = useRouter();

  return (
    <>
      <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
        {/* header */}
        <div className="flex flex-row justify-end pb-[12px] relative">
          <Cross2 onClick={() => setModalState(false)} />

          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[16px]">
          <TextMain
            text={
              type === "pitch"
                ? "Закончились питчи? :("
                : "Закончились суперпитчи? :("
            }
            style={"text-[20px] font-medium leading-[22px] tracking-[-0.4px]"}
          />
          <p
            onClick={() => router.push("/subscriptions")}
            className="text-[#5875e8] hover:text-[#3A56C5] cursor-pointer mb-[15px] active:text-[#2C429C] transition duration-[250ms] font-normal text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Получить больше :{")"}
          </p>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[16px] p-[12px] overflow-y-scroll h-[calc(100%-61px)]">
          <TextMain
            text={
              type === "pitch"
                ? "Закончились питчи? :("
                : "Закончились суперпитчи? :("
            }
            style={"text-[20px] font-medium leading-[22px] tracking-[-0.4px]"}
          />
          <p
            onClick={() => router.push("/subscriptions")}
            className="text-[#5875e8] hover:text-[#3A56C5] cursor-pointer mb-[15px] active:text-[#2C429C] transition duration-[250ms] font-normal text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Получить больше :{")"}
          </p>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default NoPitchesModal;

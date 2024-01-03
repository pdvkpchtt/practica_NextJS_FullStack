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
import Image from "next/image";

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
        <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden pb-[24px] relative h-[174px]">
          <Cross2 onClick={() => setModalState(false)} />

          <Image
            src={"/noPitchesArt.png"}
            alt={"pitch art"}
            width={630}
            height={174}
            quality={100}
            unoptimized
            className="absolute top-[-12px] left-[-12px] min-w-[630px] min-h-[174px] z-[-1]  rounded-t-[20px]"
          />
          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] pb-[12px] gap-[4px]">
          <p className="text-[#2c2c2c] dark:text-white text-[16px] leading-[19px] font-medium trackin-[-0.24px]">
            Общение{" "}
            <span className="text-[#5875e8] text-[16px] leading-[19px] font-semibold trackin-[-0.24px]">
              со вторым и более
            </span>{" "}
            кругом доступно только с питчами и суперпитчами.
          </p>
          <p className="text-[#8f8f8f] text-[16px] leading-[19px] font-medium trackin-[-0.24px]">
            Каждый день вам начисляется 3 питч-сообщения и 1 суперпитч-сообщение
          </p>
          <button
            onClick={() => router.push("/subscriptions")}
            className="bg-[#5875e8] px-[16px] py-[12px] w-fit hover:bg-[#3A56C5] cursor-pointer mt-[12px] rounded-[16px] active:bg-[#2C429C] transition duration-[250ms] text-[#fff] font-medium text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Получить больше
          </button>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[4px] p-[12px] overflow-y-scroll h-[calc(100%-61px)]">
          <Image
            src={"/noPitchesArt.png"}
            alt={"pitch art"}
            width={630}
            height={174}
            quality={100}
            unoptimized
            className="w-full mb-[12px]"
          />

          <p className="text-[#2c2c2c] dark:text-white text-[16px] leading-[19px] font-medium trackin-[-0.24px]">
            Общение{" "}
            <span className="text-[#5875e8] text-[16px] leading-[19px] font-semibold trackin-[-0.24px]">
              со вторым и более
            </span>{" "}
            кругом доступно только с питчами и суперпитчами.
          </p>
          <p className="text-[#8f8f8f] text-[16px] leading-[19px] font-normal trackin-[-0.24px]">
            Каждый день вам начисляется 3 питч-сообщения и 1 суперпитч-сообщение
          </p>
          <button
            onClick={() => router.push("/subscriptions")}
            className="bg-[#5875e8] px-[16px] py-[12px] w-fit mt-[12px] hover:bg-[#3A56C5] cursor-pointer rounded-[16px] active:bg-[#2C429C] transition duration-[250ms] text-[#fff] font-medium text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Получить больше
          </button>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default NoPitchesModal;

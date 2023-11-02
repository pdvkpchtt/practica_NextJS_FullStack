"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";

import Cross2 from "../../shared/icons/Cross2";
import TextMain from "../../shared/Text/TextMain ";

const PitchesModal = ({ modalState = false, setModalState = () => {} }) => {
  return (
    <>
      <Modal isOpen={modalState}>
        {/* header */}
        <div className="flex flex-row justify-end pb-[12px] relative">
          <Cross2 onClick={() => setModalState(false)} />

          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-[371px] mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[34px]">
          <div className="flex flex-col">
            <TextMain
              text="Питч-сообщение"
              style={
                "text-[20px] font-medium leading-[22px] tracking-[-0.4px] mb-[16px]"
              }
            />
            <TextMain
              text="— короткое сообщение, которые вы можете отправить, чтобы познакомиться с другом вашего друга"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px] mb-[4px]"
              }
            />
            <TextSecondary
              text="Каждый день вам начисляется 3 питч-сообщения"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
          </div>
          <div className="flex flex-col">
            <TextMain
              text="Суперпитч-сообщение"
              style={
                "text-[20px] font-medium leading-[22px] tracking-[-0.4px] mb-[16px]"
              }
            />
            <TextMain
              text="— короткое сообщение, которые вы можете отправить любому человеку"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px] mb-[4px]"
              }
            />
            <TextSecondary
              text="Каждый день вам начисляется 1 суперпитч-сообщение"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
          </div>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[6px] p-[12px] overflow-y-scroll h-[100vh]">
          asas
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default PitchesModal;

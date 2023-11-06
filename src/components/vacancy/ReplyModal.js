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
import { Input } from "shared/ui/Input";

const ReplyModal = ({ modalState = false, setModalState = () => {} }) => {
  const router = useRouter();

  const [resumeInput, setResumeInput] = useState("");

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
        <div className="h-fit w-[360px] mx-auto items-center mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] mb-[-12px] pb-[12px] gap-[32px]">
          <TextMain
            text="Резюме"
            style={
              "text-[22px] font-medium mx-auto leading-[26px] tracking-[-0.594px]"
            }
          />

          <div className="text-start w-full flex flex-col gap-[12px]">
            <Input
              label="Ссылка на резюме"
              placeholder="Например, hh.ru, superjob, github или свой сайт"
              style="w-full"
              value={resumeInput}
              onChange={(val) => setResumeInput(val)}
            />

            <TextMain
              text="Или"
              style={
                "text-[14px] font-medium mx-auto leading-[18px] tracking-[-0.182px]"
              }
            />

            {/* input for files */}
            <div className="py-[32px] cursor-pointer px-[52px] rounded-[24px] flex flex-col gap-[12px] border-dashed border-[1px] border-[#BFBFBF]">
              <TextMain
                text="Перетащите резюме в эту область или нажмите здесть, чтобы загрузить"
                style={
                  "font-medium leading-[18px] text-[14px] tracking-[-0.182px] text-center w-full"
                }
              />
              <TextSecondary
                text="PDF Не более 10 МБ"
                style={
                  "font-normal leading-[16px] text-[13px] tracking-[-0.351px] text-center"
                }
              />
            </div>
            {/* input for files */}
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
        <div className="mt-[61px] flex flex-col gap-[34px] p-[12px] overflow-y-scroll h-[calc(100%-61px)]"></div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default ReplyModal;

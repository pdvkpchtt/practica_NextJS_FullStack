"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import { Input, TextArea } from "../../shared/ui/Input";
import { fetchFiles } from "../../server/actions/replyToVac/fetchFiles";
import { uploadFile } from "../../server/actions/replyToVac/uploadFile";
import CustomLoader from "../../shared/ui/CustomLoader";
import { deleteFile } from "../../server/actions/replyToVac/deleteFile";
import { replyToVacancy } from "../../server/actions/replyToVac/replyToVacancy";
import { chechIfChatExist } from "../../server/actions/messenger/chechIfChatExist";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import { ButtonPrimary } from "../../shared/ui/Button";

const ModalExplain = ({ modalState = false, setModalState = () => {} }) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

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
        <div className="h-fit w-[360px] mx-auto items-center mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] mb-[-12px] pb-[12px] gap-[32px]">
          <TextMain
            text="Чтобы откликнуться на вакансию, нужно указать свои контактные данные в профиле"
            style={
              "text-[22px] text-center font-medium mx-auto leading-[26px] tracking-[-0.594px]"
            }
          />

          <Link href="/profile?contacts=true" target={"_blank"}>
            <ButtonPrimary text="К профилю" style="w-fit px-[50px]" />
          </Link>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[34px] p-[12px] h-[calc(100%-61px)]">
          <TextMain
            text="Чтобы откликнуться на вакансию, нужно указать свои контактные данные в профиле"
            style={
              "text-[22px] text-center font-medium mx-auto leading-[26px] tracking-[-0.594px]"
            }
          />

          <Link href="/profile?contacts=true" target={"_blank"}>
            <ButtonPrimary text="К профилю" style="w-fit w-full" />
          </Link>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default ModalExplain;

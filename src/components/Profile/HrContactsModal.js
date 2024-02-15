"use client";

import Image from "next/image";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import Cross2 from "../../shared/icons/Cross2";

const HrContactsModal = ({ modalState = false, setModalState = () => {} }) => {
  return (
    <>
      <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
        {/* header */}
        <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden pb-[24px] relative">
          <Cross2 onClick={() => setModalState(false)} />

          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit mt-[12px] flex flex-col [@media(pointer:coarse)]:hidden overflow-y-auto rounded-b-[20px] px-[12px]  pb-[12px]">
          <TextMain text="Тут будет покупка контактов" />
        </div>
        {/* body */}
      </Modal>
    </>
  );
};

export default HrContactsModal;

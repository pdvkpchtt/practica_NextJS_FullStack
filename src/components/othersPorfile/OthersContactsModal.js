"use client";

import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import { Input } from "../../shared/ui/Input";
import { addContacts } from "server/actions/contacts/addContacts";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import CheckIcon from "shared/icons/CheckIcon";

const OthersContactsModal = ({
  modalState = false,
  setModalState = () => {},
  phone,
  phoneVerified,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async () => {
    if (phoneInput.length !== 0 && codeInput.length !== 0) {
      setLoading(true);
      await addContacts(phoneInput);
      setModalState();
      router.refresh();
      setIsEdit(false);
      setLoading(false);
    }
  };

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
        <div className="h-fit mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px]"></div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col p-[12px] overflow-y-scroll h-[calc(100%-61px)]"></div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default OthersContactsModal;

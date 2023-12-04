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
import { getPlanInfo } from "../../server/actions/pitches/getPlanInfo";
import { addContacts } from "server/actions/contacts/addContacts";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import CheckIcon from "shared/icons/CheckIcon";
import CustomLoader from "shared/ui/CustomLoader";

const OthersContactsModal = ({
  modalState = false,
  setModalState = () => {},
  phone,
  name,
}) => {
  const router = useRouter();

  const [plan, setPlan] = useState(null);

  const getPlan = async () => {
    const data = await getPlanInfo();
    console.log("client plan :)", data);
    setPlan(data);
  };

  useEffect(() => {
    getPlan();
  }, [modalState]);

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
        <div className="h-fit mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px]">
          {plan === null ? (
            <div className="w-full h-[578px] flex items-center justify-center">
              <CustomLoader diameter={36} />
            </div>
          ) : (
            <>
              <TextMain
                text={"Контакт @" + name}
                style="text-[20px] font-medium leading-[22px] mb-[16px] tracking-[-0.4px] text-[#2c2c2c] dark:text-white"
              />
              <TextMain
                text="+7 (9**) *** ** **"
                style={
                  "text-[16px] font-normal w-full leading-[19px] mb-[8px] tracking-[-0.24px]"
                }
              />
              <p className="text-[16px] font-normal mb-[24px] leading-[19px] tracking-[-0.24px] text-[#2c2c2c] dark:text-white flex flex-row">
                <TextSecondary
                  text={"Доступно контактов"}
                  style="text-[16px] font-normal mb-[24px] leading-[19px] tracking-[-0.24px] "
                />
                &nbsp;{plan.contacts}
              </p>

              <div
                onClick={() => {
                  if (plan.contacts === 0) router.push("/subscriptions");
                }}
                className="bg-[#5875e8] hover:bg-[#3A56C5] cursor-pointer w-[192px] select-none rounded-[16px] active:bg-[#2C429C] py-[12px] font-medium leading-[19px] tracking-[-0.24px] text-[16px] text-center flex items-center text-white transition duration-[250ms] justify-center"
              >
                {plan.contacts === 0 ? "К подпискам" : "Открыть контакт"}
              </div>
            </>
          )}
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col p-[12px] overflow-y-scroll h-[calc(100%-61px)]">
          {plan === null ? (
            <div className="w-full h-[578px] flex items-center justify-center">
              <CustomLoader diameter={36} />
            </div>
          ) : (
            <>
              <TextMain
                text={"Контакт @" + name}
                style="text-[20px] font-medium leading-[22px] mb-[16px] tracking-[-0.4px] text-[#2c2c2c] dark:text-white"
              />
              <TextMain
                text="+7 (9**) *** ** **"
                style={
                  "text-[16px] font-normal w-full leading-[19px] mb-[8px] tracking-[-0.24px]"
                }
              />
              <p className="text-[16px] font-normal mb-[24px] leading-[19px] tracking-[-0.24px] text-[#2c2c2c] dark:text-white flex flex-row">
                <TextSecondary
                  text={"Доступно контактов"}
                  style="text-[16px] font-normal mb-[24px] leading-[19px] tracking-[-0.24px] "
                />
                &nbsp;{plan.contacts}
              </p>

              <div
                onClick={() => {
                  if (plan.contacts === 0) router.push("/subscriptions");
                }}
                className="bg-[#5875e8] hover:bg-[#3A56C5] cursor-pointer w-full select-none rounded-[16px] active:bg-[#2C429C] py-[12px] font-medium leading-[19px] tracking-[-0.24px] text-[16px] text-center flex items-center text-white transition duration-[250ms] justify-center"
              >
                {plan.contacts === 0 ? "К подпискам" : "Открыть контакт"}
              </div>
            </>
          )}
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default OthersContactsModal;

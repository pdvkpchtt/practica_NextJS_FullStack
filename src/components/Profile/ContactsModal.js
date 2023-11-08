"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import { Input } from "../../shared/ui/Input";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import CheckIcon from "shared/icons/CheckIcon";

const ContactsModal = ({ modalState = false, setModalState = () => {} }) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

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
        <div className="h-fit mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px]">
          <TextMain
            text="Ваш телефон"
            style="text-[20px] font-medium leading-[22px] tracking-[-0.4px] text-[#2c2c2c] dark:text-white"
          />

          <p className="text-[16px] font-normal w-full leading-[19px] tracking-[-0.24px] mt-[16px] text-[#2c2c2c] dark:text-white">
            8 (999) 999 99-99{" "}
            <span className="text-[#5875e8] select-none hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer transition duration-[250ms]">
              изменить?
            </span>
          </p>
          <TextSecondary
            text="Телефон может видеть только рекрутер, который захочет связаться с вами."
            style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
          />

          {/* <TextMain
            text="Контакты"
            style="text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
          />
          <TextMain
            text="— сюда входит ваша контактная информация"
            style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px]"
          />
          <TextSecondary
            text="Видеть ее может только рекрутер, который захочет с вами связаться"
            style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
          />

          <div className="flex flex-row justify-between mt-[32px] w-full h-[84px] gap-[24px]">
            <div className="flex flex-col w-[250px]">
              <TextSecondary
                text={"Телефон"}
                style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
              />

              <div className="w-full relative">
                <InputMask
                  mask="9 (999) 999 99-99"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                  }}
                  maskChar=""
                >
                  {(inputProps) => (
                    <input
                      placeholder={"8 (999) 999 99-99"}
                      value={inputProps.phoneInput}
                      className={`px-[12px] h-[42px] ${
                        error
                          ? "text-red-500 dark:text-red-500"
                          : "text-[#2c2c2c] dark:text-white"
                      } text-[14px] pb-[12px] bg-[#f6f6f8] w-[250px] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px]`}
                      //   onChange={}
                      //   maxLength={17}
                    />
                  )}
                </InputMask>
                <p
                  className={`${
                    phoneInput.length !== 17
                      ? "text-[#bfbfbf]"
                      : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                  } transition duration-[250ms] absolute right-[12px] top-[12px] text-[14px] leading-[18px] select-none tracking-[-0.21px] font-normal`}
                >
                  Отправить
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[17px] w-full">
              <Input
                type="number"
                placeholder="Введите код"
                value={codeInput}
                onChange={(val) => setCodeInput(val)}
                label="Код подтверждения"
              />
              <div
                className={`${
                  codeInput.length > 0
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] ctive:bg-[#2C429C] cursor-pointer"
                    : "bg-[#ECEDF1] dark:bg-[#74899B] dark:bg-opacity-[8%]"
                } w-[41px] h-[41px] min-w-[41px] min-h-[41px] flex items-center justify-center transition duration-[250ms] rounded-full mt-[24px]`}
              >
                <CheckIcon fill="#fff" />
              </div>
            </div>
          </div> */}
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
          <TextMain
            text="Контакты"
            style="text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
          />
          <TextMain
            text="— сюда входит ваша контактная информация"
            style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px]"
          />
          <TextSecondary
            text="Видеть ее может только рекрутер, который захочет с вами связаться"
            style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
          />

          <div className="flex [@media(hover)]:flex-row [@media(hover)]:justify-between [@media(pointer:coarse)]:flex-col mt-[32px] w-full h-[84px] gap-[24px]">
            <div className="flex flex-col w-full">
              <TextSecondary
                text={"Телефон"}
                style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
              />

              <div className="w-full relative">
                <InputMask
                  mask="9 (999) 999 99-99"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                  }}
                  maskChar=""
                >
                  {(inputProps) => (
                    <input
                      placeholder={"8 (999) 999 99-99"}
                      value={inputProps.phoneInput}
                      className={`px-[12px] h-[42px] ${
                        error
                          ? "text-red-500 dark:text-red-500"
                          : "text-[#2c2c2c] dark:text-white"
                      } text-[14px] pb-[12px] bg-[#f6f6f8] w-[250px] [@media(pointer:coarse)]:w-full dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px]`}
                      //   onChange={}
                      //   maxLength={17}
                    />
                  )}
                </InputMask>
                <p
                  className={`${
                    phoneInput.length !== 17
                      ? "text-[#bfbfbf]"
                      : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer"
                  } transition duration-[250ms] absolute right-[12px] top-[12px] text-[14px] leading-[18px] select-none tracking-[-0.21px] font-normal`}
                >
                  Отправить
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[17px] w-full">
              <Input
                type="number"
                placeholder="Введите код"
                value={codeInput}
                onChange={(val) => setCodeInput(val)}
                label="Код подтверждения"
              />
              <div
                className={`${
                  codeInput.length > 0
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] ctive:bg-[#2C429C] cursor-pointer"
                    : "bg-[#ECEDF1] dark:bg-[#74899B] dark:bg-opacity-[8%]"
                } w-[41px] h-[41px] min-w-[41px] min-h-[41px] flex items-center justify-center transition duration-[250ms] rounded-full mt-[24px]`}
              >
                <CheckIcon fill="#fff" />
              </div>
            </div>
          </div>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default ContactsModal;

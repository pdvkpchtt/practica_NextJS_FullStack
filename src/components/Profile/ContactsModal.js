"use client";

import Image from "next/image";
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
import CheckIcon from "../../shared/icons/CheckIcon";
import sendVerificationCodeSMS from "../../app/api/sms/route";

const ContactsModal = ({
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
  const [verCode, setVerCode] = useState("00000");
  const [errorVerCode, setErrorVerCode] = useState(false);


  const generateVerificationCode = async () => {
    let token = "";
    for (let i = 0; i < 5; i++) {
      let digit = Math.floor(Math.random() * 10);
      token += digit;
    }
    setVerCode(token)
    return token;
  };

  const sendVerCode = async () => {
    if (phoneInput.length !== 0) {
      const token = await generateVerificationCode();
      const res = await sendVerificationCodeSMS(phoneInput.replace(/[-+()\s]/g, ''), token);
      console.log(res);
    }
  };

  const handleSubmit = async () => {
    if (phoneInput.length !== 0 && codeInput.length !== 0) {
      if (codeInput === verCode) {
        setLoading(true);
        await addContacts(phoneInput);
        setModalState();
        setCodeInput("");
        setIsEdit(false);
        setLoading(false);
        router.push("/profile");
      } else {
        setErrorVerCode(true);
      }
    }
  };

  return (
    <>
      <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
        {/* header */}
        <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden pb-[24px] relative h-[180px]">
          <Cross2 onClick={() => setModalState(false)} />

          <Image
            src={"/phoneArt.png"}
            alt={"pitch art"}
            width={630}
            height={180}
            quality={100}
            unoptimized
            className="absolute top-[-12px] left-[-12px] min-w-[630px] min-h-[180px] z-[-1]  rounded-t-[20px]"
          />
          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit mt-[12px] flex flex-col [@media(pointer:coarse)]:hidden overflow-y-auto rounded-b-[20px] px-[12px]  pb-[12px]">
          {phone && phoneVerified && !isEdit && (
            <>
              <TextMain
                text="Ваш телефон"
                style="text-[20px] font-medium leading-[22px] tracking-[-0.4px] text-[#2c2c2c] dark:text-white"
              />

              <p className="text-[16px] font-normal w-full leading-[19px] tracking-[-0.24px] mt-[16px] text-[#2c2c2c] dark:text-white">
                {phone}{" "}
                <span
                  onClick={() => setIsEdit(true)}
                  className="text-[#5875e8] select-none hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer transition duration-[250ms]"
                >
                  изменить?
                </span>
              </p>

              <TextSecondary
                text="Телефон может видеть только рекрутер, который захочет связаться с вами."
                style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
              />
            </>
          )}

          {(!phone || !phoneVerified || (isEdit && phone && phoneVerified)) && (
            <>
              <TextMain
                text={isEdit ? "Изменение номера телефона" : "Контакты"}
                style="text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
              />
              {errorVerCode ? (
                <>
                  <p
                    className="text-red-500 select-none mt-[16px]"
                  >
                    Неверно набран код
                  </p>
                </>
              ) : (<></>)}
              {isEdit ? (
                <>
                  <p
                    onClick={() => setIsEdit(false)}
                    className="text-[#5875e8] select-none mt-[16px] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer transition duration-[250ms] text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
                  >
                    Отменить изменение
                  </p>
                  <TextSecondary
                    text="Телефон виден только рекрутеру, который захочет связаться с вами."
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
                  />
                </>
              ) : (
                <>
                  <TextMain
                    text="— сюда входит ваша контактная информация"
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px]"
                  />
                  <TextSecondary
                    text="Видеть ее может только рекрутер, который захочет с вами связаться"
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
                  />
                </>
              )}

              <div className="flex flex-row justify-between mt-[32px] w-full h-[84px] gap-[24px]">
                <div className="flex flex-col w-[250px]">
                  <TextSecondary
                    text={"Телефон"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />

                  <div className="w-full relative">
                    <InputMask
                      mask="+7 (999) 999 99-99"
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value);
                      }}
                      maskChar=""
                    >
                      {(inputProps) => (
                        <input
                          placeholder={"+7 (999) 999 99-99"}
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
                      onClick={phoneInput.length !== 18 || phone === phoneInput ? null : () => sendVerCode()}
                      className={`${
                        phoneInput.length !== 18 || phone === phoneInput
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
                    onChange={(val) => {setCodeInput(val); setErrorVerCode(false)}}
                    label="Код подтверждения"
                  />
                  <div
                    onClick={() => handleSubmit()}
                    className={`${
                      codeInput.length > 0
                        ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                        : "bg-[#ECEDF1] dark:bg-[#74899B] dark:bg-opacity-[8%]"
                    } w-[41px] h-[41px] min-w-[41px] min-h-[41px] flex items-center justify-center transition duration-[250ms] rounded-full mt-[24px]`}
                  >
                    {loading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="rgba(255, 255, 255, 1)"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="rgba(255, 255, 255, 0.3)"
                        strokeWidth={6}
                        strokeWidthSecondary={6}
                      />
                    ) : (
                      <CheckIcon fill="#fff" />
                    )}
                  </div>
                </div>
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
          <Image
            src={"/phoneArt.png"}
            alt={"pitch art"}
            width={630}
            height={180}
            quality={100}
            unoptimized
            className="w-full mb-[12px]"
          />

          {phone && phoneVerified && !isEdit && (
            <>
              <TextMain
                text="Ваш телефон"
                style="text-[20px] font-medium leading-[22px] tracking-[-0.4px] text-[#2c2c2c] dark:text-white"
              />

              <p className="text-[16px] font-normal w-full leading-[19px] tracking-[-0.24px] mt-[16px] text-[#2c2c2c] dark:text-white">
                {phone}{" "}
                <span
                  onClick={() => setIsEdit(true)}
                  className="text-[#5875e8] select-none hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer transition duration-[250ms]"
                >
                  изменить?
                </span>
              </p>

              <TextSecondary
                text="Телефон может видеть только рекрутер, который захочет связаться с вами."
                style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
              />
            </>
          )}

          {(!phone || !phoneVerified || (isEdit && phone && phoneVerified)) && (
            <>
              <TextMain
                text={isEdit ? "Изменение номера телефорна" : "Контакты"}
                style="text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
              />
              {isEdit ? (
                <>
                  <p
                    onClick={() => setIsEdit(false)}
                    className="text-[#5875e8] select-none mt-[16px] hover:text-[#3A56C5] active:text-[#2C429C] cursor-pointer transition duration-[250ms] text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
                  >
                    Отменить изменение
                  </p>
                  <TextSecondary
                    text="Телефон виден только рекрутеру, который захочет связаться с вами."
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
                  />
                </>
              ) : (
                <>
                  <TextMain
                    text="— сюда входит ваша контактная информация"
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px]"
                  />
                  <TextSecondary
                    text="Видеть ее может только рекрутер, который захочет с вами связаться"
                    style="text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[4px]"
                  />
                </>
              )}

              <div className="flex flex-col mt-[32px] w-full h-[84px] gap-[24px]">
                <div className="flex flex-col w-full">
                  <TextSecondary
                    text={"Телефон"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />

                  <div className="w-full relative">
                    <InputMask
                      mask="+7 (999) 999 99-99"
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value);
                      }}
                      maskChar=""
                    >
                      {(inputProps) => (
                        <input
                          placeholder={"+7 (999) 999 99-99"}
                          value={inputProps.phoneInput}
                          className={`px-[12px] h-[42px] ${
                            error
                              ? "text-red-500 dark:text-red-500"
                              : "text-[#2c2c2c] dark:text-white"
                          } text-[14px] pb-[12px] bg-[#f6f6f8] w-full dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px]`}
                          //   onChange={}
                          //   maxLength={17}
                        />
                      )}
                    </InputMask>
                    <p
                      onClick={phoneInput.length !== 18 || phone === phoneInput ? null : () => sendVerCode()}
                      className={`${
                        phoneInput.length !== 18 || phone === phoneInput
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
                    onChange={(val) => {setCodeInput(val); setErrorVerCode(false)}}
                    label="Код подтверждения"
                  />
                  <div
                    onClick={() => handleSubmit()}
                    className={`${
                      codeInput.length > 0
                        ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                        : "bg-[#ECEDF1] dark:bg-[#74899B] dark:bg-opacity-[8%]"
                    } w-[41px] h-[41px] min-w-[41px] min-h-[41px] flex items-center justify-center transition duration-[250ms] rounded-full mt-[24px]`}
                  >
                    {loading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="rgba(255, 255, 255, 1)"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="rgba(255, 255, 255, 0.3)"
                        strokeWidth={6}
                        strokeWidthSecondary={6}
                      />
                    ) : (
                      <CheckIcon fill="#fff" />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default ContactsModal;

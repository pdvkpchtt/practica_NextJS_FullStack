"use client";

// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextSecondary from "../../shared/Text/TextSecondary";
import TextMain from "../../shared/Text/TextMain ";
import { ButtonGhost } from "../../shared/ui/Button";

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";

const PitchesModalOthers = ({
  modalState = false,
  setModalState = () => {},
  type = "",
  onClick = () => {},
}) => {
  const router = useRouter();

  return (
    <>
      <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
        {/* header */}
        <div className="flex flex-row [@media(pointer:coarse)]:hidden justify-end pb-[24px] relative h-[182px]">
          <Cross2 onClick={() => setModalState(false)} />

          <Image
            src={"/artPitch.png"}
            alt={"pitch art"}
            width={1344}
            height={384}
            quality={100}
            unoptimized
            className="absolute top-[-12px] left-[-12px] min-w-[630px] min-h-[182px] z-[-1]  rounded-t-[20px]"
          />
          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit mt-[12px] [@media(pointer:coarse)]:hidden flex flex-col overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[34px]">
          <div className="flex flex-col">
            <div className="flex flex-row gap-[4px] items-center">
              <PitchIcon black blue={false} />

              <TextMain
                text="Питч-сообщение"
                style={
                  "text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
                }
              />
            </div>
            <TextMain
              text="— короткое сообщение, которые вы можете отправить, чтобы познакомиться с другом вашего друга"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px] mb-[4px]"
              }
            />
            <TextSecondary
              text="Каждый день вам начисляется 3 питч-сообщения"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
            {type === "pitch" && (
              <div
                className={`py-[12px] px-[16px] mt-[16px] rounded-[20px] items-center flex flex-row w-fit [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
              >
                <ButtonGhost text={"Отправить питч"} onClick={() => onClick()}>
                  <PitchIcon />
                </ButtonGhost>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-[4px] items-center">
              <SuperpitchIcon black blue={false} />

              <TextMain
                text="Суперпитч-сообщение"
                style={
                  "text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
                }
              />
            </div>
            <TextMain
              text="— короткое сообщение для связи с интересующим специалистом без общих контактов."
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]  mt-[16px] mb-[4px]"
              }
            />
            <TextSecondary
              text="Каждый день вам начисляется 1 суперпитч-сообщение"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
            {type === "superpitch" && (
              <div
                className={`mt-[16px] py-[12px] px-[16px] rounded-[20px] items-center flex flex-row w-fit [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
              >
                <ButtonGhost
                  text={"Отправить суперпитч"}
                  onClick={() => onClick()}
                >
                  <SuperpitchIcon />
                </ButtonGhost>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="w-full h-[1px] bg-[#e7e7e7] dark:bg-[#282828]" />
            <p
              onClick={() => router.push("/referal")}
              className="text-[#5875e8] hover:text-[#3A56C5] cursor-pointer mb-[15px] active:text-[#2C429C] transition duration-[250ms] font-normal text-[16px] tracking-[-0.24px] leading-[19px]"
            >
              Бесплатные питчи
            </p>
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
        <div className="mt-[61px] flex flex-col gap-[34px] overflow-y-scroll h-[calc(100%-61px)]">
          <div className="flex flex-col">
            <Image
              src={"/artPitch.png"}
              alt={"pitch art"}
              width={1344}
              height={384}
              quality={100}
              unoptimized
              className="w-full mb-[12px]"
            />

            <div className="flex px-[12px] flex-row gap-[4px] items-center">
              <PitchIcon black blue={false} />

              <TextMain
                text="Питч-сообщение"
                style={
                  "text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
                }
              />
            </div>
            <TextMain
              text="— короткое сообщение, которые вы можете отправить, чтобы познакомиться с другом вашего друга"
              style={
                "text-[16px] px-[12px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px] mb-[4px]"
              }
            />
            <TextSecondary
              text="Каждый день вам начисляется 3 питч-сообщения"
              style={
                "text-[16px] px-[12px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
            {type === "pitch" && (
              <div
                className={`mt-[16px] mx-[12px] py-[12px] px-[16px] rounded-[20px] items-center flex flex-row w-fit [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
              >
                <ButtonGhost text={"Отправить питч"} onClick={() => onClick()}>
                  <PitchIcon />
                </ButtonGhost>
              </div>
            )}
          </div>
          <div className="flex px-[12px] flex-col">
            <div className="flex flex-row gap-[4px] items-center">
              <SuperpitchIcon black blue={false} />

              <TextMain
                text="Суперпитч-сообщение"
                style={
                  "text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
                }
              />
            </div>
            <TextMain
              text="— короткое сообщение для связи с интересующим специалистом без общих контактов."
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]  mt-[16px] mb-[4px]"
              }
            />

            <TextSecondary
              text="Каждый день вам начисляется 1 суперпитч-сообщение"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
            {type === "superpitch" && (
              <div
                className={`mt-[16px] py-[12px] mx-[12px] px-[16px] rounded-[20px] items-center flex flex-row w-fit [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
              >
                <ButtonGhost
                  text={"Отправить суперпитч"}
                  onClick={() => onClick()}
                >
                  <SuperpitchIcon />
                </ButtonGhost>
              </div>
            )}
          </div>

          <div className="flex px-[12px] mb-[12px] flex-col gap-[16px]">
            <div className="w-full h-[1px] bg-[#e7e7e7] dark:bg-[#282828]" />
            <p
              onClick={() => router.push("/referal")}
              className="text-[#5875e8] hover:text-[#3A56C5] cursor-pointer  active:text-[#2C429C] transition duration-[250ms] font-normal text-[16px] tracking-[-0.24px] leading-[19px]"
            >
              Бесплатные питчи
            </p>
          </div>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default PitchesModalOthers;

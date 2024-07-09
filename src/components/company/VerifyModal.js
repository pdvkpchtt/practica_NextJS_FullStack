"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import CustomLoader from "../../shared/ui/CustomLoader";
import TextCaption from "../../shared/Text/TextCaption";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import TextMain from "../../shared/Text/TextMain ";

import Cross2 from "../../shared/icons/Cross2";
import { useRef } from "react";
import { Oval } from "react-loader-spinner";
import { upploadVerifyFile } from "../../server/actions/company/upploadVerifyFile";

const VerifyModal = ({
  modalState = false,
  setModalState = () => {},
  compId,
}) => {
  const [drag, setDrag] = useState(false);
  const [filesState, setFilesState] = useState([]);

  // validate
  const [status2, setStatus2] = useState(null);
  // validate

  const buttRef = useRef(null);
  const inputRef = useRef(null);

  const somethingHapeningFunc = async (something) => {
    const res = await upploadVerifyFile(something, compId);
    if (res?.status) {
      setStatus2(res.message);
      console.log(res);
    } else {
      setStatus2(null);
    }
  };

  return (
    <>
      <Modal
        withScroll
        isOpen={modalState}
        handleClose={() => setModalState(false)}
        width={498}
      >
        {/* header */}
        <div className="flex flex-row justify-end pb-[12px] relative [@media(pointer:coarse)]:hidden">
          <Cross2 onClick={() => setModalState(false)} />

          {/* <div className="h-[0.5px] [@media(pointer:coarse)]:hidden w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        {/* body */}
        <div className="h-fit [@media(pointer:coarse)]:hidden mt-[12px] px-[12px] flex flex-col gap-[12px]">
          <InnerComponent
            buttRef={buttRef}
            status2={status2}
            setStatus2={setStatus2}
            somethingHapeningFunc={somethingHapeningFunc}
            drag={drag}
            setDrag={setDrag}
            inputRef={inputRef}
          />
        </div>
        {/* body */}
      </Modal>

      <MobileModal isOpen={modalState} slideToLeft>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)}></MobileHeader>

        {/* header */}

        {/* body */}
        <div className="mt-[113px] flex flex-col gap-[6px] p-[12px] overflow-y-scroll h-[100vh]">
          <InnerComponent
            buttRef={buttRef}
            status2={status2}
            setStatus2={setStatus2}
            somethingHapeningFunc={somethingHapeningFunc}
            drag={drag}
            setDrag={setDrag}
            inputRef={inputRef}
          />
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default VerifyModal;

const InnerComponent = ({
  status2,
  setStatus2,
  setDrag,
  drag,
  somethingHapeningFunc,
  inputRef,
  buttRef,
}) => {
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <TextMain
          text="Загрузите один из документов"
          style={"text-[20px] font-medium leading-[22px]"}
        />
        <TextMain
          text="— свидетельство о государственной регистрации ЮЛ/ИП"
          style={"text-[14px]"}
        />
        <TextMain
          text="— свидетельство о постановке на налоговый учёт ЮЛ/ИП"
          style={"text-[14px]"}
        />

        <p className={`break-words text-[#2c2c2c] dark:text-white text-[14px]`}>
          — лист записи ЕГРЮЛ/ЕГРИП, его можно получить в личном кабинете на{" "}
          <a
            href="https://www.nalog.gov.ru/"
            target="_blank"
            className="text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] "
          >
            nalog.gov.ru
          </a>
        </p>
      </div>

      {/* input for files */}
      <form
        action={somethingHapeningFunc}
        onDragStart={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDrag(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          let files = [...e.dataTransfer.files];
          const formData = new FormData();
          formData.append("file", files[0]);
          formData.append("compId", compId);
          const res = await upploadVerifyFile(formData, compId);
          setDrag(false);

          if (res?.status) {
            setStatus2(res.message);
            console.log(res);
          } else {
            setStatus2(null);
          }
        }}
        onClick={() => !drag && inputRef.current.click()}
        className={`${
          drag && "scale-[0.95]"
        } py-[32px] cursor-pointer px-[45px] [@media(hover)]:w-[360px] [@media(hover)]:mx-auto my-[12px] transition duration-[250ms] rounded-[24px] flex flex-col gap-[12px] border-dashed border-[1px] border-[#BFBFBF]`}
      >
        <input
          type="file"
          name="file"
          accept="application/pdf"
          className="hidden"
          ref={inputRef}
          onChange={() => {
            buttRef.current.click();
            // fetchHandler();
          }}
        />
        <input type="submit" value="Upload" ref={buttRef} className="hidden" />

        <TextMain
          text={`Перетащите или выберите файл\n(фото или скан)`}
          style={
            "font-medium select-none whitespace-pre-line leading-[18px] w-[256px] text-[14px] tracking-[-0.182px] text-center w-full"
          }
        />
        <p className="break-words select-none text-[#8f8f8f] font-normal leading-[16px] text-[13px] tracking-[-0.351px] text-center">
          <p
            className={
              status2?.includes("zxc type")
                ? "text-[#F0BB31]"
                : "text-[#8f8f8f]"
            }
          >
            Не более 5 файлов, максимальный размер одного файлы — 10 МБ.
            Допустимые форматы: JPG, JPEG, PNG, DOC, DOCX, PDF
          </p>
        </p>
      </form>
      {/* input for files */}

      <div
        className={` rounded-[30px] mt-[8px] w-[96px] mb-[32px] mx-auto h-[33px] transition duration-[250ms] px-[8px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.015em] select-none
    ${
      // headState != "" && textState != ""
      // ?
      "active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer"
      // : "bg-[#74899b] bg-opacity-[8%] text-[#bfbfbf] cursor-default"
    }
  `}
        onClick={() => {
          // if (headState != "" && textState != "") onClick();
          // else handleClick();
        }}
      >
        {!false ? (
          <div>Отправить</div>
        ) : (
          <Oval
            height={19}
            width={19}
            color="rgba(255, 255, 255, 1)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="rgba(255, 255, 255, 0.3)"
            strokeWidth={6}
            strokeWidthSecondary={6}
          />
        )}
      </div>
    </>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Waypoint } from "react-waypoint";

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

import Cross2 from "../../shared/icons/Cross2";
import PitchIcon from "../../shared/icons/PitchIcon";
import SuperpitchIcon from "../../shared/icons/SuperpitchIcon";
import TrashIcon from "../../shared/icons/TrashIcon";

const ReplyModal = ({
  vacId,
  modalState = false,
  setModalState = () => {},
}) => {
  const router = useRouter();

  const inputRef = useRef(null);
  const buttRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [resumeInput, setResumeInput] = useState("");
  const [filesState, setFilesState] = useState([]);
  const [letterInput, setLetterInput] = useState("");

  const somethingHapeningFunc = (something) => {
    uploadFile(something, vacId);
  };

  const fetchHandler = async () => {
    if (loading) return;

    setLoading(true);
    const files = await fetchFiles(vacId);
    setFilesState(files);
    console.log("modal files", files);
    setLoading(false);
  };

  useEffect(() => {
    fetchHandler();
  }, [uploadFile, modalState, deleteFile]);

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
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                let files = [...e.dataTransfer.files];
                const formData = new FormData();
                formData.append("file", files[0]);
                uploadFile(formData);
                // buttRef.current.click();
                fetchHandler();
              }}
              onClick={() => !drag && inputRef.current.click()}
              className={`${
                drag && "scale-[0.95]"
              } py-[32px] cursor-pointer px-[52px] transition duration-[250ms] rounded-[24px] flex flex-col gap-[12px] border-dashed border-[1px] border-[#BFBFBF]`}
            >
              <input
                type="file"
                name="file"
                accept="application/pdf"
                className="hidden"
                ref={inputRef}
                onChange={() => {
                  buttRef.current.click();
                  fetchHandler();
                }}
              />
              <input
                type="submit"
                value="Upload"
                ref={buttRef}
                className="hidden"
              />

              <TextMain
                text="Перетащите резюме в эту область или нажмите здесть, чтобы загрузить"
                style={
                  "font-medium select-none leading-[18px] w-[256px] text-[14px] tracking-[-0.182px] text-center w-full"
                }
              />
              <p className="break-words select-none text-[#8f8f8f] font-normal leading-[16px] text-[13px] tracking-[-0.351px] text-center">
                PDF
                <br />
                Не более 10 МБ
              </p>
            </form>
            {/* input for files */}

            {loading ? (
              <div className="w-full flex items-center justify-center">
                <CustomLoader diameter={25} strokeWidth={5} />
              </div>
            ) : (
              filesState.length !== 0 && (
                <>
                  <TextMain
                    text="Загруженные файлы"
                    style={
                      "text-[14px] mt-[4px] text-start w-full font-medium mx-auto leading-[18px] tracking-[-0.182px]"
                    }
                  />

                  {filesState.map((i, key) => (
                    <div className="flex flex-row justify-between items-center">
                      <a
                        href={i.path}
                        target="_blank"
                        className="text-[#5875e8] flex-1 truncate hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] text-[16px] font-normal leading-[19px] tracking-[-0.24px] underline cursor-pointer"
                      >
                        {i.name}
                      </a>

                      <TrashIcon
                        gray
                        onClick={() => {
                          deleteFile(i.id);
                          fetchHandler();
                        }}
                      />
                    </div>
                  ))}
                </>
              )
            )}

            <TextArea
              label={"Сопроводительное письмо"}
              style="mt-[12px]"
              value={letterInput}
              onChange={(val) => setLetterInput(val)}
              placeholder="Напишите о своих достижениях или мотивации, если хотите"
              minRows={3}
              maxRows={5}
            />
          </div>

          <div
            className={`rounded-[30px] w-[112px] h-[33px] transition duration-[250ms] px-[12px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.013125em] select-none
                active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer mb-[12px]
            `}
            onClick={() => {
              replyToVacancy(vacId, resumeInput, letterInput);
              setModalState();
              router.refresh();
            }}
          >
            Откликнуться
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

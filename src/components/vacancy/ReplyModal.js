"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import axios from "axios";

const ReplyModal = ({
  hrId,
  vacId,
  modalState = false,
  setModalState = () => {},
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const router = useRouter();

  const inputRef = useRef(null);
  const buttRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [drag, setDrag] = useState(false);
  const [resumeInput, setResumeInput] = useState("");
  const [filesState, setFilesState] = useState([]);
  const [letterInput, setLetterInput] = useState("");

  // validate
  const [status, setStatus] = useState(null);
  const [status2, setStatus2] = useState(null);
  // validate

  const somethingHapeningFunc = async (something) => {
    something.append("vacId", vacId);
    // const res = uploadFile(formData, vacId);
    await axios
      .post("/api/upload/file", something)
      .then((res) => setStatus2(res.data.message))
      .catch(console.log);
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
              onChange={(val) => {
                setResumeInput(val);
                if (status)
                  setStatus(status?.filter((i) => !i.includes("inputLink")));
              }}
              caption={
                !status
                  ? null
                  : status?.includes("inputLink url") && resumeInput.length > 0
                  ? "Неверный формат ссылки"
                  : null
              }
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
              onDrop={async (e) => {
                e.preventDefault();
                setDrag(false);
                let files = [...e.dataTransfer.files];
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("vacId", vacId);
                // const res = uploadFile(formData, vacId);
                await axios
                  .post("/api/upload/file", formData)
                  .then((res) => setStatus2(res.data.message))
                  .catch(console.log);

                // if (res?.status) {
                //   setStatus2(res.message);
                //   console.log(res);
                // } else {
                //   setStatus2(null);
                // }
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
                <p
                  className={
                    status2?.includes("zxc type")
                      ? "text-[#F0BB31]"
                      : "text-[#8f8f8f]"
                  }
                >
                  PDF
                </p>
                <p
                  className={
                    status2?.includes("zxc size")
                      ? "text-[#F0BB31]"
                      : "text-[#8f8f8f]"
                  }
                >
                  Не более 10 МБ
                </p>
              </p>
            </form>
            {/* input for files */}

            {loading ? (
              <div className="w-full flex items-center justify-center">
                <CustomLoader diameter={25} strokeWidth={5} />
              </div>
            ) : (
              filesState?.length !== 0 && (
                <>
                  <TextMain
                    text="Загруженные файлы"
                    style={
                      "text-[14px] mt-[4px] text-start w-full font-medium mx-auto leading-[18px] tracking-[-0.182px]"
                    }
                  />

                  {filesState?.map((i, key) => (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={key}
                    >
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
                  {status &&
                    status?.includes("files maxlen") &&
                    filesState.length > 3 && (
                      <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                        Максимум 3 файла
                      </p>
                    )}
                </>
              )
            )}

            <TextArea
              label={"Сопроводительное письмо"}
              style="mt-[12px]"
              value={letterInput}
              onChange={(val) => {
                setLetterInput(val);
                if (status)
                  setStatus(status?.filter((i) => !i.includes("inputMessage")));
              }}
              placeholder="Напишите о своих достижениях или мотивации, если хотите"
              minRows={3}
              maxRows={5}
              caption={
                !status
                  ? null
                  : status?.includes("inputMessage minlen")
                  ? "Поле обязательно к заполнению"
                  : status?.includes("inputMessage maxlen")
                  ? "Максимальная длинна поля 2000 сиволов"
                  : null
              }
            />
          </div>

          <div
            className={`rounded-[30px] w-[112px] h-[33px] transition duration-[250ms] px-[12px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.013125em] select-none
                active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer mb-[12px]
            `}
            onClick={async () => {
              setLoadingButton(true);
              const res = await replyToVacancy(
                vacId,
                resumeInput,
                letterInput,
                filesState.length
              );
              setStatus(res?.message);
              setLoadingButton(false);
              console.log(res);

              if (!res) {
                let chatId = await chechIfChatExist(hrId);
                toast(`📨 Вы откликнулись`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                  bodyStyle: { color: "#5875e8" },

                  onClick: () => router.push(`/messenger/${chatId.id}`),
                });
                setModalState();
                setResumeInput("");
                setLetterInput("");
                setLoadingButton(false);
                router.refresh();
              } else {
                toast(`🙇 Cорри, что-то пропущено`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                router.refresh();
                setLoadingButton(false);
              }
            }}
          >
            {loadingButton ? (
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
            ) : (
              "Откликнуться"
            )}
          </div>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState} withScroll>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[34px] p-[12px] h-[calc(100%-61px)]">
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
              onChange={(val) => {
                setResumeInput(val);
                if (status)
                  setStatus(status?.filter((i) => !i.includes("inputLink")));
              }}
              caption={
                !status
                  ? null
                  : status?.includes("inputLink url")
                  ? "Неверный формат ссылки"
                  : null
              }
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
                <p
                  className={
                    status2?.includes("zxc type")
                      ? "text-[#F0BB31]"
                      : "text-[#8f8f8f]"
                  }
                >
                  PDF
                </p>
                <p
                  className={
                    status2?.includes("zxc size")
                      ? "text-[#F0BB31]"
                      : "text-[#8f8f8f]"
                  }
                >
                  Не более 10 МБ
                </p>
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
                    <div
                      className="flex flex-row justify-between items-center"
                      key={key}
                    >
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
                  {status &&
                    status?.includes("files maxlen") &&
                    filesState.length > 3 && (
                      <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                        Максимум 3 файла
                      </p>
                    )}
                </>
              )
            )}

            <TextArea
              label={"Сопроводительное письмо"}
              style="mt-[12px]"
              value={letterInput}
              onChange={(val) => {
                setLetterInput(val);
                if (status)
                  setStatus(status?.filter((i) => !i.includes("inputMessage")));
              }}
              placeholder="Напишите о своих достижениях или мотивации, если хотите"
              minRows={3}
              maxRows={5}
              caption={
                !status
                  ? null
                  : status?.includes("inputMessage minlen")
                  ? "Поле обязательно к заполнению"
                  : status?.includes("inputMessage maxlen")
                  ? "Максимальная длинна поля 2000 сиволов"
                  : null
              }
            />
          </div>

          <div
            className={`rounded-[30px] mx-auto w-[112px] h-[33px] transition duration-[250ms] px-[12px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.013125em] select-none
                active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer mb-[12px]
            `}
            onClick={async () => {
              setLoadingButton(true);
              const res = await replyToVacancy(
                vacId,
                resumeInput,
                letterInput,
                filesState.length
              );
              setStatus(res?.message);
              setLoadingButton(false);
              console.log(res);

              if (!res) {
                let chatId = await chechIfChatExist(hrId);
                toast(`📨 Вы откликнулись`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                  bodyStyle: { color: "#5875e8" },

                  onClick: () => router.push(`/messenger/${chatId.id}`),
                });
                setModalState();
                setResumeInput("");
                setLetterInput("");
                setLoadingButton(false);
                router.refresh();
              } else {
                toast(`🙇 Cорри, что-то пропущено`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                router.refresh();
                setLoadingButton(false);
              }
            }}
          >
            {loadingButton ? (
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
            ) : (
              "Откликнуться"
            )}
          </div>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default ReplyModal;

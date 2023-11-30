"use client";

import uuid from "react-uuid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { ButtonSecondary, OneIconButton } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import SkillCard from "../../shared/ui/SkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import SkillsModalContent from "./SkillsModalContent";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import CheckBox from "../../shared/ui/CheckBox";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";

const EditRight = ({
  data,
  dataToCompare,
  setDataToUpdate,
  educationLevelData,
  dataToUpdate,
  updateProfileData,
  skills,
  status,
  setStatus,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const deleteHandler = (id, setFunc, state) => {
    setFunc(state.filter((item) => item.id !== id));
  };

  const [isOpen, toggle] = useState(false);

  const [educationState, setEducationState] = useState([]);
  const [workState, setWorkState] = useState([]);
  const [littleLoader, setLittleLoader] = useState(false);

  useEffect(() => {
    if (data.education.length == 0)
      setEducationState([
        {
          id: uuid(),
          name: "",
          degree: "",
        },
      ]);
    else setEducationState(data.education);
  }, []);

  useEffect(() => {
    if (data.workExperience.length == 0)
      setWorkState([
        {
          id: uuid(),
          organization: "",
          post: "",
          start_date: "",
          end_date: "",
        },
      ]);
    else setWorkState(data.workExperience);
  }, []);

  // это основополагающий базис practica
  let isDataChanged =
    JSON.stringify(dataToUpdate) !== JSON.stringify(dataToCompare) ||
    JSON.stringify(dataToUpdate.education) !== JSON.stringify(educationState) ||
    JSON.stringify(dataToUpdate.workExperience) !== JSON.stringify(workState);
  console.log(isDataChanged, "sosi hui");
  // это основополагающий базис practica

  return (
    <div className="w-full flex flex-col">
      {/* header */}
      <div
        className={`[@media(pointer:coarse)]:fixed ${
          isOpen
            ? "[@media(pointer:coarse)]:z-[-1]"
            : "[@media(pointer:coarse)]:z-[300]"
        } [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]`}
      >
        <div className="w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton
            onClick={() =>
              router.push("/profile", { query: { data: "update" } })
            }
          >
            <ArrowLeftIcon />
          </OneIconButton>

          <div
            onClick={async () => {
              if (isDataChanged) {
                setLittleLoader(true);
                const res = await updateProfileData({
                  ...dataToUpdate,
                  UserSkills: dataToUpdate.UserSkills.map(
                    (item) => true && { skillId: item.id }
                  ),
                  education:
                    educationState.length == 1 &&
                    (educationState[0].name.length == 0 ||
                      educationState[0].degree.length == 0)
                      ? []
                      : educationState,
                  workExperience:
                    workState.length == 1 &&
                    (workState[0].organization.length == 0 ||
                      workState[0].post.length == 0 ||
                      workState[0].start_date.length == 0 ||
                      workState[0].end_date.length == 0)
                      ? []
                      : workState,
                });
                console.log(res?.message, "ass");
                setStatus(res?.message);
                if (res?.submsg)
                  setStatus(
                    res?.message
                      ? [...res?.message, res?.submsg]
                      : [res?.submsg]
                  );

                if (!res) {
                  toast(`💾 Изменения сохранены`, {
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
                  setLittleLoader(false);
                } else {
                  setLittleLoader(false);
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
                  setLittleLoader(false);
                }
              }
            }}
            className={`
                px-[12px] py-[8px] rounded-[16px] transition duration-[250ms] select-none w-fit
                ${
                  isDataChanged && educationState.length > 0
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                    : "bg-[#74899B] bg-opacity-[8%] cursor-default"
                }
              `}
          >
            {littleLoader ? (
              <Oval
                height={19}
                width={19}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="rgba(255,255,255, 0.3)"
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <CheckIcon fill={true ? "#fff" : "#bfbfbf"} />
            )}
          </div>
        </div>
      </div>
      {/* header */}

      {/* body */}
      <div className="p-[12px] flex flex-col gap-[16px] rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px] bg-white dark:bg-[#212122]">
        {/* about me */}
        <Input
          placeholder="Расскажите о ваших мечтах и карьерных планах"
          label="Обо мне"
          maxLength={120}
          value={dataToUpdate.about}
          caption={
            !status
              ? null
              : status?.includes("inputAbout maxlen")
              ? "Максимальная длинна поля 120 сиволов"
              : null
          }
          onChange={(about) => {
            setDataToUpdate({
              ...dataToUpdate,
              about: about,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputAbout")));
          }}
        />
        {/* about me */}

        {/* isStartap */}
        <div className="flex flex-row items-center">
          {data.phone && data.phoneVerified ? (
            <CheckBox
              active={dataToUpdate.inSearch}
              onClick={() =>
                setDataToUpdate({
                  ...dataToUpdate,
                  inSearch: !dataToUpdate.inSearch,
                })
              }
            />
          ) : (
            <CheckBox disabled />
          )}
          <TextSecondary
            text={
              data.phone && data.phoneVerified
                ? "В поиске работы?"
                : "В поиске работы? Нужно указать контактные данные."
            }
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
          />
        </div>
        {/* isStartap */}

        {/* EducationLevel */}
        <div className="flex flex-col w-full">
          <TextSecondary
            text={"Высшее образование"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            city={
              dataToUpdate?.educationLevel === null
                ? ""
                : dataToUpdate?.educationLevel?.text
            }
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                educationLevel: val,
              });
            }}
            items={educationLevelData}
            placeholder={"Да"}
          />
        </div>
        {/* EducationLevel */}

        {/* education */}
        <Education
          educationState={educationState}
          setEducationState={(choise) => setEducationState(choise)}
          deleteHandler={(id, setState, state) =>
            deleteHandler(id, setState, state)
          }
        />
        {/* education */}

        {/* work expirience */}
        <WorkExperience
          workState={workState}
          setWorkState={(choise) => setWorkState(choise)}
          deleteHandler={(id, setState, state) =>
            deleteHandler(id, setState, state)
          }
        />
        {/* work expirience */}

        {/* skills */}
        {/* skills */}
        <div className="flex flex-col relative gap-[16px]">
          {dataToUpdate.UserSkills.length === 0 ? (
            <div className="flex flex-col">
              <TextSecondary
                text={"Скиллы"}
                style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
              />
              <AddCityIcon onClick={() => toggle(true)} />
            </div>
          ) : (
            <>
              {dataToUpdate.UserSkills.filter((item) => item.type !== "soft")
                .length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Хард-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.UserSkills.map(
                      (item) =>
                        item.type === "hard" && (
                          <SkillCard
                            noCopy
                            onClick={() => toggle(true)}
                            text={item.name}
                            key={item.id}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
              {dataToUpdate.UserSkills.filter((item) => item.type !== "hard")
                .length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Софт-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.UserSkills.map(
                      (item) =>
                        item.type === "soft" && (
                          <SkillCard
                            noCopy
                            onClick={() => toggle(true)}
                            soft
                            hard={false}
                            text={item.name}
                            key={item.id}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* skills */}
        {/* skills */}
      </div>
      {/* body */}

      {/* skills modal */}
      <SkillsModalContent
        data={dataToUpdate.UserSkills}
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        skills={skills}
      />
      {/* skills modal */}
    </div>
  );
};

export default EditRight;

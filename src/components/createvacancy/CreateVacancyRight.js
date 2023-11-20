"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { ButtonSecondary, OneIconButton } from "../../shared/ui/Button";
import { Input, TextArea } from "../../shared/ui/Input";
import DropDown from "../../shared/ui/DropDown";
import SkillsModalContent from "../Edit/SkillsModalContent";
import SkillCard from "../../shared/ui/SkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import { createVacancyHandler } from "../../server/actions/company/createVacancyHandler";
import { fetchVacancyData } from "../../server/actions/vacancy/fetchVacancyData";
import CustomLoader from "../../shared/ui/CustomLoader";
import Card from "../../shared/ui/Card";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import SkillsModalVacs from "../Edit/SkillsModalVacs";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import PlusIcon from "../../shared/icons/PlusIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";
import CheckBox from "../../shared/ui/CheckBox";

const CreateVacancyRight = ({ dataToUpdate, setDataToUpdate, skills }) => {
  const router = useRouter();
  console.log(dataToUpdate, "as");

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  // validate
  const [status, setStatus] = useState(null);
  // validate

  const [littleLoader, setLittleLoader] = useState(false);
  const [isOpen, toggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropData, setDropData] = useState([]);
  const [state6, setState6] = useState(false);
  const [state7, setState7] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchVacancyData();
    console.log("vacancy dd data: ", data);
    setDropData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col [@media(hover)]:ml-[276px] [@media(hover)]:mt-[24px] hideScrollbarNavMobile">
      {/* header */}
      <div className="[@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]">
        <div className="w-full flex flex-row  justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton onClick={() => router.back()}>
            <ArrowLeftIcon />
          </OneIconButton>

          <div
            onClick={async () => {
              setLittleLoader(true);
              const res = await createVacancyHandler({
                ...dataToUpdate,
                VacancySkills: dataToUpdate.VacancySkills.map(
                  (item) => true && { skillId: item.id }
                ),
              });
              console.log(res, "asswe");
              setStatus(res?.message);
              if (!res) {
                toast(`💼 Вакансия создана`, {
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
                setLittleLoader(false);
              } else {
                setLittleLoader(false);
              }
            }}
            className={`
                px-[12px] py-[8px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none h-[36px] w-[44px]
                ${
                  true
                    ? "bg-[#8295DE] hover:bg-[#5875E8] active:bg-[#3A56C5]"
                    : "bg-[#74899B] bg-opacity-[8%]"
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
      <div
        className={`${
          loading ? "[@media(hover)]:h-full" : "[@media(hover)]:h-fit"
        } [@media(hover)]:max-h-[calc(100%)] hideScrollbarNavMobile  [@media(hover)]:overflow-y-auto flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]`}
      >
        {!loading ? (
          <>
            {/* первая сосиска */}
            <div className="flex bg-white dark:bg-[#212122] flex-col gap-[16px] p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px]">
              {/* name */}
              <Input
                placeholder="Менеджер по продажам бананов"
                label="Название вакансии"
                // maxLength={80}
                defaultValue={dataToUpdate?.name}
                value={dataToUpdate.name}
                onChange={(name) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    name: name,
                  });
                  if (status)
                    setStatus(status?.filter((i) => !i.includes("inputName")));
                }}
                caption={
                  !status
                    ? null
                    : status?.includes("inputName minlen")
                    ? "Поле обязательно к заполнению"
                    : status?.includes("inputName maxlen")
                    ? "Максимальная длинна поля 80 сиволов"
                    : null
                }
              />
              {/* name */}

              {/* short description */}
              <TextArea
                placeholder="Опишите в одном предложении, какой специалист вам нужен и для чего. Это очень даже сильно увелит реакцию на нее в ленте."
                label="Краткое описание"
                minRows={2}
                maxRows={5}
                caption={
                  !status
                    ? null
                    : status?.includes("inputShortDesc maxlen")
                    ? "Максимальная длинна поля 240 сиволов"
                    : null
                }
                // maxLength={240}
                defaultValue={dataToUpdate?.shortDescription}
                onChange={(shortDescription) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    shortDescription: shortDescription,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputShortDesc"))
                    );
                }}
              />
              {/* short description */}
            </div>
            {/* первая сосиска */}

            {/* вторая сосиска */}
            <Card padding={12} style={"flex flex-col gap-[16px]"}>
              {/* description */}
              <TextArea
                placeholder="Начните с описания в одном предложении, какой специалист вам нужен и для чего. Это резко улучшает реакцию. "
                label="Описание работы и обязанности"
                // maxLength={640}
                minRows={2}
                maxRows={5}
                defaultValue={dataToUpdate?.description}
                onChange={(description) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    description: description,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputDescription"))
                    );
                }}
                caption={
                  !status
                    ? null
                    : status?.includes("inputDescription minlen")
                    ? "Поле обязательно к заполнению"
                    : status?.includes("inputDescription maxlen")
                    ? "Максимальная длинна поля 640 сиволов"
                    : null
                }
              />
              {/* description */}

              {/* conditions */}
              <Input
                placeholder="Опишите условия работы"
                label="Условия"
                // maxLength={480}
                caption={
                  !status
                    ? null
                    : status?.includes("inputConditions maxlen")
                    ? "Максимальная длинна поля 480 сиволов"
                    : null
                }
                value={dataToUpdate?.conditions}
                onChange={(conditions) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    conditions: conditions,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputConditions"))
                    );
                }}
              />
              {/* conditions */}

              {/* waitings */}
              <Input
                placeholder="Опишите какими навыками должен обладать ваш работник мечты"
                label="Что вы ждете от соискателя"
                // maxLength={480}
                caption={
                  !status
                    ? null
                    : status?.includes("inputWaitings maxlen")
                    ? "Максимальная длинна поля 480 сиволов"
                    : null
                }
                value={dataToUpdate?.waitings}
                onChange={(waitings) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    waitings: waitings,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputWaitings"))
                    );
                }}
              />
              {/* waitings */}
            </Card>
            {/* вторая сосиска */}

            {/* третья сосиска */}
            <Card
              padding={12}
              style={"flex flex-col [@media(hover)]:mb-[24px] gap-[16px] h-fit"}
            >
              {/* area */}
              <div className="flex flex-col relative">
                <TextSecondary
                  text={"Сфера"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                {dataToUpdate.vacArea.length > 0 ? (
                  <div className="[@media(hover)]:w-[680px] flex-wrap flex flex-row gap-[10px]">
                    {dataToUpdate.vacArea.map((item, key) => (
                      <SkillCard
                        onClick={() => setState6(true)}
                        noCopy
                        area
                        hard={false}
                        text={item.label}
                      />
                    ))}
                  </div>
                ) : (
                  <AddCityIcon area onClick={() => setState6(true)} />
                )}
                <DropDownWithChoise
                  state={state6}
                  setState={setState6}
                  city={dataToUpdate.vacArea}
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      vacArea: val,
                    });
                  }}
                  items={dropData?.area}
                  placeholder="Сфера"
                />
              </div>
              {/* area */}
              {/* location */}
              <div className="flex flex-col relative">
                <TextSecondary
                  text={"Локация"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                {dataToUpdate.Location.length > 0 ? (
                  <p
                    className={
                      "text-[14px] break-words text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[18px] tracking-[-0.182px] cursor-pointer [@media(hover)]:w-[680px]"
                    }
                    onClick={() => setState7(true)}
                  >
                    {dataToUpdate.Location.map(
                      (item, key) =>
                        item.label +
                        `${
                          key === dataToUpdate.Location.length - 1 ? "" : ", "
                        }`
                    )}
                  </p>
                ) : (
                  <AddCityIcon onClick={() => setState7(true)} />
                )}
                <DropDownWithChoise
                  state={state7}
                  setState={setState7}
                  city={dataToUpdate.Location}
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      Location: val,
                    });
                  }}
                  items={dropData?.cities}
                  placeholder="Сфера"
                />
              </div>
              {/* location */}

              {/* distantWork */}
              <div className="flex flex-row items-center w-full">
                <CheckBox
                  active={dataToUpdate.distantWork}
                  onClick={() =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      distantWork: !dataToUpdate.distantWork,
                    })
                  }
                />
                <TextSecondary
                  text={"Возможно удалённо"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                />
              </div>
              {/* distantWork */}

              <div className="flex [@media(hover)]:flex-row [@media(pointer:coarse)]:flex-col [@media(hover)]:gap-[12px] [@media(pointer:coarse)]:gap-[16px]">
                {/* format */}
                <div className="flex flex-col w-full">
                  <TextSecondary
                    text={"Занятость"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <DropDownWithSearch
                    city={
                      dataToUpdate?.format?.label.length === 0
                        ? ""
                        : dataToUpdate?.format?.label
                    }
                    setCity={(val) => {
                      setDataToUpdate({
                        ...dataToUpdate,
                        format: val,
                      });
                    }}
                    items={dropData.format}
                    placeholder={"Полный день"}
                  />
                </div>
                {/* format */}
                {/* contract */}
                <div className="flex flex-col w-full">
                  <TextSecondary
                    text={"Тип договора"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <DropDownWithSearch
                    city={
                      dataToUpdate?.contract?.label.length === 0
                        ? ""
                        : dataToUpdate?.contract?.label
                    }
                    setCity={(val) => {
                      setDataToUpdate({
                        ...dataToUpdate,
                        contract: val,
                      });
                    }}
                    items={dropData.contract}
                    placeholder={"Работа"}
                  />
                </div>
                {/* contract */}
              </div>
              {/* expirience */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"Опыт"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                <DropDownWithSearch
                  city={
                    dataToUpdate?.experience?.label.length === 0
                      ? ""
                      : dataToUpdate?.experience?.label
                  }
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      experience: val,
                    });
                  }}
                  items={dropData.experience}
                  placeholder={"От 1 года до 3 лет"}
                />
              </div>
              {/* expirience */}
              {/* EducationLevel */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"Высшее образование"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                <DropDownWithSearch
                  city={
                    dataToUpdate?.EducationLevel?.label.length === 0
                      ? ""
                      : dataToUpdate?.EducationLevel?.label
                  }
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      EducationLevel: val,
                    });
                  }}
                  items={dropData.EducationLevel}
                  placeholder={"Выберите статус"}
                />
              </div>
              {/* EducationLevel */}

              {/* skills */}
              <div className="flex flex-col relative gap-[16px]">
                {dataToUpdate.VacancySkills.length === 0 ? (
                  <div className="flex flex-col">
                    <TextSecondary
                      text={"Скиллы"}
                      style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                    />
                    <AddCityIcon onClick={() => toggle(true)} />
                  </div>
                ) : (
                  <>
                    {dataToUpdate.VacancySkills.filter(
                      (item) => item.type !== "soft"
                    ).length > 0 && (
                      <div className="flex flex-col gap-[8px]">
                        <TextSecondary
                          text={"Хард-скиллы"}
                          style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                        />

                        <div className="flex flex-row gap-[8px] flex-wrap">
                          {dataToUpdate.VacancySkills.map(
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
                    {dataToUpdate.VacancySkills.filter(
                      (item) => item.type !== "hard"
                    ).length > 0 && (
                      <div className="flex flex-col gap-[8px]">
                        <TextSecondary
                          text={"Софт-скиллы"}
                          style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                        />

                        <div className="flex flex-row gap-[8px] flex-wrap">
                          {dataToUpdate.VacancySkills.map(
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

              {/* salary */}
              {!dataToUpdate.prisceByTalk && (
                <div className="flex flex-col">
                  <TextSecondary
                    text={"Зарплата в месяц"}
                    style="font-medium text-[14px] leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <div className="flex flex-row [@media(pointer:coarse)]:flex-col gap-[8px]">
                    <Input
                      caption={
                        !status
                          ? null
                          : status?.includes("inputStart minlen")
                          ? "Поле обязательно к заполнению"
                          : null
                      }
                      placeholder="От"
                      value={dataToUpdate?.salaryStart}
                      onChange={(salaryStart) => {
                        if (!dataToUpdate.prisceByTalk) {
                          setDataToUpdate({
                            ...dataToUpdate,
                            salaryStart: salaryStart,
                          });
                          if (status)
                            setStatus(
                              status?.filter((i) => !i.includes("inputStart"))
                            );
                        }
                      }}
                    />
                    <Input
                      caption={
                        !status
                          ? null
                          : status?.includes("inputEnd minlen")
                          ? "Поле обязательно к заполнению"
                          : null
                      }
                      placeholder="До"
                      value={dataToUpdate?.salaryEnd}
                      onChange={(salaryEnd) => {
                        if (!dataToUpdate.prisceByTalk) {
                          setDataToUpdate({
                            ...dataToUpdate,
                            salaryEnd: salaryEnd,
                          });
                          if (status)
                            setStatus(
                              status?.filter((i) => !i.includes("inputEnd"))
                            );
                        }
                      }}
                    />
                    <div className="flex flex-col">
                      <DropDownWithSearch
                        city={
                          dataToUpdate?.currency?.label.length === 0
                            ? ""
                            : dataToUpdate?.currency?.label
                        }
                        setCity={(val) => {
                          setDataToUpdate({
                            ...dataToUpdate,
                            currency: val,
                          });
                          if (status)
                            setStatus(
                              status?.filter((i) => !i.includes("currency"))
                            );
                        }}
                        items={dropData.currency}
                        placeholder={"RUB"}
                      />
                      {status && status?.includes("currency minlen") && (
                        <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                          Поле обязательно к заполнению
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* salary */}

              {/* prisceByTalk */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"По договоренности"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />

                <CheckBox
                  active={dataToUpdate.prisceByTalk}
                  onClick={() => {
                    if (dataToUpdate.prisceByTalk === true)
                      setDataToUpdate({
                        ...dataToUpdate,
                        salaryEnd: "",
                        salaryStart: "",
                        currency: { label: "" },
                        prisceByTalk: false,
                      });
                    else
                      setDataToUpdate({
                        ...dataToUpdate,
                        salaryEnd: "d",
                        salaryStart: "d",
                        currency: { label: "d" },
                        prisceByTalk: true,
                      });
                  }}
                />
              </div>
              {/* prisceByTalk */}
            </Card>
          </>
        ) : (
          <div className="h-full w-full mt-[24px] flex items-center justify-center">
            <CustomLoader />
          </div>
        )}
      </div>
      {/* body */}

      {/* skills modal */}
      <SkillsModalVacs
        withAreas
        areas={dataToUpdate?.vacArea}
        data={dataToUpdate.VacancySkills}
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        skills={skills}
        forVacancy
      />
      {/* skills modal */}
    </div>
  );
};

export default CreateVacancyRight;

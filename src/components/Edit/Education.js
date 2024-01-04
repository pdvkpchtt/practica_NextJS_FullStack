"use client";

import uuid from "react-uuid";

import { ButtonSecondary } from "../../shared/ui/Button";

import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import TextSecondary from "../../shared/Text/TextSecondary";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";

let years = function (startYear) {
  var currentYear = new Date().getFullYear(),
    years = [],
    count = 1;
  startYear = startYear || 1980;
  while (startYear <= currentYear + 5)
    years.push({ label: `${startYear++}`, value: `${count++}`, for: `Год` });
  return years;
};

const yearDropDownInfo = years(1900).reverse();

const Education = ({
  educationState,
  setEducationState,
  deleteHandler,
  status,
}) => {
  if (educationState.length == 0)
    return (
      <div className="flex flex-col gap-[8px]">
        <TextSecondary
          text={"Образование"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <ButtonSecondary
          small
          text="Добавить"
          style="w-fit px-[12px]"
          onClick={() => {
            setEducationState([
              ...educationState,
              {
                id: uuid(),
                name: null,
                degree: null,
                startDate: null,
                endDate: null,
              },
            ]);
          }}
        >
          <PlusIcon />
        </ButtonSecondary>
      </div>
    );

  return (
    <>
      {/* education */}
      {educationState.map((item, key) => (
        <div key={key} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <TextSecondary
              text={
                educationState.length == 1
                  ? "Образование"
                  : `Образование ${key + 1}`
              }
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            <input
              maxLength={60}
              placeholder="Университет или курс"
              className="px-[12px] rounded-[8px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
              value={item.name || ""}
              onChange={(e) => {
                setEducationState(
                  educationState.map((item, index) =>
                    index === key ? { ...item, name: e.target.value } : item
                  )
                );
              }}
            />
            <input
              maxLength={60}
              placeholder="Название курса или степень обучения"
              className="px-[12px] rounded-[8px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
              value={item.degree || ""}
              onChange={(e) => {
                setEducationState(
                  educationState.map((item, index) =>
                    index === key ? { ...item, degree: e.target.value } : item
                  )
                );
              }}
            />

            <div className="w-full flex flex-row gap-[8px] [@media(pointer:coarse)]:flex-col">
              <div className="w-full flex flex-col gap-[6px]">
                <TextSecondary
                  text={"Год начала обучения"}
                  style="font-medium text-[14px] select-none leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                />
                <DropDownWithSearch
                  styled={`w-full`}
                  city={item.startDate || ""}
                  setCity={(val) => {
                    setEducationState(
                      educationState.map((item, index) =>
                        index === key ? { ...item, startDate: val.label } : item
                      )
                    );
                    if (
                      Number(val.label) > Number(item.endDate) &&
                      item.endDate !== null
                    )
                      setEducationState(
                        educationState.map((item, index) =>
                          index === key ? { ...item, endDate: "" } : item
                        )
                      );
                  }}
                  items={yearDropDownInfo}
                  placeholder={"Год"}
                />
              </div>

              <div className="w-full relative">
                {educationState[key]?.startDate === null && (
                  <div className="absolute w-full h-full z-[50]" />
                )}
                <div className="w-full flex flex-col gap-[6px]">
                  <TextSecondary
                    text={"Год окончания обучения"}
                    style="font-medium text-[14px] select-none leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />
                  <DropDownWithSearch
                    styled={`w-full ${
                      educationState[key]?.startDate === null && "opacity-[30%]"
                    }`}
                    city={item.endDate || ""}
                    setCity={(val) => {
                      setEducationState(
                        educationState.map((item, index) =>
                          index === key ? { ...item, endDate: val.label } : item
                        )
                      );
                    }}
                    items={
                      educationState[key].startDate === null
                        ? yearDropDownInfo
                        : yearDropDownInfo.filter(
                            (i) =>
                              Number(educationState[key].startDate) <=
                              Number(i.label)
                          )
                    }
                    placeholder={"Год"}
                  />
                </div>
              </div>
            </div>
          </div>

          {key + 1 == educationState.length ? (
            <div className="flex flex-row gap-[8px]">
              <ButtonSecondary
                small
                text="Добавить"
                style="w-fit px-[12px]"
                onClick={() => {
                  setEducationState([
                    ...educationState,
                    {
                      id: uuid(),
                      name: null,
                      degree: null,
                      startDate: null,
                      endDate: null,
                    },
                  ]);
                }}
              >
                <PlusIcon />
              </ButtonSecondary>
              <ButtonSecondary
                style="w-fit px-[12px]"
                small
                text=""
                onClick={() => {
                  deleteHandler(item.id, setEducationState, educationState);
                }}
              >
                <TrashIcon />
              </ButtonSecondary>
            </div>
          ) : (
            <ButtonSecondary
              style="w-fit px-[12px]"
              small
              text=""
              onClick={() => {
                deleteHandler(item.id, setEducationState, educationState);
              }}
            >
              <TrashIcon />
            </ButtonSecondary>
          )}
        </div>
      ))}
      {/* education */}
    </>
  );
};

export default Education;

"use client";

import uuid from "react-uuid";

import { ButtonSecondary } from "../../shared/ui/Button";

import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import TextSecondary from "../../shared/Text/TextSecondary";
import DropDown from "../../shared/ui/DropDown";

const yearDropDownInfo = [
  { label: "1995", value: "1", for: "Год" },
  { label: "1996", value: "2", for: "Год" },
  { label: "1997", value: "3", for: "Год" },
  { label: "1998", value: "4", for: "Год" },
  { label: "1999", value: "5", for: "Год" },
  { label: "2000", value: "6", for: "Год" },
  { label: "2001", value: "7", for: "Год" },
  { label: "2002", value: "8", for: "Год" },
  { label: "2003", value: "9", for: "Год" },
  { label: "2004", value: "10", for: "Год" },
  { label: "2005", value: "11", for: "Год" },
  { label: "2006", value: "12", for: "Год" },
  { label: "2007", value: "13", for: "Год" },
  { label: "2008", value: "14", for: "Год" },
  { label: "2009", value: "15", for: "Год" },
  { label: "2010", value: "16", for: "Год" },
  { label: "2011", value: "17", for: "Год" },
  { label: "2012", value: "18", for: "Год" },
  { label: "2013", value: "19", for: "Год" },
  { label: "2014", value: "20", for: "Год" },
  { label: "2015", value: "21", for: "Год" },
  { label: "2016", value: "22", for: "Год" },
  { label: "2017", value: "23", for: "Год" },
  { label: "2018", value: "24", for: "Год" },
  { label: "2019", value: "25", for: "Год" },
  { label: "2020", value: "26", for: "Год" },
  { label: "2021", value: "27", for: "Год" },
  { label: "2022", value: "28", for: "Год" },
  { label: "2023", value: "29", for: "Год" },
  { label: "2024", value: "30", for: "Год" },
  { label: "2025", value: "31", for: "Год" },
  { label: "2026", value: "32", for: "Год" },
  { label: "2027", value: "33", for: "Год" },
  { label: "2028", value: "34", for: "Год" },
  { label: "2029", value: "35", for: "Год" },
  { label: "2030", value: "36", for: "Год" },
  { label: "2031", value: "37", for: "Год" },
  { label: "2032", value: "38", for: "Год" },
  { label: "2033", value: "39", for: "Год" },
  { label: "2034", value: "40", for: "Год" },
  { label: "2035", value: "41", for: "Год" },
  { label: "2036", value: "42", for: "Год" },
  { label: "2037", value: "43", for: "Год" },
  { label: "2038", value: "44", for: "Год" },
  { label: "2039", value: "45", for: "Год" },
  { label: "2040", value: "46", for: "Год" },
];

const Education = ({ educationState, setEducationState, deleteHandler }) => {
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
              <DropDown
                label="Год начала обучения"
                styled="w-full"
                // choise={item.split(" ")[1] || "Год"}
                choise={item.startDate ? item.startDate : "Год"}
                handleSetChoise={(e) =>
                  setEducationState(
                    educationState.map((item, index) =>
                      index === key ? { ...item, startDate: e } : item
                    )
                  )
                }
                items={yearDropDownInfo}
                itemsFor={"Год"}
              />
              <DropDown
                label="Год окончания обучения"
                styled="w-full"
                // choise={item.split(" ")[1] || "Год"}
                choise={item.endDate ? item.endDate : "Год"}
                handleSetChoise={(e) =>
                  setEducationState(
                    educationState.map((item, index) =>
                      index === key ? { ...item, endDate: e } : item
                    )
                  )
                }
                items={yearDropDownInfo}
                itemsFor={"Год"}
              />
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
                    { id: uuid(), name: "", degree: "" },
                  ]);
                }}
              >
                <PlusIcon />
              </ButtonSecondary>
              {key != 0 && (
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

"use client";

import uuid from "react-uuid";

import { ButtonSecondary } from "../../shared/ui/Button";

import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import TextSecondary from "../../shared/Text/TextSecondary";

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

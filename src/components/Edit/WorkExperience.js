"use client";

import uuid from "react-uuid";

import DropDownHandler from "./DropDownHandler";
import { ButtonSecondary } from "../../shared/ui/Button";
import TextSecondary from "../../shared/Text/TextSecondary";

import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";

const WorkExperience = ({ workState, setWorkState, deleteHandler, status }) => {
  return (
    <>
      {workState.map((item, key) => (
        <div key={key} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <TextSecondary
              text={
                workState.length == 1 ? "Опыт работы" : `Опыт работы ${key + 1}`
              }
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            {status && status?.includes("educatWork check") && (
              <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[-5px] text-[#F0BB31]">
                Проверьте корректность заполнения полей
              </p>
            )}
            <input
              maxLength={60}
              placeholder="Компания"
              className="px-[12px] rounded-[8px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
              value={item.organization || ""}
              onChange={(e) => {
                setWorkState(
                  workState.map((item, index) =>
                    index === key
                      ? { ...item, organization: e.target.value }
                      : item
                  )
                );
              }}
            />
            <input
              maxLength={60}
              placeholder="Должность"
              value={item.post || ""}
              className="px-[12px] rounded-[8px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
              onChange={(e) => {
                setWorkState(
                  workState.map((item, index) =>
                    index === key ? { ...item, post: e.target.value } : item
                  )
                );
              }}
            />
          </div>

          <div className="flex flex-row gap-[32px] items-center [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:gap-[16px]">
            <div className="flex flex-col gap-[6px] w-full ">
              <TextSecondary
                text={"Дата начала работы"}
                style="font-medium text-[14px] select-none leading-[18px] tracking-[-0.013em] whitespace-nowrap"
              />
              <DropDownHandler
                item={item.start_date}
                onUpdate={(value) =>
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, start_date: value } : item
                    )
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-[6px] w-full ">
              <TextSecondary
                text={"Дата окончания работы"}
                style="font-medium text-[14px] select-none leading-[18px] tracking-[-0.013em] whitespace-nowrap"
              />
              <DropDownHandler
                item={item.end_date}
                onUpdate={(value) =>
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, end_date: value } : item
                    )
                  )
                }
              />
            </div>
          </div>

          {key + 1 == workState.length ? (
            <div className="flex flex-row gap-[8px]">
              <ButtonSecondary
                small
                text="Добавить"
                style="w-fit px-[12px]"
                onClick={() =>
                  setWorkState([
                    ...workState,
                    {
                      id: uuid(),
                    },
                  ])
                }
              >
                <PlusIcon />
              </ButtonSecondary>
              {key != 0 && (
                <ButtonSecondary
                  style="w-fit px-[12px]"
                  small
                  text=""
                  onClick={() =>
                    deleteHandler(item.id, setWorkState, workState)
                  }
                >
                  <TrashIcon />
                </ButtonSecondary>
              )}
            </div>
          ) : (
            <ButtonSecondary
              small
              style="w-fit px-[12px]"
              text=""
              onClick={() => deleteHandler(item.id, setWorkState, workState)}
            >
              <TrashIcon />
            </ButtonSecondary>
          )}
        </div>
      ))}
    </>
  );
};

export default WorkExperience;

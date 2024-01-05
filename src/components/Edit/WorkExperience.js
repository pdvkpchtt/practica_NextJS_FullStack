"use client";

import uuid from "react-uuid";
import { useState } from "react";

import DropDownHandler from "./DropDownHandler";
import { ButtonSecondary } from "../../shared/ui/Button";
import TextSecondary from "../../shared/Text/TextSecondary";

import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import CheckBox from "../../shared/ui/CheckBox";

const WorkExperience = ({ workState, setWorkState, deleteHandler, status }) => {
  if (workState.length == 0)
    return (
      <div className="flex flex-col gap-[8px]">
        <TextSecondary
          text={"Опыт работы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <ButtonSecondary
          small
          text="Добавить"
          style="w-fit px-[12px]"
          onClick={() => {
            setWorkState([
              ...workState,
              {
                id: uuid(),
                organization: null,
                post: null,
                start_month: null,
                start_year: null,
                end_month: null,
                end_year: null,
                isStill: false,
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
      {workState.map((item, key) => (
        <div key={key} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <TextSecondary
              text={
                workState.length == 1 ? "Опыт работы" : `Опыт работы ${key + 1}`
              }
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />

            <input
              maxLength={60}
              placeholder="Компания"
              className="px-[12px] rounded-[8px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
              value={item.organization || ""}
              onChange={(e) => {
                if (e.target.value?.length === 0)
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, organization: null } : item
                    )
                  );
                else
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
                if (e.target.value?.length === 0)
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, post: null } : item
                    )
                  );
                else
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
                start
                item={item}
                onUpdateMonth={(value) =>
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, start_month: value } : item
                    )
                  )
                }
                onUpdateYear={(value) => {
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, start_year: value } : item
                    )
                  );
                  if (
                    Number(value) > Number(workState[key]?.end_year) &&
                    workState[key]?.end_year !== null
                  )
                    setWorkState(
                      workState.map((item, index) =>
                        index === key
                          ? { ...item, end_year: null, start_year: value }
                          : item
                      )
                    );
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] w-full relative">
              <TextSecondary
                text={"Дата окончания работы"}
                style="font-medium text-[14px] select-none leading-[18px] tracking-[-0.013em] whitespace-nowrap"
              />
              <DropDownHandler
                start={false}
                end
                isStill={
                  item.isStill ||
                  workState[key]?.start_month === null ||
                  workState[key]?.start_year === null
                }
                item={item}
                onUpdateMonth={(value) =>
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, end_month: value } : item
                    )
                  )
                }
                onUpdateYear={(value) => {
                  setWorkState(
                    workState.map((item, index) =>
                      index === key ? { ...item, end_year: value } : item
                    )
                  );
                }}
              />

              {(item.isStill === true ||
                workState[key]?.start_month === null ||
                workState[key]?.start_year === null) && (
                <div className="absolute w-full h-full z-[50]" />
              )}
            </div>
          </div>

          {key + 1 == workState.length ? (
            <div className="w-full flex [@media(hover)]:flex-row [@media(pointer:coarse)]:flex-col-reverse [@media(pointer:coarse)]:gap-[16px]">
              <div className="flex flex-row gap-[8px] [@media(hover)]:w-[356px]">
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
              </div>
              <div className="flex flex-row items-center">
                <CheckBox
                  active={item.isStill}
                  onClick={() => {
                    if (item.isStill === true)
                      setWorkState(
                        workState.map((i, index) =>
                          index === key
                            ? {
                                ...i,
                                isStill: false,
                                end_month: null,
                                end_year: null,
                              }
                            : i
                        )
                      );
                    else
                      setWorkState(
                        workState.map((i, index) =>
                          index === key
                            ? {
                                ...i,
                                isStill: true,
                                end_month: "Месяц",
                                end_year: "Год",
                              }
                            : i
                        )
                      );
                  }}
                />
                <TextSecondary
                  text="Сейчас работаю на этой должности"
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex [@media(hover)]:flex-row [@media(pointer:coarse)]:flex-col-reverse [@media(pointer:coarse)]:gap-[16px]">
              <div className="[@media(hover)]:w-[356px]">
                <ButtonSecondary
                  small
                  style="w-fit px-[12px]"
                  text=""
                  onClick={() =>
                    deleteHandler(item.id, setWorkState, workState)
                  }
                >
                  <TrashIcon />
                </ButtonSecondary>
              </div>
              <div className="flex flex-row items-center">
                <CheckBox
                  active={item.isStill}
                  onClick={() => {
                    if (item.isStill === true)
                      setWorkState(
                        workState.map((i, index) =>
                          index === key
                            ? {
                                ...i,
                                isStill: false,
                                end_month: null,
                                end_year: null,
                              }
                            : i
                        )
                      );
                    else
                      setWorkState(
                        workState.map((i, index) =>
                          index === key
                            ? {
                                ...i,
                                isStill: true,
                                end_month: "Месяц",
                                end_year: "Год",
                              }
                            : i
                        )
                      );
                  }}
                />
                <TextSecondary
                  text="Сейчас работаю на этой должности"
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default WorkExperience;

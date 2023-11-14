"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { OneIconButton } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";
import TextSecondary from "../../shared/Text/TextSecondary";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import CheckBox from "../../shared/ui/CheckBox";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";

const EditCompanyRight = ({
  dataToCompare,
  setDataToUpdate,
  dataToUpdate,
  updateCompanyData,
  itemsForDD,
  itemsForDD2,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  console.log(dataToUpdate);

  const [littleLoader, setLittleLoader] = useState(false);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  // это основополагающий базис practica
  let isDataChanged =
    JSON.stringify(dataToUpdate) !== JSON.stringify(dataToCompare);
  console.log(
    isDataChanged,
    "sosi hui",
    dataToCompare.industry.label !== dataToUpdate.industry.label
  );
  // это основополагающий базис practica

  return (
    <div className="w-full flex flex-col hideScrollbarNavMobile">
      {/* header */}
      <div className="[@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:z-[300] [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]">
        <div className="w-full flex flex-row  justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton
            onClick={() =>
              router.push(`/companyprofile`, { query: { data: "update" } })
            }
          >
            <ArrowLeftIcon />
          </OneIconButton>

          <div
            onClick={async () => {
              if (isDataChanged) {
                setLittleLoader(true);
                // try {
                await updateCompanyData(dataToUpdate);

                toast(`🦄 Изменения сохранены`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                // } catch (err) {
                // console.log("err");
                // }
                setLittleLoader(false);
                router.refresh();
              }
            }}
            className={`
                px-[12px] py-[8px] h-[36px] w-[44px] rounded-[16px]  transition duration-[250ms] select-none 
                ${
                  isDataChanged
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
      <div
        className={`h-fit hideScrollbarNavMobile p-[12px] flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px] rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px] bg-white dark:bg-[#212122]`}
      >
        {/* slogan */}
        <Input
          placeholder="«Объединяя профессионалов»"
          label="Слоган"
          value={dataToUpdate?.slogan}
          onChange={(slogan) =>
            setDataToUpdate({
              ...dataToUpdate,
              slogan: slogan,
            })
          }
        />
        {/* slogan */}

        {/* industry */}
        <div className="flex flex-col">
          <TextSecondary
            text={"Отрасль"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            state={state}
            setState={setState}
            city={
              dataToUpdate?.industry?.length === 0
                ? ""
                : dataToUpdate?.industry?.label
            }
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                industry: val,
              });
              console.log(val, "lll");
            }}
            items={itemsForDD}
            placeholder="Выберите отрасль"
          />
        </div>
        {/* industry */}

        {/* about me */}
        <Input
          placeholder="Миссия, принципы и ценности"
          label="О нас"
          value={dataToUpdate.about}
          onChange={(about) =>
            setDataToUpdate({
              ...dataToUpdate,
              about: about,
            })
          }
        />
        {/* about me */}

        {/* employee */}
        <div className="flex flex-col">
          <TextSecondary
            text={"Сотрудники"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            state={state2}
            setState={setState2}
            city={
              dataToUpdate?.employee?.length === 0
                ? ""
                : dataToUpdate?.employee?.label
            }
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                employee: val,
              });
              console.log(val, "lll");
            }}
            items={itemsForDD2}
            placeholder="от 100 до 500 человек"
          />
        </div>
        {/* employee */}

        {/* isStartap */}
        <div className="flex flex-row items-center">
          <CheckBox
            active={dataToUpdate.isStartap}
            onClick={() =>
              setDataToUpdate({
                ...dataToUpdate,
                isStartap: !dataToUpdate.isStartap,
              })
            }
          />
          <TextSecondary
            text={"Вы стартап?"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
          />
        </div>
        {/* isStartap */}
      </div>
      {/* body */}
    </div>
  );
};

export default EditCompanyRight;

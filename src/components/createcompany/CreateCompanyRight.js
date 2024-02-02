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
import { createCompany } from "../../server/actions/company/createCompany";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";

const CreateCompanyRight = ({
  dataToCompare,
  setDataToUpdate,
  dataToUpdate,
  itemsForDD,
  itemsForDD2,
  status,
  setStatus,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [littleLoader, setLittleLoader] = useState(false);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  // это основополагающий базис practica
  let isDataChanged =
    JSON.stringify(dataToUpdate) !== JSON.stringify(dataToCompare);
  // это основополагающий базис practica

  return (
    <div className="w-full flex flex-col hideScrollbarNavMobile">
      {/* header */}
      <div className="[@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:z-[300] [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]">
        <div
          className={`w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto`}
        >
          <OneIconButton
            onClick={() =>
              router.push(`/profile`, {
                query: { data: "update" },
              })
            }
          >
            <ArrowLeftIcon />
          </OneIconButton>
          <div
            onClick={async () => {
              if (isDataChanged) {
                setLittleLoader(true);
                // try {
                const res = await createCompany({ data: dataToUpdate });
                console.log(res, "ochko");
                setStatus(res?.message);
                if (res?.submsg)
                  setStatus(
                    res?.message
                      ? [...res?.message, res?.submsg]
                      : [res?.submsg]
                  );
                console.log(res);
                if (!res) {
                  // toast(`💾 Изменения сохранены`, {
                  //   position: isMobile ? "top-center" : "bottom-right",
                  //   autoClose: 4000,
                  //   hideProgressBar: true,
                  //   closeOnClick: true,
                  //   pauseOnHover: false,
                  //   draggable: true,
                  //   progress: undefined,
                  //   // theme: "dark",
                  //   progressStyle: { background: "#5875e8" },
                  //   containerId: "forCopy",
                  // });
                  // // } catch (err) {
                  // // console.log("err");
                  // // }
                  router.push(`/companyprofile/${dataToUpdate.username}`);
                  setLittleLoader(false);
                } else {
                  setLittleLoader(false);
                  toast(`🙇 Cорри, что-то пропущено`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 4000,
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
                }
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
          maxLength={60}
          caption={
            !status
              ? null
              : status?.includes("inputSlogan maxlen")
              ? "Максимальная длина поля 60 сиволов"
              : null
          }
          onChange={(slogan) => {
            setDataToUpdate({
              ...dataToUpdate,
              slogan: slogan,
            });
            if (status)
              setStatus(status?.filter((i) => !i.includes("inputSlogan")));
          }}
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

              if (status)
                setStatus(
                  status.filter((i) => !i.includes("inputIndustry minlen"))
                );
            }}
            items={itemsForDD}
            placeholder="Выберите отрасль"
          />
          {status && status?.includes("inputIndustry minlen") && (
            <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
              Выберите отрасль
            </p>
          )}
        </div>
        {/* industry */}

        {/* about me */}
        <Input
          placeholder="Важные факты о компании, миссия, ценности"
          label="О нас"
          value={dataToUpdate.about}
          maxLength={240}
          caption={
            !status
              ? null
              : status?.includes("inputAbout maxlen")
              ? "Максимальная длина поля 240 сиволов"
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

export default CreateCompanyRight;

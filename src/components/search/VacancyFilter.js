import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonSecondary } from "../../shared/ui/Button";
import DropDown from "../../shared/ui/DropDown";
import SkillCard from "../../shared/ui/SkillCard";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import CheckBox from "../../shared/ui/CheckBox";
import SkillsDropDown from "../../shared/ui/SkillsDropDown";

import PlusIcon from "../../shared/icons/PlusIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";
import AddSkillIcon from "../../shared/icons/AddSkillIcon";

const VacancyFilter = ({
  setSkillsModal,
  updateVacancies = [],
  setUpdateVacancies = () => {},
  dropDataVacancies = {},
  skills,
}) => {
  console.log(dropDataVacancies?.location);

  let uniqueList = Array.from(new Set(skills.map((a) => a.name))).map(
    (name) => {
      return skills.find((a) => a.name === name);
    }
  );
  const [state, setState] = useState(false);
  const [state7, setState7] = useState(false);
  const [isOpen, toggle] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  return (
    <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-b-[20px]">
      {/* <div className="flex flex-col w-full">
        <TextSecondary
          text={"Расположение"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <DropDownWithSearch
          city={updateVacancies?.location?.label}
          setCity={(val) => {
            setUpdateVacancies({
              ...updateVacancies,
              location: val,
            });
          }}
          items={dropDataVacancies?.location}
          placeholder={"Не выбрано"}
        />
      </div> */}

      <div className="flex flex-col relative">
        <TextSecondary
          text={"Расположение"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies.location.length > 0 ? (
          <p
            className={
              "text-[14px] break-words text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[18px] tracking-[-0.182px] cursor-pointer [@media(hover)]:w-[680px]"
            }
            onClick={() => setState7(true)}
          >
            {updateVacancies.location.map(
              (item, key) =>
                item.label +
                `${key === updateVacancies.location.length - 1 ? "" : ", "}`
            )}
          </p>
        ) : (
          <AddCityIcon onClick={() => setState7(true)} />
        )}
        <DropDownWithChoise
          state={state7}
          setState={setState7}
          city={updateVacancies?.location}
          setCity={(val) => {
            setUpdateVacancies({
              ...updateVacancies,
              location: val,
            });
          }}
          items={dropDataVacancies?.location}
          placeholder={"Не выбрано"}
        />
      </div>

      {/* isDistantWork */}
      <div className="flex flex-row w-full items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`min-w-[24px] min-h-[24px] h-[24px] w-[24px]`}
          onClick={() =>
            setUpdateVacancies({
              ...updateVacancies,
              distantWork:
                updateVacancies.distantWork !== null
                  ? !updateVacancies.distantWork
                  : true,
            })
          }
        >
          <path
            d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z"
            className={
              updateVacancies.distantWork !== null
                ? `${
                    updateVacancies.distantWork === true &&
                    "fill-[#5875e8] group-hover:fill-[#3A56C5] group-active:fill-[#2C429C] "
                  } stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
                : "stroke-[#8f8f8f]"
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke={updateVacancies.distantWork === true ? "white" : "none"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <TextSecondary
          text={"Возможно удаленно"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
        />
      </div>
      {/* isDistantWork */}

      <div className="flex flex-col relative">
        <TextSecondary
          text={"Сфера"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies.area.length > 0 ? (
          <div className="flex-wrap flex flex-row gap-[10px]">
            {updateVacancies.area.map((item, key) => (
              <SkillCard
                key={key}
                onClick={() => setState(true)}
                noCopy
                area
                hard={false}
                text={item.label}
              />
            ))}
          </div>
        ) : (
          <AddCityIcon area onClick={() => setState(true)} />
        )}
        <DropDownWithChoise
          state={state}
          setState={setState}
          city={updateVacancies?.area}
          setCity={(val) => {
            setUpdateVacancies({
              ...updateVacancies,
              area: val,
            });
          }}
          items={dropDataVacancies?.vacArea}
          placeholder="Не выбрано"
        />
      </div>

      {/* skills */}
      {/* <div className="flex flex-col relative gap-[16px]">
        {updateVacancies.VacancySkills.length === 0 ? (
          <div className="flex flex-col">
            <TextSecondary
              text={"Скиллы"}
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            <AddCityIcon
              onClick={() => {
                if (updateVacancies.area.length === 0)
                  toast(`🔍 выберите сферу`, {
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
                else setSkillsModal(true);
              }}
              disabled={updateVacancies.area.length === 0}
            />
          </div>
        ) : (
          <>
            {updateVacancies.VacancySkills.filter(
              (item) => item.type !== "soft"
            ).length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <TextSecondary
                  text={"Хард-скиллы"}
                  style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                />

                <div className="flex flex-row gap-[8px] flex-wrap">
                  {updateVacancies.VacancySkills.map(
                    (item) =>
                      item.type === "hard" && (
                        <SkillCard
                          noCopy
                          onClick={() => setSkillsModal(true)}
                          text={item.name}
                          key={item.id}
                        />
                      )
                  )}
                </div>
              </div>
            )}
            {updateVacancies.VacancySkills.filter(
              (item) => item.type !== "hard"
            ).length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <TextSecondary
                  text={"Софт-скиллы"}
                  style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                />

                <div className="flex flex-row gap-[8px] flex-wrap">
                  {updateVacancies.VacancySkills.map(
                    (item) =>
                      item.type === "soft" && (
                        <SkillCard
                          noCopy
                          onClick={() => setSkillsModal(true)}
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
      </div> */}

      <div className="flex flex-col relative">
        <TextSecondary
          text={"Хард-скиллы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies?.VacancySkills?.filter((item) => item.type !== "soft")
          .length > 0 ? (
          <div className="flex flex-row gap-[8px] flex-wrap">
            {updateVacancies.VacancySkills.map(
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
        ) : (
          <AddSkillIcon
            hard
            disabled={updateVacancies.area.length === 0}
            onClick={() => {
              if (updateVacancies.area.length === 0)
                toast(`🔍 выберите сферу`, {
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
              else toggle(true);
            }}
          />
        )}
        <SkillsDropDown
          withAreas
          inSearch
          areas={updateVacancies.area}
          state={isOpen}
          setState={() => toggle(false)}
          type={"hard"}
          city={updateVacancies.VacancySkills}
          dataToUpdate={updateVacancies}
          setCity={setUpdateVacancies}
          items={uniqueList?.filter((i) => i?.type === "hard")}
          placeholder="Хард-скиллы"
        />
      </div>
      <div className="flex flex-col relative">
        <TextSecondary
          text={"Софт-скиллы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />

        {updateVacancies?.VacancySkills?.filter((item) => item.type !== "hard")
          .length > 0 ? (
          <div className="flex flex-row gap-[8px] flex-wrap">
            {updateVacancies.VacancySkills.map(
              (item) =>
                item.type === "soft" && (
                  <SkillCard
                    noCopy
                    soft
                    hard={false}
                    onClick={() => toggle2(true)}
                    text={item.name}
                    key={item.id}
                  />
                )
            )}
          </div>
        ) : (
          <AddSkillIcon
            hard={false}
            soft
            onClick={() => {
              toggle2(true);
            }}
          />
        )}
        <SkillsDropDown
          inSearch
          state={isOpen2}
          setState={() => toggle2(false)}
          type={"soft"}
          city={updateVacancies.VacancySkills}
          dataToUpdate={updateVacancies}
          setCity={setUpdateVacancies}
          items={uniqueList?.filter((i) => i?.type === "soft")}
          placeholder="Софт-скиллы"
        />
      </div>
      {/* skills */}
    </div>
  );
};

export default VacancyFilter;

import { useState } from "react";

import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonSecondary } from "../../shared/ui/Button";
import DropDown from "../../shared/ui/DropDown";
import SkillCard from "../../shared/ui/SkillCard";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import CheckBox from "../../shared/ui/CheckBox";

import PlusIcon from "../../shared/icons/PlusIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";

const VacancyFilter = ({
  setSkillsModal,
  updateVacancies = [],
  setUpdateVacancies = () => {},
  dropDataVacancies = {},
}) => {
  const [state, setState] = useState(false);

  return (
    <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-b-[20px]">
      <div className="flex flex-col w-full">
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
      </div>

      {/* isDistantWork */}
      <div className="flex flex-col w-full">
        <TextSecondary
          text={"Возможно удаленно"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <CheckBox
          active={
            updateVacancies.distantWork !== null
              ? updateVacancies.distantWork
              : false
          }
          onClick={() =>
            setUpdateVacancies({
              ...updateVacancies,
              distantWork:
                updateVacancies.distantWork !== null
                  ? !updateVacancies.distantWork
                  : true,
            })
          }
        />
      </div>
      {/* isDistantWork */}

      <div className="flex flex-col relative">
        <TextSecondary
          text={"Сфера"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies.area.length > 0 ? (
          <div className="[@media(hover)]:w-[680px] flex-wrap flex flex-row gap-[10px]">
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
      <div className="flex flex-col relative gap-[16px]">
        {updateVacancies.VacancySkills.length === 0 ? (
          <div className="flex flex-col">
            <TextSecondary
              text={"Скиллы"}
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            <AddCityIcon onClick={() => setSkillsModal(true)} />
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
      </div>
      {/* skills */}
    </div>
  );
};

export default VacancyFilter;

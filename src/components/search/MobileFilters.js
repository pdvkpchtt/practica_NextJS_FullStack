"use client";

import { usePathname } from "next/navigation";

import TextMain from "../../shared/Text/TextMain ";
import CompanyFilter from "./CompanyFilter";
import PeopleFilters from "./PeopleFilter";
import VacancyFilter from "./VacancyFilter";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import RefreshIcon from "../../shared/icons/RefreshIcon";
import { useEffect } from "react";

const MobileFilters = ({
  showFilters,
  navState,
  setShowFilters,
  setSkillsModal,
  dropDataVacancies = {},
  updateVacancies = [],
  setUpdateVacancies = () => {},
  updateCompanies = [],
  setUpdateCompanies = () => {},
  updatePeople = [],
  setUpdatePeople = () => {},
}) => {
  const pathname = usePathname();

  const ifVacancies =
    pathname === navState[0].route &&
    (updateVacancies.location.label !== "" ||
      updateVacancies.distantWork !== null ||
      updateVacancies.area.length !== 0 ||
      updateVacancies.VacancySkills.length !== 0);

  const ifCompany =
    pathname === navState[1].route &&
    (updateCompanies.employee.label !== "" ||
      updateCompanies.industry.label !== "" ||
      updateCompanies.isStartap !== null);

  const ifPeople =
    pathname === navState[2].route &&
    (updatePeople.peoplecity.label !== "" ||
      updatePeople.educationLevel.label !== "" ||
      updatePeople.workExperience.label !== "" ||
      updatePeople.UserSkills.length !== 0);

  const handleRemoveFilters = async () => {
    if (pathname === navState[0].route)
      setUpdateVacancies({
        startFiltering: false,
        distantWork: null,
        input: "",
        location: { label: "" },
        area: [],
        VacancySkills: [],
      });
    if (pathname === navState[1].route)
      setUpdateCompanies({
        startFiltering: false,
        input: "",
        employee: { label: "" },
        industry: { label: "" },
        isStartap: null,
      });
    if (pathname === navState[2].route)
      setUpdatePeople({
        startFiltering: false,
        input: "",
        peoplecity: { label: "" },
        educationLevel: { label: "" },
        workExperience: { label: "" },
        UserSkills: [],
      });
  };

  const handleSetFilters = async () => {
    if (pathname === navState[0].route)
      setUpdateVacancies({ ...updateVacancies, startFiltering: true });
    if (pathname === navState[1].route)
      setUpdateCompanies({ ...updateCompanies, startFiltering: true });
    if (pathname === navState[2].route)
      setUpdatePeople({ ...updatePeople, startFiltering: true });
  };

  return (
    <>
      <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
      {/* header */}
      <div className="[@media(pointer:coarse)]:fixed z-[400] [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
        <div className="items-center w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <div
            className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => setShowFilters(false)}
          >
            <ArrowLeftIcon />
          </div>

          <div className="flex flex-row gap-[12px]">
            <div
              className={`
                px-[12px] py-[8px] rounded-[16px] mr-[8px] cursor-pointer transition duration-[250ms] select-none w-fit
                bg-[#74899B] bg-opacity-[8%] cursor-default"
                group
            `}
              onClick={
                ifVacancies || ifCompany || ifPeople
                  ? () => handleRemoveFilters()
                  : null
              }
            >
              <RefreshIcon active={ifVacancies || ifCompany || ifPeople} />
            </div>
            <div
              className={`
                px-[12px] py-[8px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none w-fit
                ${
                  ifVacancies || ifCompany || ifPeople
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C]"
                    : "bg-[#74899B] bg-opacity-[8%] cursor-default"
                }
            `}
              onClick={
                ifVacancies || ifCompany || ifPeople
                  ? () => {
                      handleSetFilters();
                      setShowFilters(false);
                    }
                  : null
              }
            >
              <CheckIcon fill={"#fff"} />
            </div>
          </div>
        </div>
      </div>
      {/* header */}

      <div className="mt-[61px] p-[12px] flex flex-col overflow-y-scroll h-[100vh]">
        <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-t-[20px]">
          <TextMain
            text={`Фильтры для ${navState[0].active ? "вакансий" : ""} ${
              navState[1].active ? "компаний" : ""
            } ${navState[2].active ? "людей" : ""}`}
            style="font-medium text-[16px] leading-[20px] tracking-[-0.015em]"
          />
        </div>
        {pathname === navState[0].route && (
          <VacancyFilter
            dropDataVacancies={dropDataVacancies}
            setSkillsModal={setSkillsModal}
            updateVacancies={updateVacancies}
            setUpdateVacancies={setUpdateVacancies}
          />
        )}
        {pathname === navState[1].route && (
          <CompanyFilter
            dropDataVacancies={dropDataVacancies}
            updateCompanies={updateCompanies}
            setUpdateCompanies={setUpdateCompanies}
          />
        )}
        {pathname === navState[2].route && (
          <PeopleFilters
            setSkillsModal={setSkillsModal}
            dropDataVacancies={dropDataVacancies}
            updatePeople={updatePeople}
            setUpdatePeople={setUpdatePeople}
          />
        )}
        <div className="mb-[61px]" />
      </div>
    </>
  );
};

export default MobileFilters;

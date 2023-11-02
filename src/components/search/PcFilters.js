"use client";

import { usePathname } from "next/navigation";

import CheckIcon from "../../shared/icons/CheckIcon";
import CompanyFilter from "./CompanyFilter";
import PeopleFilters from "./PeopleFilter";
import VacancyFilter from "./VacancyFilter";
import { setFilters } from "../../server/actions/search/setFilters";

import RefreshIcon from "../../shared/icons/RefreshIcon";

const PcFilters = ({
  navState,
  setSkillsModal,
  updateVacancies = [],
  setUpdateVacancies = () => {},
  dropDataVacancies = {},
  updateCompanies = [],
  setUpdateCompanies = () => {},
  updatePeople = [],
  setUpdatePeople = () => {},
}) => {
  const pathname = usePathname();

  const ifVacancies =
    pathname === navState[0].route &&
    (updateVacancies.location.label !== "" ||
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
    <div className="flex flex-col border-[#E7E7E7] dark:border-[#2f2f2f] max-w-[260px] [@media(hover)]:max-h-[calc(100%-32px)] [@media(hover)]:mt-[16px] h-fit w-full rounded-[20px] bg-white dark:bg-[#212122] [@media(pointer:coarse)]:hidden">
      {/* header */}
      <div className="border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
        <div className="w-full items-center flex flex-row justify-end [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
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
                ? () => handleSetFilters()
                : null
            }
          >
            <CheckIcon
              fill={ifVacancies || ifCompany || ifPeople ? "#fff" : "#bfbfbf"}
            />
          </div>
        </div>
      </div>
      {/* header */}

      {/* body */}
      <div className="w-full max-h-full h-fit rounded-b-[20px]">
        <div className="h-fit bg-white dark:bg-[#212122] rounded-b-[20px] flex flex-col gap-[16px] [@media(pointer:coarse)]:p-[12px]">
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
              dropDataVacancies={dropDataVacancies}
              setSkillsModal={setSkillsModal}
              updatePeople={updatePeople}
              setUpdatePeople={setUpdatePeople}
            />
          )}
        </div>
      </div>
      {/* body */}
    </div>
  );
};

export default PcFilters;

"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import PcFilters from "./PcFilters";
import MobileFilters from "./MobileFilters";
import MobileModal from "../../shared/ui/MobileModal";
import SkillsModalContent from "../../components/edit/SkillsModalContent";
import { SearchNavContext } from "./SearchNavContext";
import { fetchFiltersInfo } from "../../server/actions/vacancy/fetchFiltersInfo";
import CustomLoader from "../../shared/ui/CustomLoader";
import SkillsModalVacs from "../../components/Edit/SkillsModalVacs";

const FiltersWrap = () => {
  const {
    showFilters,
    setShowFilters,
    skillsModal,
    setSkillsModal,
    navState,
    updateVacancies,
    setUpdateVacancies,
    updateCompanies,
    setUpdateCompanies,
    updatePeople,
    setUpdatePeople,
  } = useContext(SearchNavContext);
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [dropDataVacancies, setDropDataVacancies] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchFiltersInfo();
    setDropDataVacancies(data);
    console.log(data, "filters data");
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:hidden flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : (
        <>
          {/* filters */}
          <PcFilters
            dropDataVacancies={dropDataVacancies}
            updateVacancies={updateVacancies}
            setUpdateVacancies={setUpdateVacancies}
            updateCompanies={updateCompanies}
            setUpdateCompanies={setUpdateCompanies}
            updatePeople={updatePeople}
            setUpdatePeople={setUpdatePeople}
            navState={navState}
            setSkillsModal={setSkillsModal}
          />
          {/* filters */}

          {/* filters mobile */}
          <MobileModal isOpen={showFilters} handleClose={setShowFilters}>
            <MobileFilters
              dropDataVacancies={dropDataVacancies}
              updateVacancies={updateVacancies}
              setUpdateVacancies={setUpdateVacancies}
              updateCompanies={updateCompanies}
              setUpdateCompanies={setUpdateCompanies}
              updatePeople={updatePeople}
              setUpdatePeople={setUpdatePeople}
              navState={navState}
              setShowFilters={(value) => setShowFilters(value)}
              skillsModal={skillsModal}
              setSkillsModal={setSkillsModal}
            />
          </MobileModal>
          {/* filters mobile */}

          {pathname === navState[0].route && (
            <SkillsModalVacs
              withAreas
              areas={updateVacancies.area}
              data={updateVacancies.VacancySkills}
              isOpen={skillsModal}
              handleClose={() => setSkillsModal(false)}
              setDataToUpdate={setUpdateVacancies}
              dataToUpdate={updateVacancies}
              skills={dropDataVacancies.vacskills}
              forVacancy
            />
          )}
          {pathname === navState[2].route && (
            <SkillsModalContent
              data={updatePeople.UserSkills}
              isOpen={skillsModal}
              handleClose={() => setSkillsModal(false)}
              setDataToUpdate={setUpdatePeople}
              dataToUpdate={updatePeople}
              skills={dropDataVacancies.userskills}
            />
          )}
        </>
      )}
    </>
  );
};

export default FiltersWrap;

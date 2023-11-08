"use client";

import { useState, createContext, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

export const SearchNavContext = createContext();

const SearchNavContextWrap = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/search") redirect("/search/vacancies");
  }, [pathname]);

  const [showFilters, setShowFilters] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [scroll, setScroll] = useState(false);

  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: "Вакансии",
      route: "/search/vacancies",
    },
    {
      id: 1,
      active: false,
      name: "Компании",
      route: "/search/companies",
    },
    {
      id: 2,
      active: false,
      name: "Люди",
      route: "/search/peoples",
    },
  ]);

  const [updateVacancies, setUpdateVacancies] = useState({
    startFiltering: false,
    input: "",
    location: { label: "" },
    distantWork: null,
    area: [],
    VacancySkills: [],
  });
  const [updateCompanies, setUpdateCompanies] = useState({
    startFiltering: false,
    input: "",
    employee: { label: "" },
    industry: { label: "" },
    isStartap: null,
  });
  const [updatePeople, setUpdatePeople] = useState({
    startFiltering: false,
    input: "",
    peoplecity: { label: "" },
    educationLevel: { label: "" },
    workExperience: { label: "" },
    UserSkills: [],
  });
  console.log(updateVacancies);
  return (
    <SearchNavContext.Provider
      value={{
        showFilters,
        setShowFilters,
        skillsModal,
        setSkillsModal,
        navState,
        setNavState,
        scroll,
        setScroll,
        updateVacancies,
        setUpdateVacancies,
        updateCompanies,
        setUpdateCompanies,
        updatePeople,
        setUpdatePeople,
      }}
    >
      {children}
    </SearchNavContext.Provider>
  );
};

export default SearchNavContextWrap;

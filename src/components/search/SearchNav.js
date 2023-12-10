"use client";

import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

import { SearchInput } from "../../shared/ui/Input";
import NavigationPc from "../../shared/ui/NavigationPc";
import NavigationMobile from "../../shared/ui/NavigationMobile";
import { SearchNavContext } from "./SearchNavContext";

import FilterIcon from "../../shared/icons/FilterIcon";

const SearchNav = () => {
  const {
    setShowFilters,
    scroll,
    setScroll,
    navState,
    setNavState,
    updateVacancies,
    setUpdateVacancies,
    updateCompanies,
    setUpdateCompanies,
    updatePeople,
    setUpdatePeople,
  } = useContext(SearchNavContext);

  const pathname = usePathname();
  const [trigger, settrigger] = useState(false);

  const [newScroll, setNewScroll] = useState(scroll);
  useEffect(() => {
    if (scroll > newScroll) settrigger(true);
    else if (scroll < newScroll) settrigger(false);

    setTimeout(() => {
      setNewScroll(scroll);
    }, [50]);
  }, [scroll]);

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const changeScroll = () => {
    setScroll(window.scrollY);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", changeScroll);

  return (
    <>
      {/* search and nav pc */}
      <motion.div
        animate={
          newScroll > 76 && !isMobile && trigger
            ? {
                y: -100,
              }
            : { y: 0 }
        }
        transition={{ duration: 0.2 }}
        className={`p-[12px] rounded-[20px] border-[1px] border-[#E7E7E7] dark:border-[#2f2f2f] flex flex-row gap-[12px] items-center [@media(hover)]:fixed [@media(hover)]:mt-[24px] [@media(hover)]:w-[704px] [@media(pointer:coarse)]:hidden bg-white dark:bg-[#212122]`}
      >
        <SearchInput
          placeholder="Поиск"
          value={
            pathname === navState[0].route
              ? updateVacancies.input
              : pathname === navState[1].route
              ? updateCompanies.input
              : pathname === navState[2].route
              ? updatePeople.input
              : ""
          }
          onChange={(val) =>
            pathname === navState[0].route
              ? setUpdateVacancies({ ...updateVacancies, input: val })
              : pathname === navState[1].route
              ? setUpdateCompanies({ ...updateCompanies, input: val })
              : pathname === navState[2].route
              ? setUpdatePeople({ ...updatePeople, input: val })
              : {}
          }
        />
        <NavigationPc
          withNav
          navState={navState}
          useState={(value) => setNavState(value)}
          invertedColors
        />
      </motion.div>
      {/* search and nav pc */}

      {/* search and nav mobile */}
      <div className="bg-white dark:bg-[#212122] w-full pt-[8px] mb-[22px] px-[12px] fixed top-0 left-0 py-[8px] h-[101px] [@media(hover)]:hidden">
        <div className="max-w-[476px] mx-auto">
          <div className="flex flex-row gap-[12px] items-center">
            <SearchInput
              placeholder="Поиск"
              value={
                pathname === navState[0].route
                  ? updateVacancies.input
                  : pathname === navState[1].route
                  ? updateCompanies.input
                  : pathname === navState[2].route
                  ? updatePeople.input
                  : ""
              }
              onChange={(val) =>
                pathname === navState[0].route
                  ? setUpdateVacancies({ ...updateVacancies, input: val })
                  : pathname === navState[1].route
                  ? setUpdateCompanies({ ...updateCompanies, input: val })
                  : pathname === navState[2].route
                  ? setUpdatePeople({ ...updatePeople, input: val })
                  : {}
              }
            />

            {/* filter button */}
            <div
              className="items-center p-[12px] rounded-[16px] bg-[#f6f6f8] dark:bg-[#272727]"
              onClick={() => setShowFilters(true)}
            >
              <FilterIcon />
            </div>
            {/* filter button */}
          </div>
          <NavigationMobile
            withNav
            top={71}
            navState={navState}
            useState={(value) => setNavState(value)}
            layoutId="searchmobile"
          />
        </div>
      </div>
      {/* search and nav mobile */}
    </>
  );
};

export default SearchNav;

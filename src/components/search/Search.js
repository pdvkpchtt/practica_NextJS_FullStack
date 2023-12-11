"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";

import Companies from "./Companies";
import Vacancies from "./Vacancies";
import People from "./People";

import { SearchNavContext } from "./SearchNavContext";

const Search = ({ session }) => {
  const pathname = usePathname();

  const { navState, scroll, setScroll } = useContext(SearchNavContext);

  return (
    <>
      <div
        // onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
        className="h-full [@media(hover)]:pt-[100px] hideScrollbarNavMobile [@media(hover)]:pb-[24px] [@media(pointer:coarse)]:h-[calc(100%-189px)] [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:mt-[109px] flex flex-col gap-[8px]"
      >
        {pathname === navState[0].route && <Vacancies session={session} />}
        {pathname === navState[1].route && <Companies />}
        {pathname === navState[2].route && <People />}

        <div
          className={`[@media(pointer:coarse)]:pb-[80px] [@media(hover)]:pb-[24px]`}
        />
      </div>
    </>
  );
};

export default Search;

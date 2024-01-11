"use client";

import { usePathname } from "next/navigation";
import MessengerIcon from "shared/icons/MessengerIcon";

import HomeIconBig from "../icons/HomeIconBig";
import MessengerIconBig from "../icons/MessengerIconBig";
import ProfileIconBig from "../icons/ProfileIconBig";
import SearchIconBig from "../icons/SearchIconBig";

const BottomNav = ({ role }) => {
  const pathname = usePathname();

  const isHideBottomNav =
    pathname.includes("/auth") ||
    pathname.includes("/edit") ||
    pathname.includes("/companyprofile/createvacancy") ||
    pathname.includes("/messenger/") ||
    pathname === "/landing";

  return (
    <>
      {isHideBottomNav ? null : (
        <div className="flex justify-center items-center max-w-[500px] mx-auto">
          <div className="max-w-[500px] px-[12px] border-t-[#e7e7e7] dark:border-t-[#282828] [@media(pointer:coarse)]:fixed bottom-[20px] [@media(hover)]:hidden h-[49px] z-10 w-full">
            <div className="mx-auto w-full grid grid-cols-4 bg-[#ECEDF1] dark:bg-[#1A1A1A] dark:bg-opacity-[70%] dark:backdrop-blur-sm bg-opacity-[70%] backdrop-blur-sm rounded-[50px] h-[49px] pt-[10px] pb-[20px]">
              <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
                <HomeIconBig />
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
                <SearchIconBig />
              </div>

              <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
                <MessengerIcon big />
              </div>

              <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
                <ProfileIconBig role={role} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;

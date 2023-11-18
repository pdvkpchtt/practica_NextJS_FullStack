"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileIcon = ({ fill = "#000", size = 25, role }) => {
  const pathname = usePathname();
  // "/companyprofile"
  return (
    <Link href={"/profile"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 21C5 18.239 8.35812 16 12.5 16C16.6419 16 20 18.239 20 21"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 13C13.6935 13 14.8381 12.5259 15.682 11.682C16.5259 10.8381 17 9.69347 17 8.5C17 7.30653 16.5259 6.16193 15.682 5.31802C14.8381 4.47411 13.6935 4 12.5 4C11.3065 4 10.1619 4.47411 9.31802 5.31802C8.47411 6.16193 8 7.30653 8 8.5C8 9.69347 8.47411 10.8381 9.31802 11.682C10.1619 12.5259 11.3065 13 12.5 13Z"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
};

export default ProfileIcon;

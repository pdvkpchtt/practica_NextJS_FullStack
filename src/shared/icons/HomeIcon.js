"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = ({ fill = "#000", size = 25 }) => {
  const pathname = usePathname();

  return (
    <Link href={"/feed"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6803 10.6238L13.1178 5.21873C12.9469 5.07773 12.7273 5 12.5 5C12.2727 5 12.0531 5.07773 11.8822 5.21873L5.31969 10.6238C5.21916 10.7067 5.13863 10.8089 5.08349 10.9235C5.02835 11.0381 4.99989 11.1625 5 11.2883V19.1175C5 19.3516 5.09877 19.576 5.27459 19.7415C5.4504 19.907 5.68886 20 5.9375 20H9.6875C9.93614 20 10.1746 19.907 10.3504 19.7415C10.5262 19.576 10.625 19.3516 10.625 19.1175V15.5877C10.625 15.3536 10.7238 15.1292 10.8996 14.9637C11.0754 14.7982 11.3139 14.7052 11.5625 14.7052H13.4375C13.6861 14.7052 13.9246 14.7982 14.1004 14.9637C14.2762 15.1292 14.375 15.3536 14.375 15.5877V19.1175C14.375 19.3516 14.4738 19.576 14.6496 19.7415C14.8254 19.907 15.0639 20 15.3125 20H19.0625C19.3111 20 19.5496 19.907 19.7254 19.7415C19.9012 19.576 20 19.3516 20 19.1175V11.2883C20.0001 11.1625 19.9716 11.0381 19.9165 10.9235C19.8614 10.8089 19.7808 10.7067 19.6803 10.6238Z"
            className={
              pathname.includes("feed")
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

export default HomeIcon;

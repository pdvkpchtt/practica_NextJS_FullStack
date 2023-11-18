"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

const SearchIcon = ({ fill = "#000", size = 25 }) => {
  const pathname = usePathname();

  return (
    <Link href={"/search"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8333 16.6667C11.5994 16.6667 12.3579 16.5158 13.0657 16.2226C13.7734 15.9295 14.4164 15.4998 14.9581 14.9581C15.4998 14.4164 15.9295 13.7734 16.2226 13.0657C16.5158 12.3579 16.6667 11.5994 16.6667 10.8333C16.6667 10.0673 16.5158 9.30875 16.2226 8.60101C15.9295 7.89328 15.4998 7.25022 14.9581 6.70854C14.4164 6.16687 13.7734 5.73719 13.0657 5.44404C12.3579 5.15088 11.5994 5 10.8333 5C9.28624 5 7.80251 5.61458 6.70854 6.70854C5.61458 7.80251 5 9.28624 5 10.8333C5 12.3804 5.61458 13.8642 6.70854 14.9581C7.80251 16.0521 9.28624 16.6667 10.8333 16.6667Z"
            className={
              pathname.includes("search")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15L20 20"
            className={
              pathname.includes("search")
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

export default SearchIcon;

"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

const SearchIcon = ({ fill = "#000", size = 25 }) => {
  const pathname = usePathname();

  return (
    <Link href={"/search"} className="group">
      <svg
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M10.4167 17.7083C11.3742 17.7083 12.3224 17.5197 13.2071 17.1533C14.0917 16.7868 14.8956 16.2497 15.5727 15.5727C16.2497 14.8956 16.7868 14.0917 17.1533 13.2071C17.5197 12.3224 17.7083 11.3742 17.7083 10.4167C17.7083 9.45911 17.5197 8.51093 17.1533 7.62627C16.7868 6.7416 16.2497 5.93777 15.5727 5.26068C14.8956 4.58359 14.0917 4.04649 13.2071 3.68005C12.3224 3.3136 11.3742 3.125 10.4167 3.125C8.4828 3.125 6.62813 3.89323 5.26068 5.26068C3.89323 6.62813 3.125 8.4828 3.125 10.4167C3.125 12.3505 3.89323 14.2052 5.26068 15.5727C6.62813 16.9401 8.4828 17.7083 10.4167 17.7083Z"
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`${
            pathname.includes("/search")
              ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
              : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
          }`}
        />
        <path
          d="M15.625 15.625L21.875 21.875"
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`${
            pathname.includes("/search")
              ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
              : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
          }`}
        />
      </svg>
    </Link>
  );
};

export default SearchIcon;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = ({ fill = "#000", size = 25 }) => {
  const pathname = usePathname();

  return (
    <Link href={"/feed"}>
      <svg
        className="cursor-pointer"
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`${
            pathname.includes("/feed")
              ? "stroke-[#5875e8] dark:stroke-[#5875e8]"
              : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f]"
          }`}
          d="M20.478 9.76437L13.1863 3.38416C12.9963 3.21773 12.7524 3.12598 12.4998 3.12598C12.2473 3.12598 12.0033 3.21773 11.8134 3.38416L4.52171 9.76437C4.41001 9.86223 4.32053 9.98285 4.25927 10.1181C4.19801 10.2534 4.16638 10.4002 4.1665 10.5487V19.7904C4.1665 20.0667 4.27625 20.3316 4.4716 20.527C4.66695 20.7223 4.9319 20.8321 5.20817 20.8321H9.37484C9.6511 20.8321 9.91606 20.7223 10.1114 20.527C10.3068 20.3316 10.4165 20.0667 10.4165 19.7904V15.6237C10.4165 15.3475 10.5263 15.0825 10.7216 14.8872C10.917 14.6918 11.1819 14.5821 11.4582 14.5821H13.5415C13.8178 14.5821 14.0827 14.6918 14.2781 14.8872C14.4734 15.0825 14.5832 15.3475 14.5832 15.6237V19.7904C14.5832 20.0667 14.6929 20.3316 14.8883 20.527C15.0836 20.7223 15.3486 20.8321 15.6248 20.8321H19.7915C20.0678 20.8321 20.3327 20.7223 20.5281 20.527C20.7234 20.3316 20.8332 20.0667 20.8332 19.7904V10.5487C20.8333 10.4002 20.8017 10.2534 20.7404 10.1181C20.6791 9.98285 20.5897 9.86223 20.478 9.76437Z"
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Link>
  );
};

export default HomeIcon;

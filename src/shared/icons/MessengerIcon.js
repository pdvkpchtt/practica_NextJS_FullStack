"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const MessengerIcon = ({ fill = "#000", size = 25 }) => {
  const pathname = usePathname();

  return (
    <Link href={"/messenger"}>
      <svg
        className="cursor-pointer"
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.875 12.4998C21.8752 14.1781 21.425 15.8257 20.5712 17.2705C19.7173 18.7154 18.4913 19.9046 17.0211 20.714C15.5508 21.5233 13.8903 21.9232 12.2128 21.8717C10.5352 21.8203 8.90229 21.3195 7.48438 20.4216L3.125 21.8748L4.57813 17.5154C3.80058 16.2868 3.31946 14.8941 3.17281 13.4475C3.02616 12.0009 3.21799 10.5401 3.73314 9.18038C4.2483 7.8207 5.07265 6.59948 6.14105 5.61325C7.20944 4.62701 8.49258 3.90281 9.88906 3.49787C11.2855 3.09293 12.7571 3.01835 14.1873 3.28005C15.6176 3.54174 16.9674 4.13252 18.13 5.00569C19.2926 5.87886 20.2362 7.01049 20.8862 8.31113C21.5361 9.61177 21.8747 11.0458 21.875 12.4998Z"
          className={`${
            pathname.includes("/messenger")
              ? "stroke-[#5875e8]"
              : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f]"
          }`}
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Link>
  );
};

export default MessengerIcon;

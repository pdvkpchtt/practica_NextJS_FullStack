"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileIcon = ({ fill = "#000", size = 25, role }) => {
  const pathname = usePathname();
  // "/companyprofile"
  return (
    <>
      {role === "student" && (
        <Link href={"/profile"} className="group">
          <svg
            className="cursor-pointer"
            width={size}
            height={size}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.1665 21.8753C4.1665 18.9993 7.89775 16.667 12.4998 16.667C17.1019 16.667 20.8332 18.9993 20.8332 21.8753"
              className={`${
                pathname.includes("/profile")
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }`}
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4998 13.5417C13.8812 13.5417 15.2059 12.9929 16.1827 12.0162C17.1594 11.0394 17.7082 9.71467 17.7082 8.33333C17.7082 6.952 17.1594 5.62724 16.1827 4.65049C15.2059 3.67373 13.8812 3.125 12.4998 3.125C11.1185 3.125 9.79374 3.67373 8.81699 4.65049C7.84024 5.62724 7.2915 6.952 7.2915 8.33333C7.2915 9.71467 7.84024 11.0394 8.81699 12.0162C9.79374 12.9929 11.1185 13.5417 12.4998 13.5417Z"
              className={`${
                pathname.includes("/profile")
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }`}
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
      {role === "hr" && pathname === "/profile" && (
        <Link href={"/companyprofile"} className="group">
          <svg
            className="cursor-pointer"
            width={size}
            height={size}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8156_12481)">
              <path
                d="M0.1 20V5.3H2.074V11.579H9.886V5.3H11.86V20H9.886V13.301H2.074V20H0.1ZM14.4801 20V5.3H19.6251C20.8571 5.3 21.8791 5.496 22.6911 5.888C23.5171 6.266 24.1401 6.791 24.5601 7.463C24.9801 8.121 25.1901 8.87 25.1901 9.71C25.1901 10.69 24.8961 11.551 24.3081 12.293C23.7341 13.021 22.8801 13.532 21.7461 13.826L25.6101 20H23.2791L19.7721 14.078H16.4541V20H14.4801ZM16.4541 12.398H19.4151C20.7731 12.398 21.7461 12.153 22.3341 11.663C22.9221 11.159 23.2161 10.508 23.2161 9.71C23.2161 8.912 22.9221 8.268 22.3341 7.778C21.7461 7.274 20.7731 7.022 19.4151 7.022H16.4541V12.398Z"
                className={`${
                  pathname === "/profile"
                    ? "fill-[#5875e8] group-active:fill-[#2C429C] group-hover:fill-[#3A56C5] transition duration-[250ms]"
                    : "fill-[#bfbfbf] dark:fill-[#8f8f8f] transition duration-[250ms]"
                }`}
              />
            </g>
            <defs>
              <clipPath id="clip0_8156_12481">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      )}
      {role === "hr" && pathname === "/companyprofile" && (
        <Link href={"/profile"} className="group">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.08398 20.834H22.9173"
              className={
                pathname === "/companyprofile"
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.29102 10.416H11.4577"
              className={
                pathname === "/companyprofile"
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.7923 9.375H15.6257C15.3494 9.375 15.0844 9.48475 14.8891 9.6801C14.6937 9.87545 14.584 10.1404 14.584 10.4167V20.8333H20.834V10.4167C20.834 10.1404 20.7242 9.87545 20.5289 9.6801C20.3335 9.48475 20.0686 9.375 19.7923 9.375Z"
              className={
                pathname === "/companyprofile"
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.29102 7.29102H11.4577"
              className={
                pathname === "/companyprofile"
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.541 3.125H5.20768C4.93142 3.125 4.66646 3.23475 4.47111 3.4301C4.27576 3.62545 4.16602 3.8904 4.16602 4.16667V20.8333H14.5827V4.16667C14.5827 3.8904 14.4729 3.62545 14.2776 3.4301C14.0822 3.23475 13.8173 3.125 13.541 3.125Z"
              className={
                pathname === "/companyprofile"
                  ? "stroke-[#5875e8] group-active:stroke-[#2C429C] group-hover:stroke-[#3A56C5] transition duration-[250ms]"
                  : "stroke-[#bfbfbf] dark:stroke-[#8f8f8f] transition duration-[250ms]"
              }
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
      {role === "hr" &&
        pathname !== "/profile" &&
        pathname !== "/companyprofile" && (
          <Link href={"/profile"} className="group">
            <svg
              className="cursor-pointer"
              width={size}
              height={size}
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8156_12481)">
                <path
                  d="M0.1 20V5.3H2.074V11.579H9.886V5.3H11.86V20H9.886V13.301H2.074V20H0.1ZM14.4801 20V5.3H19.6251C20.8571 5.3 21.8791 5.496 22.6911 5.888C23.5171 6.266 24.1401 6.791 24.5601 7.463C24.9801 8.121 25.1901 8.87 25.1901 9.71C25.1901 10.69 24.8961 11.551 24.3081 12.293C23.7341 13.021 22.8801 13.532 21.7461 13.826L25.6101 20H23.2791L19.7721 14.078H16.4541V20H14.4801ZM16.4541 12.398H19.4151C20.7731 12.398 21.7461 12.153 22.3341 11.663C22.9221 11.159 23.2161 10.508 23.2161 9.71C23.2161 8.912 22.9221 8.268 22.3341 7.778C21.7461 7.274 20.7731 7.022 19.4151 7.022H16.4541V12.398Z"
                  className={`${
                    pathname === "/profile"
                      ? "fill-[#5875e8] group-ctive:fill-[#2C429C] group-hover:fill-[#3A56C5] transition duration-[250ms]"
                      : "fill-[#bfbfbf] dark:fill-[#8f8f8f] transition duration-[250ms]"
                  }`}
                />
              </g>
              <defs>
                <clipPath id="clip0_8156_12481">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        )}
    </>
  );
};

export default ProfileIcon;

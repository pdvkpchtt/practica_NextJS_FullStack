"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileIconBig = ({ fill = "#000", size = 25, role }) => {
  const pathname = usePathname();
  // "/companyprofile"

  if (role === "student")
    return (
      <Link href={"/profile"} className="group">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16602 21.8743C4.16602 18.9983 7.89727 16.666 12.4993 16.666C17.1014 16.666 20.8327 18.9983 20.8327 21.8743"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.4993 13.5417C13.8807 13.5417 15.2054 12.9929 16.1822 12.0162C17.1589 11.0394 17.7077 9.71467 17.7077 8.33333C17.7077 6.952 17.1589 5.62724 16.1822 4.65049C15.2054 3.67373 13.8807 3.125 12.4993 3.125C11.118 3.125 9.79325 3.67373 8.8165 4.65049C7.83975 5.62724 7.29102 6.952 7.29102 8.33333C7.29102 9.71467 7.83975 11.0394 8.8165 12.0162C9.79325 12.9929 11.118 13.5417 12.4993 13.5417Z"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    );
  else if (role?.includes("hr") && !pathname.includes("/companyprofile"))
    return (
      <Link
        href={pathname === "/profile" ? "/companyprofile" : "/profile"}
        className="group"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-[-3px]"
        >
          <g clip-path="url(#clip0_9333_15715)">
            <path
              d="M0.1 21V6.3H2.074V12.579H9.886V6.3H11.86V21H9.886V14.301H2.074V21H0.1ZM14.4801 21V6.3H19.6251C20.8571 6.3 21.8791 6.496 22.6911 6.888C23.5171 7.266 24.1401 7.791 24.5601 8.463C24.9801 9.121 25.1901 9.87 25.1901 10.71C25.1901 11.69 24.8961 12.551 24.3081 13.293C23.7341 14.021 22.8801 14.532 21.7461 14.826L25.6101 21H23.2791L19.7721 15.078H16.4541V21H14.4801ZM16.4541 13.398H19.4151C20.7731 13.398 21.7461 13.153 22.3341 12.663C22.9221 12.159 23.2161 11.508 23.2161 10.71C23.2161 9.912 22.9221 9.268 22.3341 8.778C21.7461 8.274 20.7731 8.022 19.4151 8.022H16.4541V13.398Z"
              className={
                pathname.includes("profile")
                  ? "fill-[#5875e8]"
                  : "fill-[#2c2c2c] dark:fill-[#fff]"
              }
            />
          </g>
          <defs>
            <clipPath id="clip0_9333_15715">
              <rect width="25" height="25" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Link>
    );
  else if (role?.includes("hr") && pathname.includes("/companyprofile"))
    return (
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
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.29102 10.416H11.4577"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.7923 9.375H15.6257C15.3494 9.375 15.0844 9.48475 14.8891 9.6801C14.6937 9.87545 14.584 10.1404 14.584 10.4167V20.8333H20.834V10.4167C20.834 10.1404 20.7242 9.87545 20.5289 9.6801C20.3335 9.48475 20.0686 9.375 19.7923 9.375Z"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.29102 7.29102H11.4577"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.541 3.125H5.20768C4.93142 3.125 4.66646 3.23475 4.47111 3.4301C4.27576 3.62545 4.16602 3.8904 4.16602 4.16667V20.8333H14.5827V4.16667C14.5827 3.8904 14.4729 3.62545 14.2776 3.4301C14.0822 3.23475 13.8173 3.125 13.541 3.125Z"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    );
  else
    return (
      <Link href={"/profile"} className="group">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16602 21.8743C4.16602 18.9983 7.89727 16.666 12.4993 16.666C17.1014 16.666 20.8327 18.9983 20.8327 21.8743"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.4993 13.5417C13.8807 13.5417 15.2054 12.9929 16.1822 12.0162C17.1589 11.0394 17.7077 9.71467 17.7077 8.33333C17.7077 6.952 17.1589 5.62724 16.1822 4.65049C15.2054 3.67373 13.8807 3.125 12.4993 3.125C11.118 3.125 9.79325 3.67373 8.8165 4.65049C7.83975 5.62724 7.29102 6.952 7.29102 8.33333C7.29102 9.71467 7.83975 11.0394 8.8165 12.0162C9.79325 12.9929 11.118 13.5417 12.4993 13.5417Z"
            className={
              pathname.includes("profile")
                ? "stroke-[#5875e8]"
                : "stroke-[#2c2c2c] dark:stroke-[#fff]"
            }
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    );
};

export default ProfileIconBig;

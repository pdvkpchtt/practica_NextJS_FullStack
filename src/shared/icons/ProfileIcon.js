"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFastHrCompany } from "../../server/actions/profile/getFastHrCompany";
import storage from "../../storage/storage";
import useStore from "../../storage/zustand";
import CustomLoader from "../../shared/ui/CustomLoader";
import Image from "next/image";
import EmptyMiniAva from "../../shared/ui/EmptyMiniAva";

const ProfileIcon = ({ big = false, role }) => {
  const pathname = usePathname();

  const contactsComp = useStore((state) => state.contactsComp);
  const contactsCompState = useStore((state) => state.contactsCompState);

  const [loading, setLoading] = useState(true);

  const getHrComp = async () => {
    const hrComp = await getFastHrCompany();

    contactsCompState(hrComp[0]);
    storage.set("hrComps", hrComp[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (role?.includes("hr")) {
      setLoading(true);
      const hrCompFromStorage = storage.get("hrComps");
      contactsCompState(hrCompFromStorage);

      if (hrCompFromStorage === null) getHrComp();
      else setLoading(false);
    } else setLoading(false);
  }, []);

  // console.log(storage.get("hrComps"), "fuck america");

  if (role?.includes("hr") && loading === true)
    return (
      <>
        {!big ? (
          <Link href={"/profile"}>
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer">
              <CustomLoader
                diameter={20}
                strokeWidth={5}
                strokeWidthSecondary={5}
              />
            </div>
          </Link>
        ) : (
          <Link href={"/profile"}>
            <CustomLoader
              diameter={25}
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          </Link>
        )}
      </>
    );

  if (role?.includes("hr") && loading === false && !!contactsComp?.company)
    return (
      <>
        {!big ? (
          <Link href={"/profile"}>
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer">
              <div className="rounded-full overflow-hidden z-[21] bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 aspect-square w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
                {contactsComp?.company?.image ? (
                  <Image
                    src={contactsComp?.company?.image}
                    alt="hr company photo"
                    className="w-[20px] h-[20px] min-w-[20px] object-cover min-h-[20px] max-w-[20px] max-h-[20px]"
                    width={20}
                    height={20}
                    quality={100}
                    priority={true}
                  />
                ) : (
                  <EmptyMiniAva text={contactsComp?.company?.name[0]} />
                )}
              </div>
            </div>
          </Link>
        ) : (
          <Link href={"/profile"}>
            <div className="rounded-full overflow-hidden z-[21] bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 aspect-square w-[25px] h-[25px] min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px]">
              {contactsComp?.company?.image ? (
                <Image
                  src={contactsComp?.company?.image}
                  alt="hr company photo"
                  className="w-[25px] h-[25px] min-w-[25px] object-cover min-h-[25px] max-w-[25px] max-h-[25px]"
                  width={25}
                  height={25}
                  quality={100}
                  priority={true}
                />
              ) : (
                <EmptyMiniAva text={contactsComp?.company?.name[0]} />
              )}
            </div>
          </Link>
        )}
      </>
    );

  if (role === "student")
    return (
      <>
        {!big ? (
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
        ) : (
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
        )}
      </>
    );
  else if (
    role?.includes("hr") &&
    !pathname.includes("/companyprofile") &&
    !contactsComp?.company &&
    loading === false
  )
    return (
      <>
        {!big ? (
          <Link href={"/profile"} className="group">
            <div className="w-[30px] h-[30px] ml-[-3px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.62 20V7.4H3.78V12.584H9.9V7.4H12.06V20H9.9V14.456H3.78V20H1.62ZM13.8558 20V7.4H18.6258C19.6818 7.4 20.5578 7.568 21.2538 7.904C21.9618 8.24 22.4958 8.702 22.8558 9.29C23.2158 9.878 23.3958 10.556 23.3958 11.324C23.3958 12.188 23.1618 12.938 22.6938 13.574C22.2258 14.198 21.5238 14.648 20.5878 14.924L23.7558 20H21.3798L18.5898 15.176H16.0158V20H13.8558ZM16.0158 13.376H18.2658C19.3698 13.376 20.1378 13.196 20.5698 12.836C21.0138 12.476 21.2358 11.972 21.2358 11.324C21.2358 10.676 21.0138 10.172 20.5698 9.812C20.1378 9.452 19.3698 9.272 18.2658 9.272H16.0158V13.376Z"
                  className={
                    pathname.includes("profile")
                      ? "fill-[#5875e8]"
                      : "fill-[#2c2c2c] dark:fill-[#fff]"
                  }
                />
              </svg>
            </div>
          </Link>
        ) : (
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
        )}
      </>
    );
  else if (
    role?.includes("hr") &&
    pathname.includes("/companyprofile") &&
    !contactsComp?.company &&
    loading === false
  )
    return (
      <>
        {!big ? (
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
                  d="M2 21H22"
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
                  d="M7 11H11"
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
                  d="M19 10H15C14.7348 10 14.4804 10.1054 14.2929 10.2929C14.1054 10.4804 14 10.7348 14 11V21H20V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
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
                  d="M7 8H11"
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
                  d="M13 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V21H14V5C14 4.73478 13.8946 4.48043 13.7071 4.29289C13.5196 4.10536 13.2652 4 13 4Z"
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
        ) : (
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
        )}
      </>
    );
  else
    return (
      <>
        {!big ? (
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
        ) : (
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
        )}
      </>
    );
};

export default ProfileIcon;

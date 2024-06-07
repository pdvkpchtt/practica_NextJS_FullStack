"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import CopyIcon from "../../shared/icons/CopyIcon";
import Helper from "../../shared/ui/Helper";
import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

const VacancyLeft = ({ data, children }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div
      className={`flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]
  transition duration-[250ms] [@media(hover)]:w-[260px] [@media(pointer:coarse)]:pt-[12px] [@media(pointer:coarse)]:px-[12px] [@media(pointer:coarse)]:w-full`}
    >
      <Card
        style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
        padding={12}
      >
        <div className="relative overflow-hidden bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 rounded-full aspect-square [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
          {data.Company.image ? (
            <Image
              src={data.Company.image}
              alt="Profile photo"
              className="[@media(hover)]:min-w-[110px] object-cover  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] [@media(hover)]:min-h-[110px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full w-full"
              width={110}
              height={110}
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar hungredAndTen />
          )}
        </div>

        {/* name and username */}
        <div className="flex flex-col gap-[8px]">
          <TextMain
            text={data.Company.name}
            onClick={() =>
              router.push(`/companyprofile/${data.Company.username}`)
            }
            style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] cursor-pointer`}
          />
          <Helper text="Скопировать username" styled="mx-auto">
            <div
              className="flex flex-row gap-[2px] items-center cursor-pointer"
              onClick={() => {
                toast(`🗂 Текст скопирован`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                clipboard.copy("@" + data.Company.username);
              }}
            >
              <TextSecondary
                text={`@${
                  data.Company.username
                    ? data.Company.username
                    : data.Company.id
                }`}
                style="font-medium text-[16px] leading-[20px] cursor-pointer tracking-[-0.24px] w-fit text-center"
              />

              <CopyIcon />
            </div>
          </Helper>
        </div>
        {/* name and username */}

        {/* about */}
        {data.Company.about && (
          <TextSecondary
            text={data.Company.about}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] w-full text-center"
          />
        )}

        {!data.Company.Cities || data.Company.Cities.length === 0 ? null : (
          <TextSecondary
            text={data.Company.Cities.map(
              (item, key) =>
                true &&
                `${item.label}${
                  key !== data.Company.Cities.length - 1 ? ", " : ""
                }`
            )}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] font-medium w-full text-center"
          />
        )}
        {/* about */}
      </Card>

      {/* ссылки */}
      {data?.Company?.Links?.length !== 0 && (
        <Card
          style=" 
      [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
      flex flex-row gap-[16px] flex-wrap 
      hideScrollbarNavMobile [@media(hover)]:h-fit"
          padding={12}
        >
          {data?.Company?.Links?.map((item, key) => (
            <a
              key={key}
              href={item.link}
              target="_blank"
              className={
                "text-[14px] whitespace-nowrap text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-normal leading-[18px] tracking-[-0.21px] cursor-pointer"
              }
            >
              {item.label}
            </a>
          ))}
        </Card>
      )}
      {/* ссылки */}

      <Card
        style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[8px]"
        padding={12}
      >
        {/* views and connections */}
        <div className="flex flex-row gap-[4px]">
          <TextMain
            text={data?.followersCount}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="подписчиков"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div>
        {/* <div className="flex flex-row gap-[4px]">
          <TextMain
            text={0}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="сотрудников в practica"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div> */}
        <div className="flex flex-row gap-[4px]">
          <TextMain
            text={data?.hrcount}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="рекрутеров"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div>
        {/* views and connections */}
      </Card>

      {children}
    </div>
  );
};

export default VacancyLeft;

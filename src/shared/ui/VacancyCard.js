"use client";

import Image from "next/image";

import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import SkillCard from "./SkillCard";
import BookmarkIcon from "../icons/BookmarkIcon";
import EmptyAvatar from "./EmptyAvatar";
import { useRouter } from "next/navigation";

const VacancyCard = ({ item, role = "student", userId }) => {
  const router = useRouter();

  return (
    <Card style="flex flex-col gap-[12px]" padding={12}>
      {/* image name time */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[12px]">
          <div className="min-w-[67px] h-[67px] w-[67px] min-h-[67px]  max-w-[67px] max-h-[67px] overflow-hidden rounded-full">
            {item.Company.image ? (
              <Image
                src={item.Company.image}
                width={67}
                height={67}
                alt="Profile image"
                className="min-w-[67px] max-w-[67px] max-h-[67px] h-[67px] w-[67px] min-h-[67px]"
              />
            ) : (
              <EmptyAvatar sixtySeven />
            )}
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex flex-row text-[#8f8f8f] flex-wrap font-medium text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]">
              <p
                onClick={() =>
                  router.push(
                    `/companyprofile/${
                      item.Company.username.length === 0
                        ? item.Company.id
                        : item.Company.username
                    }`
                  )
                }
                className="text-[#8f8f8f] font-medium break-all text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]"
              >
                {item.Company.username.length === 0
                  ? `@${item.Company.id}`
                  : `@${item.Company.username}`}
              </p>
              {item.hrCreator && (
                <>
                  &nbsp;•&nbsp;
                  <TextSecondary
                    onClick={() =>
                      router.push(`/profile/${item.hrCreator.username}`)
                    }
                    text={"@" + item.hrCreator.username}
                    style="font-medium text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]"
                  />
                </>
              )}
            </div>

            {item.currency ? (
              <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                от {item.salaryStart} {item.currency?.label} •{" "}
                {item.Location.map(
                  (i, key) =>
                    `${i.label}${key !== item.Location.length - 1 ? ", " : ""}`
                )}
                {!item.distantWork
                  ? ""
                  : item.Location.length > 0
                  ? ", возможно удаленно"
                  : "возможно удаленно"}
              </p>
            ) : (
              <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                По договоренности •{" "}
                {item.Location.map(
                  (i, key) =>
                    `${i.label}${key !== item.Location.length - 1 ? ", " : ""}`
                )}
                {!item.distantWork
                  ? ""
                  : item.Location.length > 0
                  ? ", возможно удаленно"
                  : "возможно удаленно"}
              </p>
            )}
          </div>
        </div>
        {(role === "student" || role === "hr") && (
          <BookmarkIcon item={item} userId={userId} />
        )}
      </div>
      {/* image name time */}

      {/* name and short desc */}
      <TextMain
        text={item.name}
        style="font-medium cursor-pointer text-[16px] leading-[19.2px] tracking-[-0.24px]"
        onClick={() => router.push(`/vacancy/${item.id}`)}
      />
      <TextSecondary
        text={item.shortDescription}
        style={"text-[14px] leading-[17px] tracking-[-0.252px]"}
      />
      {/* name and short desc */}

      {/* skills */}
      {item.VacancySkills.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row flex-wrap overflow-hidden gap-[8px] h-[24px]">
            {item.vacArea.map((item) => (
              <SkillCard
                area
                hard={false}
                key={item.id}
                style="mr-[4px]"
                text={item.label}
              />
            ))}
            {item.VacancySkills.map((item) => (
              <SkillCard
                hard={item.skill.type == "hard"}
                soft={item.skill.type == "soft"}
                key={item.id}
                style="mr-[4px]"
                text={item.skill.name}
              />
            ))}
          </div>
        </div>
      )}
      {/* skills */}
    </Card>
  );
};

export default VacancyCard;

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import TextMain from "../Text/TextMain ";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import EmptyAvatar from "./EmptyAvatar";
import SkillCard from "./SkillCard";

const PeopleCard = ({ item }) => {
  const router = useRouter();

  const location = [item.city, item.country];

  return (
    <Card style="flex flex-col gap-[12px]" padding={12}>
      {/* image name time */}
      <div className="flex flex-row gap-[8px]">
        {item.image ? (
          <Image
            src={item.image}
            alt="Profile image"
            // loading="lazy"
            quality={100}
            width={67}
            height={67}
            className="h-[67px] w-[67px] rounded-[8px]"
          />
        ) : (
          <EmptyAvatar sixtySeven />
        )}
        <div className="flex flex-col gap-[4px]">
          <TextMain
            text={item.name}
            style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em]"
            onClick={() => router.push(`/profile/${item.username || item.id}`)}
          />
          {(item.city === null && item.country === null) ||
          (item.city?.length === 0 && item.country?.length === 0) ? null : (
            <TextSecondary
              text={location.map((i, key) =>
                !i
                  ? ""
                  : `${i}${
                      location[key + 1] === null ||
                      location[key + 1]?.length === 0 ||
                      key === location.length - 1
                        ? ""
                        : ", "
                    }`
              )}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
          )}
        </div>
      </div>
      {/* image name time */}

      {/* about */}
      {item.about && (
        <TextSecondary
          text={item.about}
          style={"text-[14px] leading-[17px] tracking-[-0.252px]"}
        />
      )}
      {/* about */}

      {/* skills */}
      {item.UserSkills.length > 0 && (
        <div className="flex flex-row flex-wrap overflow-hidden gap-[8px] h-[24px]">
          {item.UserSkills.map((item) => (
            <SkillCard
              hard={item.skill.type == "hard"}
              soft={item.skill.type == "soft"}
              key={item.id}
              style="mr-[4px]"
              text={item.skill.name}
            />
          ))}
        </div>
      )}
      {/* skills */}
    </Card>
  );
};

export default PeopleCard;

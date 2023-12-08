import Link from "next/link";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";
import TextCaption from "../../shared/Text/TextCaption";
import SkillCard from "../../shared/ui/SkillCard";
import { ButtonSecondary } from "../../shared/ui/Button";

import PenIcon from "../../shared/icons/PenIcon";

const ProfileInfo = ({ data, others = false }) => {
  if (
    (data?.about == null || data?.about == "") &&
    data?.workExperience?.length == 0 &&
    data?.education?.length == 0 &&
    data?.UserSkills?.length == 0
  )
    if (others)
      return (
        <Card style={"flex justify-center"}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={`Пользователь не заполнил информацию о себе`}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      );
    else
      return (
        <Card>
          <div
            className="items-center flex flex-col gap-[24px] mx-auto justify-center w-full max-w-[288px] text-center 
        my-[38px] [@media(pointer:coarse)]:my-[33px]"
          >
            <TextMain
              text={`Заполните профиль, чтобы здесь появилась информация о вас`}
              style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
            />
            <Link href="/profile/edit">
              <ButtonSecondary
                rounded={16}
                style="w-fit px-[12px] "
                text="Редактировать"
              >
                <PenIcon fill={"#5875e8"} />
              </ButtonSecondary>
            </Link>
          </div>
        </Card>
      );

  return (
    <>
      {(data?.about?.length > 0 ||
        data?.education?.length !== 0 ||
        data?.workExperience?.length !== 0) && (
        <Card style="flex flex-col h-full gap-[20px]">
          {/* about me */}
          {data.about && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text={others ? "О пользователе" : "Обо мне"}
                style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
              />

              <TextMain
                text={data?.about}
                style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
              />
            </div>
          )}
          {/* about me */}
          {/* education */}
          {data?.education?.length !== 0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text="Образование"
                style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
              />

              {data?.education?.map((item, key) => (
                <div className="flex flex-col gap-[4px]" key={key}>
                  <TextMain
                    key={key}
                    text={`${item?.name} • ${item?.degree}`}
                    style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
                  />
                  <TextCaption
                    text={`${item?.startDate} — ${item?.endDate}`}
                    style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
                  />
                </div>
              ))}
            </div>
          )}
          {/* education */}
          {/* workExpirience */}
          {data?.workExperience?.length != 0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text="Опыт работы"
                style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
              />

              {data?.workExperience?.map((item, key) => (
                <div className="flex flex-col gap-[4px]" key={key}>
                  <TextMain
                    text={`${item?.organization} • ${item?.post}`}
                    style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
                  />
                  <TextCaption
                    text={
                      item?.end_date === "Месяц Год"
                        ? `${item?.start_date} — ${"По сей день"}`
                        : `${item?.start_date} — ${item?.end_date}`
                    }
                    style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
                  />
                </div>
              ))}
            </div>
          )}
          {/* workExpirience */}
        </Card>
      )}

      {data?.UserSkills?.length != 0 && (
        <Card style="flex flex-col gap-[20px]">
          {/* Hard skills pc */}
          {data?.UserSkills.filter((item) => item?.type !== "soft")?.length >
            0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text="Хард-скиллы"
                style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
              />
              <div className="flex flex-row flex-wrap w-full gap-[8px]">
                {data?.UserSkills?.map(
                  (item, key) =>
                    item.type === "hard" && (
                      <SkillCard key={key} text={item?.name} />
                    )
                )}
              </div>
            </div>
          )}
          {/* Hard skills pc */}

          {/* Soft skills pc */}
          {data?.UserSkills.filter((item) => item?.type !== "hard")?.length >
            0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text="Софт-скиллы"
                style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
              />
              <div className="flex flex-row flex-wrap w-full gap-[8px]">
                {data?.UserSkills?.map(
                  (item, key) =>
                    item?.type === "soft" && (
                      <SkillCard
                        hard={false}
                        soft
                        key={key}
                        text={item?.name}
                      />
                    )
                )}
              </div>
            </div>
          )}
          {/* Soft skills pc */}
        </Card>
      )}
    </>
  );
};

export default ProfileInfo;

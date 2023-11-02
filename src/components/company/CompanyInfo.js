import Link from "next/link";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";
import { ButtonSecondary } from "../../shared/ui/Button";

import PenIcon from "../../shared/icons/PenIcon";

const CompanyInfo = ({ data, others = false }) => {
  if (
    (data.employee == null || data.employee == "") &&
    (data.slogan == null || data.slogan == "") &&
    (data.industry == null || data.industry == "")
  )
    if (others)
      return (
        <Card style={"flex justify-center"}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={`Нет информации о компании`}
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
              text={`Заполните профиль, чтобы здесь появилась информация о компании`}
              style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
            />
            <Link href="/companyprofile/edit">
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
    <Card style="flex flex-col gap-[20px]">
      {/* slogan */}
      {data.slogan !== null && data.slogan !== "" && (
        <div className="flex flex-col gap-[8px]">
          <TextSecondary
            text={"Слоган"}
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />

          <TextMain
            text={data.slogan}
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />
        </div>
      )}
      {/* slogan */}

      {/* industry */}
      {data.industry !== null && data.industry.length !== 0 && (
        <div className="flex flex-col gap-[8px]">
          <TextSecondary
            text="Отрасль"
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />

          <TextMain
            text={data.industry.label}
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />
        </div>
      )}
      {/* industry */}

      {/* employee */}
      {data.employee !== null && data.employee.length !== 0 && (
        <div className="flex flex-col gap-[8px]">
          <TextSecondary
            text="Сотрудники"
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />

          <TextMain
            text={data.employee.label}
            style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
          />
        </div>
      )}
      {/* employee */}
    </Card>
  );
};

export default CompanyInfo;

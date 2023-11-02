import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain ";

const VacancySubInfo = ({ data }) => {
  return (
    <Card style={"flex flex-col gap-[32px]"} padding={12}>
      {/* location */}
      <div className="flex flex-col gap-[8px]">
        <TextMain
          text="Локация"
          style={"text-[14px] font-semibold leading-[17px] tracking-[-0.182px]"}
        />
        <TextMain
          text={`${data.Location.map((i, key) => ` ${i.label}`)}${
            !data.distantWork
              ? ""
              : data.Location.length > 0
              ? ", возможно удаленно"
              : "возможно удаленно"
          }`}
          style={"text-[14px] font-normal leading-[17px] tracking-[-0.21px]"}
        />
      </div>
      {/* location */}
      {/* format */}
      <div className="flex flex-col gap-[8px]">
        <TextMain
          text="Занятость"
          style={"text-[14px] font-semibold leading-[17px] tracking-[-0.182px]"}
        />
        <TextMain
          text={data.format.text}
          style={"text-[14px] font-normal leading-[17px] tracking-[-0.21px]"}
        />
      </div>
      {/* format */}
      {/* contract */}
      <div className="flex flex-col gap-[8px]">
        <TextMain
          text="Тип договора"
          style={"text-[14px] font-semibold leading-[17px] tracking-[-0.182px]"}
        />
        <TextMain
          text={data.contract.label}
          style={"text-[14px] font-normal leading-[17px] tracking-[-0.21px]"}
        />
      </div>
      {/* contract */}
      {/* salary */}
      <div className="flex flex-col gap-[8px]">
        <TextMain
          text="Зарплата"
          style={"text-[14px] font-semibold leading-[17px] tracking-[-0.182px]"}
        />
        <TextMain
          text={`${
            data.currency
              ? `от ${data.salaryStart} до ${data.salaryEnd} ${data.currency.label}`
              : "по договоренности"
          }`}
          style={"text-[14px] font-normal leading-[17px] tracking-[-0.21px]"}
        />
      </div>
      {/* salary */}
    </Card>
  );
};

export default VacancySubInfo;

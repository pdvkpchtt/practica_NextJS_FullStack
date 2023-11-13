import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDown from "../../shared/ui/DropDown";
import TextSecondary from "../../shared/Text/TextSecondary";
import CheckBox from "../../shared/ui/CheckBox";

const CompanyFilter = ({
  dropDataVacancies = {},
  updateCompanies = [],
  setUpdateCompanies = {},
}) => {
  return (
    <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-b-[20px]">
      <div className="flex flex-col w-full">
        <TextSecondary
          text={"Отрасль"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <DropDownWithSearch
          city={updateCompanies?.industry?.label}
          setCity={(val) => {
            setUpdateCompanies({
              ...updateCompanies,
              industry: val,
            });
          }}
          items={dropDataVacancies?.industry}
          placeholder={"Не выбрано"}
        />
      </div>

      <div className="flex flex-col w-full">
        <TextSecondary
          text={"Сотрудники"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <DropDownWithSearch
          city={updateCompanies?.employee?.label}
          setCity={(val) => {
            setUpdateCompanies({
              ...updateCompanies,
              employee: val,
            });
          }}
          items={dropDataVacancies?.employee}
          placeholder={"Не выбрано"}
        />
      </div>

      {/* isStartap */}
      <div className="flex flex-row w-full items-center">
        <CheckBox
          active={
            updateCompanies.isStartap !== null
              ? updateCompanies.isStartap
              : false
          }
          onClick={() =>
            setUpdateCompanies({
              ...updateCompanies,
              isStartap:
                updateCompanies.isStartap !== null
                  ? !updateCompanies.isStartap
                  : true,
            })
          }
        />
        <TextSecondary
          text={"Только стартапы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
        />
      </div>
      {/* isStartap */}
    </div>
  );
};

export default CompanyFilter;

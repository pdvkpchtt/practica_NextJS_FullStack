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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`min-w-[24px] min-h-[24px] h-[24px] w-[24px]`}
          onClick={() =>
            setUpdateCompanies({
              ...updateCompanies,
              isStartap:
                updateCompanies.isStartap !== null
                  ? !updateCompanies.isStartap
                  : true,
            })
          }
        >
          <path
            d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z"
            className={
              updateCompanies.isStartap !== null
                ? `${
                    updateCompanies.isStartap === true &&
                    "fill-[#5875e8] group-hover:fill-[#3A56C5] group-active:fill-[#2C429C] "
                  } stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
                : "stroke-[#8f8f8f]"
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke={updateCompanies.isStartap === true ? "white" : "none"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

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

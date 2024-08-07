"use clinet";

import DropDown from "../../shared/ui/DropDown";
import { useEffect, useState } from "react";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";

const monthDropDownInfo = [
  { label: "Январь", value: "1", for: "Месяц" },
  { label: "Февраль", value: "2", for: "Месяц" },
  { label: "Март", value: "3", for: "Месяц" },
  { label: "Апрель", value: "4", for: "Месяц" },
  { label: "Май", value: "5", for: "Месяц" },
  { label: "Июнь", value: "6", for: "Месяц" },
  { label: "Июль", value: "7", for: "Месяц" },
  { label: "Август", value: "8", for: "Месяц" },
  { label: "Сентябрь", value: "9", for: "Месяц" },
  { label: "Октябрь", value: "10", for: "Месяц" },
  { label: "Ноябрь", value: "11", for: "Месяц" },
  { label: "Декабрь", value: "12", for: "Месяц" },
];
let years = function (startYear) {
  var currentYear = new Date().getFullYear(),
    years = [],
    count = 1;
  startYear = startYear || 1980;
  while (startYear <= currentYear)
    years.push({ label: `${startYear++}`, value: `${count++}`, for: `Год` });
  return years;
};

const yearDropDownInfo = years(1900).reverse();

const DropDownHandler = ({
  item,
  onUpdateMonth,
  onUpdateYear,
  isStill = false,
  start = true,
  end = false,
}) => {
  // const [monthChoise, setMonthChoise] = useState(item?.split(" ")[0]);
  // const [yearChoise, setYearChoise] = useState(item?.split(" ")[1]);

  // useEffect(() => {
  //   onUpdate(`${monthChoise || null} ${yearChoise || null}`);
  // }, [monthChoise, yearChoise]);

  // useEffect(() => {
  //   setMonthChoise(item?.split(" ")[0]);
  //   setYearChoise(item?.split(" ")[1]);
  // }, [item]);
  // educationState[key].startDate === null
  // ? yearDropDownInfo
  // : yearDropDownInfo.filter(
  //     (i) =>
  //       Number(educationState[key].startDate) <=
  //       Number(i.label)
  //   )
  console.log(Number(item.start_year) > Number(item.end_year));
  return (
    <div className="flex flex-row gap-[8px] w-full">
      <DropDownWithSearch
        styled={`max-w-[175px] w-full transition-all duration-[250ms] ${
          isStill && "opacity-[30%]"
        }`}
        city={start ? item.start_month || "" : item.end_month || ""}
        setCity={(val) => {
          onUpdateMonth(val.label);
        }}
        items={monthDropDownInfo}
        placeholder={"Месяц"}
      />
      <DropDownWithSearch
        styled={`max-w-[112px] w-full transition-all duration-[250ms] ${
          isStill && "opacity-[30%]"
        }`}
        city={start ? item.start_year || "" : item.end_year || ""}
        setCity={(val) => {
          onUpdateYear(val.label);
        }}
        items={
          end
            ? item?.start_year === null
              ? yearDropDownInfo
              : yearDropDownInfo.filter(
                  (i) => Number(item?.start_year) <= Number(i.label)
                )
            : yearDropDownInfo
        }
        placeholder={"Год"}
      />
      {/* <DropDown
        choise={item?.split(" ")[0] || "Месяц"}
        // choise={monthChoise}
        handleSetChoise={(choise) => setMonthChoise(choise)}
        items={monthDropDownInfo}
        itemsFor={"Месяц"}
        marginBottom={8}
      />
      <DropDown
        choise={item?.split(" ")[1] || "Год"}
        // choise={yearChoise}
        handleSetChoise={(choise) => setYearChoise(choise)}
        items={yearDropDownInfo}
        itemsFor={"Год"}
      /> */}
    </div>
  );
};

export default DropDownHandler;

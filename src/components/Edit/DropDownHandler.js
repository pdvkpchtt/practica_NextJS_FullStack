"use clinet";

import DropDown from "../../shared/ui/DropDown";
import { useEffect, useState } from "react";

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
const yearDropDownInfo = [
  { label: "1995", value: "1", for: "Год" },
  { label: "1996", value: "2", for: "Год" },
  { label: "1997", value: "3", for: "Год" },
  { label: "1998", value: "4", for: "Год" },
  { label: "1999", value: "5", for: "Год" },
  { label: "2000", value: "6", for: "Год" },
  { label: "2001", value: "7", for: "Год" },
  { label: "2002", value: "8", for: "Год" },
  { label: "2003", value: "9", for: "Год" },
  { label: "2004", value: "10", for: "Год" },
  { label: "2005", value: "11", for: "Год" },
  { label: "2006", value: "12", for: "Год" },
  { label: "2007", value: "13", for: "Год" },
  { label: "2008", value: "14", for: "Год" },
  { label: "2009", value: "15", for: "Год" },
  { label: "2010", value: "16", for: "Год" },
  { label: "2011", value: "17", for: "Год" },
  { label: "2012", value: "18", for: "Год" },
  { label: "2013", value: "19", for: "Год" },
  { label: "2014", value: "20", for: "Год" },
  { label: "2015", value: "21", for: "Год" },
  { label: "2016", value: "22", for: "Год" },
  { label: "2017", value: "23", for: "Год" },
  { label: "2018", value: "24", for: "Год" },
  { label: "2019", value: "25", for: "Год" },
  { label: "2020", value: "26", for: "Год" },
  { label: "2021", value: "27", for: "Год" },
  { label: "2022", value: "28", for: "Год" },
  { label: "2023", value: "29", for: "Год" },
];

const DropDownHandler = ({ item, onUpdate }) => {
  const [monthChoise, setMonthChoise] = useState(
    item?.split(" ")[0] || "Месяц"
  );
  const [yearChoise, setYearChoise] = useState(item?.split(" ")[1] || "Год");

  useEffect(() => {
    onUpdate(`${monthChoise || "Месяц"} ${yearChoise || "Год"}`);
  }, [monthChoise, yearChoise]);

  useEffect(() => {
    setMonthChoise(item?.split(" ")[0] || "Месяц");
    setYearChoise(item?.split(" ")[1] || "Год");
  }, [item]);

  return (
    <div className="flex flex-row gap-[8px] w-full">
      <DropDown
        styled="max-w-[175px] w-full"
        // choise={item.split(" ")[0] || "Месяц"}
        choise={monthChoise}
        handleSetChoise={(choise) => setMonthChoise(choise)}
        items={monthDropDownInfo}
        itemsFor={"Месяц"}
        marginBottom={8}
      />
      <DropDown
        styled="max-w-[112px] w-full"
        // choise={item.split(" ")[1] || "Год"}
        choise={yearChoise}
        handleSetChoise={(choise) => setYearChoise(choise)}
        items={yearDropDownInfo}
        itemsFor={"Год"}
      />
    </div>
  );
};

export default DropDownHandler;

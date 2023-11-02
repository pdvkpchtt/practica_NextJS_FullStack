"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import EditCompanyLeft from "./EditCompanyLeft";
import EditCompanyRight from "./EditCompanyRight";

const EditCompany = ({
  data,
  updateCompanyData,
  itemsForDD,
  itemsForDD2,
  itemsForDD3,
}) => {
  const router = useRouter();

  const [dataToUpdate, setDataToUpdate] = useState(data);

  return (
    <>
      <EditCompanyLeft
        data={data}
        itemsForDD3={itemsForDD3}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
      />
      <EditCompanyRight
        data={data}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        updateCompanyData={updateCompanyData}
        itemsForDD={itemsForDD}
        itemsForDD2={itemsForDD2}
      />
    </>
  );
};

export default EditCompany;

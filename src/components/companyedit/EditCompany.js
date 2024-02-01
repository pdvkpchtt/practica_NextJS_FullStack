"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import EditCompanyLeft from "./EditCompanyLeft";
import EditCompanyRight from "./EditCompanyRight";

const EditCompany = ({
  data,
  dataToCompare,
  updateCompanyData,
  itemsForDD,
  itemsForDD2,
  itemsForDD3,
}) => {
  // const router = useRouter();

  const [dataToUpdate, setDataToUpdate] = useState(data);
  // validate
  const [status, setStatus] = useState(null);
  // validate

  return (
    <>
      <EditCompanyLeft
        data={data}
        status={status}
        setStatus={setStatus}
        itemsForDD3={itemsForDD3}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
      />
      <EditCompanyRight
        data={data}
        status={status}
        setStatus={setStatus}
        dataToCompare={dataToCompare}
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

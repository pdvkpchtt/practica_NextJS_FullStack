"use client";

import { useState } from "react";
import CreateCompanyLeft from "./CreateCompanyLeft";
import CreateCompanyRight from "./CreateCompanyRight";

const CreateCompany = ({ itemsForDD, itemsForDD2, itemsForDD3 }) => {
  const [dataToUpdate, setDataToUpdate] = useState({
    image: null,
    name: "",
    username: "",
    about: "",
    slogan: "",
    Cities: [],
    Links: [],
    employee: { label: "" },
    industry: { label: "" },
    isStartap: false,
  });
  const dataToCompare = {
    image: null,
    name: "",
    username: "",
    about: "",
    slogan: "",
    Cities: [],
    Links: [],
    employee: { label: "" },
    industry: { label: "" },
    isStartap: false,
  };
  const [status, setStatus] = useState(null);

  console.log(dataToUpdate, "new comp data");

  return (
    <>
      <CreateCompanyLeft
        status={status}
        setStatus={setStatus}
        itemsForDD3={itemsForDD3}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
      />
      <CreateCompanyRight
        status={status}
        setStatus={setStatus}
        dataToCompare={dataToCompare}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        itemsForDD={itemsForDD}
        itemsForDD2={itemsForDD2}
      />
    </>
  );
};

export default CreateCompany;

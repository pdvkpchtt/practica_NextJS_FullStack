"use client";

import { useState } from "react";

import CompanyLeft from "../../components/company/CompanyLeft";
import CreateVacancyRight from "./CreateVacancyRight";

const CreateVacancy = ({ data, skills }) => {
  const [dataToUpdate, setDataToUpdate] = useState({
    name: "",
    shortDescription: "",
    description: "",
    conditions: "",
    waitings: "",
    vacArea: [],
    Location: [],
    format: { label: "" },
    contract: { label: "" },
    experience: { label: "" },
    EducationLevel: { label: "" },
    salaryStrat: "",
    salaryEnd: "",
    currency: { label: "" },
    VacancySkills: [],
    distantWork: false,

    priceByTalk: false,
  });

  console.log(dataToUpdate, "jopa2");

  return (
    <>
      <CompanyLeft data={data} withoutActions />
      <CreateVacancyRight
        skills={skills}
        dataToUpdate={dataToUpdate}
        setDataToUpdate={setDataToUpdate}
      />
    </>
  );
};

export default CreateVacancy;

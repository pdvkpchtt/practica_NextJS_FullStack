"use client";

import { useRouter } from "next/navigation";

import VacancyLeft from "./VacancyLeft";
import VacancyRight from "./VacancyRight";
import VacancySubInfo from "./VacancySubInfo";

const VacancyPage = ({ data, role, userId }) => {
  const router = useRouter();

  return (
    <>
      <VacancyLeft
        onClick={() => router.push(`/companyprofile/${data.Company.username}`)}
        data={data}
      >
        <VacancySubInfo data={data} />
      </VacancyLeft>
      <VacancyRight data={data} role={role} userId={userId} />
    </>
  );
};

export default VacancyPage;

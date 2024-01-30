import { redirect } from "next/navigation";

import { getServSession } from "../../../api/auth/[...nextauth]/route";
import CreateVacancy from "../../../../components/createvacancy/CreateVacancy";
import { getAllSkills } from "../../../../server/actions/getAllSkills";
import { getCompany } from "../../../../server/actions/company/getCompany";

const CreateVacancyPage = async ({ params: { id } }) => {
  const data = await getCompany({
    companyId: id,
  });
  console.log(data);
  const skills = await getAllSkills();

  if (!data) redirect("/not_found");

  return <CreateVacancy skills={skills} data={data} />;
};

export default CreateVacancyPage;

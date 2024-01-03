import VacancyPage from "../../../components/vacancy/VacancyPage";
import { getVacancyById } from "../../../server/actions/company/getVacancyById";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { setView } from "../../../server/actions/vacancy/setView";

const VacancyIdPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getVacancyById(id);
  console.log("vacancy", data);

  await setView(id, session?.user?.id);

  return (
    <VacancyPage
      role={session.user.role}
      data={data}
      userId={session.user.id}
    />
  );
};

export default VacancyIdPage;

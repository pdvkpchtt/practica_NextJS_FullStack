import { getPeoples } from "../../../server/actions/getPeoples";
import { getAllSkills } from "../../../server/actions/getAllSkills";
import Search from "../../../components/search/Search";
import { getServSession } from "app/api/auth/[...nextauth]/route";

const page = async ({ params: { category } }) => {
  const session = await getServSession();

  return <Search session={session} />;
};

export default page;

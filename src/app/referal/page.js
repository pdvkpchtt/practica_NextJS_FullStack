import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import Referal from "../../components/referal/Referal";
import { getReferal } from "../../server/actions/referal/getReferal";

const SubscriptionsPage = async () => {
  const data = await getReferal();
  const session = await getServSession();
  console.log(data, "server referals");
  const link = process.env.NEXTAUTH_URL;

  return (
    <div className="flex flex-row w-full h-full">
      <Referal data={data} link={link} id={session?.user?.id} />
    </div>
  );
};

export default SubscriptionsPage;

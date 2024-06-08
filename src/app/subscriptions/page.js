import { getSubscriptions } from "../../server/actions/subscriptions/getSubscriptions";
import Subscriptions from "../../components/subscriptions/Subscriptions";
import { redirect } from "next/navigation";

const SubscriptionsPage = async () => {
  const data = await getSubscriptions();
  console.log(data, "server subscriptions");

  // пока этот экран не нужен
  return redirect("_not-found_");

  return (
    <div className="flex flex-row w-full h-full">
      <Subscriptions data={data} />
    </div>
  );
};

export default SubscriptionsPage;

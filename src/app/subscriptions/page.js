import { getSubscriptions } from "../../server/actions/subscriptions/getSubscriptions";
import Subscriptions from "../../components/subscriptions/Subscriptions";

const SubscriptionsPage = async () => {
  const data = await getSubscriptions();
  console.log(data, "server subscriptions");

  return (
    <div className="flex flex-row w-full h-full">
      <Subscriptions data={data} />
    </div>
  );
};

export default SubscriptionsPage;

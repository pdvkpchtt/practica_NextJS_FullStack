import { redirect } from "next/navigation";
import { getConnctionsCount } from "../../server/actions/connections/getConnctionsCount";
import CustomLoader from "../../shared/ui/CustomLoader";

const FeedPage = async () => {
  const connectionsCount = await getConnctionsCount();
  if (connectionsCount === 0) return redirect("/feed/yesfuture");
  else return redirect("/feed/foryou");
};

export default FeedPage;

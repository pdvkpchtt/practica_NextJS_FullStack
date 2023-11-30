import { redirect } from "next/navigation";

import { getConnctionsCount } from "../../server/actions/connections/getConnctionsCount";
import CustomLoader from "../../shared/ui/CustomLoader";

const FeedPage = async () => {
  const connectionsCount = await getConnctionsCount();
  if (connectionsCount === 0) redirect("/feed/yesfuture");
  else redirect("/feed/foryou");

  return (
    <div className="overflow-y-auto [@media(pointer:coarse)]:mt-[77px] flex items-center justify-center [@media(hover)]:max-h-[calc(100vh-230px)] h-full">
      <CustomLoader />
    </div>
  );
};

export default FeedPage;

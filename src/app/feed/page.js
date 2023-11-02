import { redirect } from "next/navigation";

import CustomLoader from "../../shared/ui/CustomLoader";

const FeedPage = () => {
  redirect("/feed/foryou");

  return (
    <div className="overflow-y-auto [@media(pointer:coarse)]:mt-[77px] flex items-center justify-center [@media(hover)]:max-h-[calc(100vh-230px)] h-full">
      <CustomLoader />
    </div>
  );
};

export default FeedPage;

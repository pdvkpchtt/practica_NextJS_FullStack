"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getConnctionsCount } from "../../server/actions/connections/getConnctionsCount";
import CustomLoader from "../../shared/ui/CustomLoader";

const FeedPage = () => {
  const router = useRouter();

  const sync = async () => {
    const connectionsCount = await getConnctionsCount();
    if (connectionsCount === 0) router.push("/feed/yesfuture");
    else router.push("/feed/foryou");
  };

  useEffect(() => {
    sync();
  }, []);

  return (
    <div className="overflow-y-auto [@media(pointer:coarse)]:mt-[77px] flex items-center justify-center [@media(hover)]:max-h-[calc(100vh-230px)] h-full">
      <CustomLoader diameter={36} />
    </div>
  );
};

export default FeedPage;

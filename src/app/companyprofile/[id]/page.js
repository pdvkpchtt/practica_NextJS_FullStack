import { redirect } from "next/navigation";

import { getHrsPosts } from "../../../server/actions/company/getHrsPosts";
import OthersCompanyWithNav from "../../../components/othersCompany/OthersCompanyWithNav";
import { getCompany } from "../../../server/actions/company/getCompany";
import { getUserPosts } from "../../../server/actions/getUserPosts";
import { reactOnPost } from "../../../server/actions/reactOnPost";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import CompanyProfile from "../../../components/company/CompanyProfile";

const OthersCompanyPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getCompany({
    companyId: id,
  });

  if (!data) {
    redirect("/not-found");
  }

  // if (data.imHr) {
  //   redirect("/companyprofile");
  // }

  console.log("companyprofile", data);

  async function getUserFeed(cursor) {
    "use server";
    const posts = await getHrsPosts(data.id, cursor, session?.user?.id);

    return posts;
  }
  async function addReaction(postId, type) {
    "use server";
    const session = await getServSession();
    const data = await reactOnPost({
      id: session.user.id,
      type: type,
      postId,
    });

    return data;
  }

  return (
    <>
      {data?.imHr === true ? (
        <CompanyProfile
          data={data}
          getUserFeed={getUserFeed}
          addReaction={addReaction}
          role={session.user.role}
          userId={session.user.id}
        />
      ) : (
        <div
          className="flex gap-[16px] [@media(pointer:coarse)]:gap-[12px] w-full
        flex-row [@media(pointer:coarse)]:flex-col
      "
        >
          <OthersCompanyWithNav
            otherId={data.user.id}
            data={data}
            getUserFeed={getUserFeed}
            addReaction={addReaction}
            role={session.user.role}
            userId={session.user.id}
          />
        </div>
      )}
    </>
  );
};

export default OthersCompanyPage;

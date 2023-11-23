import { getUserPosts } from "../../server/actions/getUserPosts";
import { reactOnPost } from "../../server/actions/reactOnPost";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { getCompanyProfile } from "../../server/actions/company/getCompanyProfile";
import CompanyProfile from "../../components/company/CompanyProfile";

const CompanyPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: "hr",
  });

  async function getUserFeed(cursor) {
    "use server";
    const session = await getServSession();
    const posts = await getUserPosts(session.user.id, cursor);

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
    <CompanyProfile
      data={data}
      getUserFeed={getUserFeed}
      addReaction={addReaction}
      role={session.user.role}
      userId={session.user.id}
    />
  );
};

export default CompanyPage;

import { redirect } from "next/navigation";

import { chechIfChatExist } from "../../../server/actions/messenger/chechIfChatExist";
import OthersProfileWithNav from "../../../components/othersPorfile/OthersProfileWithNav";
import { getProfile } from "../../../server/actions/getProfile";
import { getUserPosts } from "../../../server/actions/getUserPosts";
import { reactOnPost } from "../../../server/actions/reactOnPost";
import { getServSession } from "../../api/auth/[...nextauth]/route";

const OthersProfilePage = async ({ params: { id } }) => {
  const session = await getServSession();

  if (session.user.id === id || session.user.username === id) {
    redirect("/profile");
  }

  const data = await getProfile({
    userId: id,
  });

  if (!data) {
    redirect("/not-found");
  }

  const ifChatExist = await chechIfChatExist(data.id);

  console.log("profile", data);

  async function getUserFeed(cursor) {
    "use server";
    const session = await getServSession();
    const posts = await getUserPosts(data.id, cursor);

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
    <div
      className="flex gap-[16px] [@media(pointer:coarse)]:gap-[12px] w-full
        flex-row [@media(pointer:coarse)]:flex-col
      "
    >
      <OthersProfileWithNav
        ifChatExist={ifChatExist}
        otherId={data.id}
        data={data}
        getUserFeed={getUserFeed}
        addReaction={addReaction}
      />
    </div>
  );
};

export default OthersProfilePage;

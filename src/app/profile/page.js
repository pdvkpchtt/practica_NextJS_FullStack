import { getServSession } from "../api/auth/[...nextauth]/route";
import { getProfile } from "../../server/actions/getProfile";
import { getUserPosts } from "../../server/actions/getUserPosts";
import { reactOnPost } from "../../server/actions/reactOnPost";
import Profile from "../../components/Profile/Profile";
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import { redirect } from "next/navigation";

const ProfiePage = async ({ searchParams }) => {
  const session = await getServSession();

  const data = await getProfile({
    userId: session.user.id,
  });

  if (!data) {
    return redirect("/not-found");
  }

  return redirect(
    `/profile/${data?.username}${
      searchParams?.contacts !== null && "?contacts=true"
    }`
  );

  // console.log("profile", data);

  // async function getUserFeed(cursor) {
  //   "use server";
  //   const session = await getServSession();
  //   const posts = await getUserPosts(session.user.id, cursor);

  //   return posts;
  // }
  // async function addReaction(postId, type) {
  //   "use server";
  //   const session = await getServSession();
  //   const data = await reactOnPost({
  //     id: session.user.id,
  //     type: type,
  //     postId,
  //   });

  //   return data;
  // }

  // const pitchesFirst = await getPitchesCount();
  // const superPitchesFirst = await getPitchesCount("superpitch");

  // return (
  //   <Profile
  //     data={data}
  //     getUserFeed={getUserFeed}
  //     addReaction={addReaction}
  //     userId={session.user.id}
  //     pitchesFirst={pitchesFirst}
  //     superPitchesFirst={superPitchesFirst}
  //   />
  // );
};

export default ProfiePage;

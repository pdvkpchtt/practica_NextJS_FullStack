import { getServSession } from "../api/auth/[...nextauth]/route";
import { getProfile } from "../../server/actions/getProfile";
import { getUserPosts } from "../../server/actions/getUserPosts";
import { reactOnPost } from "../../server/actions/reactOnPost";
import Profile from "../../components/Profile/Profile";
import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import { redirect } from "next/navigation";
import CustomLoader from "../../shared/ui/CustomLoader";

const ProfiePage = async ({ searchParams }) => {
  const session = await getServSession();

  return redirect(
    `/profile/${session?.user?.username}${
      searchParams?.contacts ? "?contacts=true" : ""
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

  return (
    <div className="[@media(hover)]:absolute [@media(pointer:coarse)]:max-w-[500px] [@media(pointer:coarse)]:mx-auto top-[50%] z-[203] [@media(hover)]:mt-[-27px] [@media(pointer:coarse)]:my-auto [@media(hover)]:left-[calc(50%-24px)] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:flex [@media(pointer:coarse)]:justify-center">
      <CustomLoader />
    </div>
  );
};

export default ProfiePage;

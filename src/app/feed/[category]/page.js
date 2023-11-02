import Feed from "../../../components/feed/Feed";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getPosts } from "../../../server/actions/getPosts";
import { reactOnPost } from "../../../server/actions/reactOnPost";

const FeedCategoryPage = async ({ params: { category } }) => {
  const session = await getServSession();

  async function getFeed(cursor) {
    "use server";
    const session = await getServSession();
    const posts = await getPosts(session.user.id, cursor);

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
      {category === "foryou" && (
        <Feed
          getFeed={getFeed}
          addReaction={addReaction}
          userId={session.user.id}
        />
      )}
      {category === "education" && <div>education</div>}
      {category === "offtop" && <div>foryou</div>}
    </>
  );
};

export default FeedCategoryPage;

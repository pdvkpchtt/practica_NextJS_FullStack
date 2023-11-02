import { getPostById } from "../../../../server/actions/getPostById";
import MobilePostPage from "../../../..//components/feed/MobilePostPage";
import { reactOnPost } from "../../../..//server/actions/reactOnPost";
import { getServSession } from "../../../api/auth/[...nextauth]/route";

const PostPage = async ({ params: { id } }) => {
  const session = await getServSession();

  async function getPost() {
    "use server";
    const post = await getPostById(id, session.user.id);

    return post;
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
    <MobilePostPage
      userId={session.user.id}
      getPost={getPost}
      addReaction={addReaction}
    />
  );
};

export default PostPage;

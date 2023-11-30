import FeedNav from "../../components/feed/FeedNav";
import FeedNavMobile from "../../components/feed/FeedNavMobile";
import FeedWrap from "../../components/feed/FeedWrap";
import ModalContextWrap from "../../components/feed/ModalContext";
import { addPost } from "../../server/actions/addPost";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { getConnctionsCount } from "../../server/actions/connections/getConnctionsCount";

const RootLayout = async ({ children }) => {
  async function sendPost({ title, text, reactions, category }) {
    "use server";
    const session = await getServSession();
    const data = await addPost({
      id: session.user.id,
      title: title,
      text: text,
      reactions: reactions,
      category: category,
    });
    return data;
  }

  // const connectionsCount = await getConnctionsCount();

  return (
    <div
      className={`w-full flex flex-row  [@media(hover)]:mt-[62px] gap-[24px] h-full hideScrollbarNav [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:gap-[0px]`}
    >
      <ModalContextWrap>
        <FeedNav />
        <FeedNavMobile />
        <FeedWrap sendPost={sendPost}>{children}</FeedWrap>
      </ModalContextWrap>
    </div>
  );
};

export default RootLayout;

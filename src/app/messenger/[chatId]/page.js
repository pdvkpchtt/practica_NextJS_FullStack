import ChatParent from "../../../components/messenger/ChatParent";
import ChatsPanel from "../../../components/messenger/ChatsPanel";

const TestChatPage = async ({ params: { chatId }, searchParams }) => {
  const user_id = searchParams?.user_id;

  return (
    <>
      <ChatParent chatId={chatId} user_id={user_id} />
    </>
  );
};

export default TestChatPage;

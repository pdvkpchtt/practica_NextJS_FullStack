import ChatsPanel from "../../../components/messenger/ChatsPanel";

const TestChatPage = async ({ params: { chatId }, searchParams }) => {
  const user_id = searchParams?.user_id;

  return (
    <>
      <ChatsPanel chatId={chatId} user_id={user_id} />
      {/* <MessengrLeft
        chatId={chatId}
        user_id={user_id}
        // profileData={profileData}
      /> */}
    </>
  );
};

export default TestChatPage;

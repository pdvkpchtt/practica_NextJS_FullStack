import { checkCircles } from "../../../server/actions/messenger/checkCircles";
import ChatInfo from "../../../components/messenger/ChatInfo";
import Chats from "../../../components/messenger/Chats";
import { getProfileByChatId } from "../../../server/actions/messenger/getProfileByChatId";
import MessengrLeft from "../../../components/messenger/MessengrLeft";
import { getInfoAboutPremium } from "../../../server/actions/messenger/getInfoAboutPremium";

const ChatPage = async ({ params: { chatId }, searchParams }) => {
  const user_id = searchParams?.user_id;

  const profileData = await getProfileByChatId(user_id, chatId);
  const type = await checkCircles(user_id, chatId);
  // const premSender = await getInfoAboutPremium(profileData.id);

  return (
    <>
      <Chats
        chatId={chatId}
        user_id={user_id}
        type={type.circle}
        profileData={profileData}
        // premSender={premSender}
      />
      <MessengrLeft
        chatId={chatId}
        user_id={user_id}
        // profileData={profileData}
      />
    </>
  );
};

export default ChatPage;

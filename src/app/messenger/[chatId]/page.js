import { checkCircles } from "../../../server/actions/messenger/checkCircles";
import ChatInfo from "../../../components/messenger/ChatInfo";
import Chats from "../../../components/messenger/Chats";
import { getProfileByChatId } from "../../../server/actions/messenger/getProfileByChatId";
import MessengrLeft from "../../../components/messenger/MessengrLeft";

const ChatPage = async ({ params: { chatId }, searchParams }) => {
  const user_id = searchParams?.user_id;

  const type = await checkCircles(user_id, chatId);
  const profileData = await getProfileByChatId(user_id, chatId);
  console.log("ya narik", profileData);
  // тут проверяем если юзер в 1 круге
  // const checkCirclesHandler = async () => {
  //   setLoading(true);
  //   if (user_id !== null) {
  //     // если чата нет
  //     const data = await checkCircles(user_id);
  //     console.log(data, "jopa2");
  //     if (
  //       data.firstCircle === null &&
  //       data.secondCircle === null &&
  //       data.thirdCircle === null &&
  //       type !== "superpitch"
  //     )
  //       router.push(`/messenger/preview?user_id=${user_id}&type=superpitch`);
  //     else if (data.firstCircle !== null && type !== null)
  //       router.push(`/messenger/preview?user_id=${user_id}`);
  //     else if (
  //       data.firstCircle === null &&
  //       data.secondCircle !== null &&
  //       (type === null || type !== "pitch")
  //     )
  //       router.push(`/messenger/preview?user_id=${user_id}&type=pitch`);
  //     else if (
  //       data.firstCircle === null &&
  //       data.secondCircle === null &&
  //       data.thirdCircle !== null &&
  //       (type === null || type !== "superpitch")
  //     )
  //       router.push(`/messenger/preview?user_id=${user_id}&type=superpitch`);
  //   } else {
  //     // если чат уже есть
  //     const data = await checkCircles2(chatId);
  //     console.log(data, "jopa2");
  //     if (
  //       data.firstCircle === null &&
  //       data.secondCircle === null &&
  //       data.thirdCircle === null &&
  //       type !== "superpitch"
  //     )
  //       router.push(`/messenger/${chatId}?type=superpitch`);
  //     else if (data.firstCircle !== null && type !== null)
  //       router.push(`/messenger/${chatId}`);
  //     else if (
  //       data.firstCircle === null &&
  //       data.secondCircle !== null &&
  //       (type === null || type !== "pitch")
  //     )
  //       router.push(`/messenger/${chatId}?type=pitch`);
  //     else if (
  //       data.firstCircle === null &&
  //       data.secondCircle === null &&
  //       data.thirdCircle !== null &&
  //       (type === null || type !== "superpitch")
  //     )
  //       router.push(`/messenger/${chatId}?type=superpitch`);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   checkCirclesHandler();
  // }, [searchParams]);
  // тут проверяем если юзер в 1 круге

  return (
    <>
      <Chats chatId={chatId} user_id={user_id} type={type.circle} />
      <MessengrLeft data={profileData} />
    </>
  );
};

export default ChatPage;

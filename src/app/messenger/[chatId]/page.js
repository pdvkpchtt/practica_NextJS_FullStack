import { checkCircles } from "../../../server/actions/messenger/checkCircles";
import { checkCircles2 } from "../../../server/actions/messenger/checkIfCircles2";
import ChatInfo from "../../../components/messenger/ChatInfo";
import Chats from "../../../components/messenger/Chats";

const ChatPage = async ({ params: { chatId }, searchParams }) => {
  const user_id = searchParams?.user_id;

  let type = null;

  if (user_id === null) {
    const circle = await checkCircles2(chatId);
    type =
      circle === 1
        ? ""
        : circle === 2
        ? "pitch"
        : circle >= 3
        ? "superpitch"
        : "";
  } else {
    const circle = await checkCircles(user_id);
    type =
      circle === 1
        ? ""
        : circle === 2
        ? "pitch"
        : circle >= 3
        ? "superpitch"
        : "";
  }
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
      <Chats chatId={chatId} user_id={user_id} type={type} />
      <ChatInfo />
    </>
  );
};

export default ChatPage;

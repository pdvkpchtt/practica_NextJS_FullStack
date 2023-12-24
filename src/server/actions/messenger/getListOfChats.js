import { prisma } from "../../db";

export const getListOfChats = async (id, cursor, searchInput, filterType) => {
  console.log(filterType, "пчем2у");

  const chats = await prisma.chat.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      participants: {
        select: {
          id: true,
          name: true,
          lastname: true,
          image: true,
        },
      },
      messages: {
        select: {
          id: true,
          chatId: true,
          userId: true,
          text: true,
          unRead: true,
          createdAt: true,
          type: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
    where: {
      participants: {
        some: {
          id: {
            in: [id],
          },
        },
      },
      messages: {
        some: {
          type: {
            in: filterType,
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const hasNextPage = chats.length > 10;
  let slicedPosts = chats;
  if (chats.length > 10) {
    slicedPosts = chats.slice(0, -1);
  }

  const result = slicedPosts.map((chat) => {
    // тут мы проеряяем, если это не беседа, то карточка чата имеет имя собеседника
    if (chat.participants.length === 2) {
      const chatLabel = `${
        chat.participants.filter((item) => item.id !== id)[0].name
      }${
        chat.participants.filter((item) => item.id !== id)[0]?.lastname
          ? " " +
            chat.participants.filter((item) => item.id !== id)[0]?.lastname
          : ""
      }`;
      const chatImage = chat.participants.filter((item) => item.id !== id)[0]
        .image;
      // если сообщений в чате нет, то lasnMessage для картоки это заготовленный текст
      let chatText = "";
      let chatIsUnread = false;
      let myMessageIsLast = false;
      let lastMessageCreatedAt = "";
      let lastMessageType = "";
      if (chat.messages.length === 0)
        chatText = "Начните диалог в беседе прямо сейчас";
      else {
        lastMessageType = chat?.messages[0]?.type;
        chatIsUnread = chat?.messages[0]?.unRead;
        myMessageIsLast = chat?.messages[0]?.userId === id;
        lastMessageCreatedAt = chat?.messages[0]?.createdAt;

        if (chat.messages[0].type === "vacancyReply")
          chatText = myMessageIsLast
            ? "Вы отправили отклик"
            : chat.messages[0].text;
        else if (chat.messages[0].type === "pitch")
          chatText = myMessageIsLast ? "Питч" : "Питч";
        else if (chat.messages[0].type === "superpitch")
          chatText = myMessageIsLast ? "Cуперпитч" : "Cуперпитч";
        else chatText = chat.messages[0].text;
      }

      return {
        id: chat.id,
        name: chat.name,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        participants: chat.participants,
        messages: chat.messages,
        myMessageIsLast: chat?.messages[0]?.userId === id,
        lastMessageCreatedAt: lastMessageCreatedAt,

        lastMessageType: lastMessageType,
        chatImage: chatImage,
        chatLabel: chatLabel,
        chatText: chatText,
        chatIsUnread: chatIsUnread,
      };
    } else {
      // если беседа, то карточка чата имеет имя name из бд

      // если сообщений в чате нет, то lasnMessage для картоки это заготовленный текст
      let chatText = "";
      let chatIsUnread = false;
      let lastMessageCreatedAt = "";
      let lastMessageType = "";
      if (chat.messages.length === 0)
        chatText = "Начните диалог в беседе прямо сейчас";
      else {
        lastMessageType = chat.messages[0].type;
        chatIsUnread = chat.messages[0].unRead;
        myMessageIsLast = chat?.messages[0]?.userId === id;
        lastMessageCreatedAt = chat.messages[0].createdAt;

        if (chat.messages[0].type === "vacancyReply")
          chatText = myMessageIsLast
            ? "Вы отправили отклик"
            : chat.messages[0].text;
        else if (chat.messages[0].type === "pitch")
          chatText = myMessageIsLast ? "Питч" : "Питч";
        else if (chat.messages[0].type === "superpitch")
          chatText = myMessageIsLast ? "Cуперпитч" : "Cуперпитч";
        else chatText = chat.messages[0].text;
      }

      return {
        id: chat.id,
        name: chat.name,
        lastname: chat.lastname,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        participants: chat.participants,
        messages: chat.messages,
        myMessageIsLast: chat?.messages[0]?.userId === id,
        lastMessageCreatedAt: lastMessageCreatedAt,

        lastMessageType: lastMessageType,
        chatLabel: chat.name,
        chatText: chatText,
        chatIsUnread: chatIsUnread,
      };
    }
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  const lastDate = lastPostInResults?.updatedAt || "";

  return {
    data:
      searchInput.length === 0
        ? result
        : result.filter((i) =>
            i.participants.find((i2) =>
              i2.name.toLowerCase().includes(searchInput.toLowerCase())
            )
          ),
    hasNextPage: hasNextPage,
    cursor: newCursor,
    lastDate,
  };
};

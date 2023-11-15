import { prisma } from "../../db";

export const updateListOfChats = async (id, lastDate, searchInputValue) => {
  const chats = await prisma.chat.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      participants: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      messages: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          unRead: true,
          userId: true,
          type: true,
        },
        take: -1,
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

      updatedAt: lastDate
        ? {
            gte: lastDate,
          }
        : {},
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  const result = chats.map((chat) => {
    // тут мы проеряяем, если это не беседа, то карточка чата имеет имя собеседника
    if (chat.participants.length === 2) {
      const chatLabel = chat.participants.filter((item) => item.id !== id)[0]
        .name;
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
        lastMessageType = chat.messages[chat.messages.length - 1].type;
        chatIsUnread = chat.messages[chat.messages.length - 1].unRead;
        myMessageIsLast = chat.messages[chat.messages.length - 1].userId === id;
        lastMessageCreatedAt =
          chat.messages[chat.messages.length - 1].createdAt;

        if (chat.messages[chat.messages.length - 1].type === "vacancyReply")
          chatText = myMessageIsLast
            ? "Вы отправили отклик"
            : chat.messages[chat.messages.length - 1].text;
        // else if
        else chatText = chat.messages[chat.messages.length - 1].text;
      }

      return {
        id: chat.id,
        name: chat.name,
        createdAt: chat.createdAt,
        participants: chat.participants,
        messages: chat.messages,
        myMessageIsLast: myMessageIsLast,
        lastMessageCreatedAt: lastMessageCreatedAt,

        chatImage: chatImage,
        chatLabel: chatLabel,
        chatText: chatText,
        lastMessageType: lastMessageType,
        chatIsUnread: chatIsUnread,
      };
    } else {
      // если беседа, то карточка чата имеет имя name из бд

      // если сообщений в чате нет, то lasnMessage для картоки это заготовленный текст
      let chatText = "";
      let chatIsUnread = false;
      let myMessageIsLast = false;
      let lastMessageCreatedAt = "";
      let lastMessageType = "";
      if (chat.messages.length === 0)
        chatText = "Начните диалог в беседе прямо сейчас";
      else {
        lastMessageType = chat.messages[chat.messages.length - 1].type;
        chatIsUnread = chat.messages[chat.messages.length - 1].unRead;
        myMessageIsLast = chat.messages[chat.messages.length - 1].userId === id;
        lastMessageCreatedAt =
          chat.messages[chat.messages.length - 1].createdAt;

        if (chat.messages[chat.messages.length - 1].type === "vacancyReply")
          chatText = myMessageIsLast
            ? "Вы отправили отклик"
            : chat.messages[chat.messages.length - 1].text;
        else chatText = chat.messages[chat.messages.length - 1].text;
      }

      return {
        id: chat.id,
        name: chat.name,
        createdAt: chat.createdAt,
        participants: chat.participants,
        messages: chat.messages,
        myMessageIsLast: myMessageIsLast,
        lastMessageCreatedAt: lastMessageCreatedAt,

        lastMessageType: lastMessageType,
        chatLabel: chat.name,
        chatText: chatText,
        chatIsUnread: chatIsUnread,
      };
    }
  });

  return {
    data:
      searchInputValue.length === 0
        ? result
        : result.filter((i) =>
            i.participants.find((i2) =>
              i2.name.toLowerCase().includes(searchInputValue.toLowerCase())
            )
          ),
  };
};

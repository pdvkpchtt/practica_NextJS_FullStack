import { prisma } from "../../db";

const updateMessages = async (chatId, userId, lastDate, searchInput) => {
  const data = await prisma.message.findMany({
    select: {
      id: true,
      chatId: true,
      User: {
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
        },
      },
      text: true,
      type: true,
      unRead: true,
      createdAt: true,
    },
    where:
      searchInput.length === 0
        ? { chatId: chatId, createdAt: lastDate ? { gte: lastDate } : {} }
        : {
            chatId: chatId,
            text: { contains: searchInput, mode: "insensitive" },
            createdAt: lastDate ? { gte: lastDate } : {},
          },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = data.length > 20;
  let slicedPosts = data;
  if (data.length > 20) {
    slicedPosts = data.slice(0, -1);
  }

  const result = slicedPosts.map((item) => {
    if (item.User.id === userId)
      return {
        id: item.id,
        chatId: item.chatId,
        user: item.User,
        text: item.text,
        unRead: item.unRead,
        myMessage: true,
        createdAt: item.createdAt,
        type: item.type,
      };
    else
      return {
        id: item.id,
        chatId: item.chatId,
        user: item.User,
        text: item.text,
        unRead: item.unRead,
        myMessage: false,
        createdAt: item.createdAt,
        type: item.type,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  //const lastDate = lastPostInResults?.createdAt || "";

  return { data: result };
};

export default updateMessages;

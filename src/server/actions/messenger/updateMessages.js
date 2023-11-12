import { prisma } from "../../db";
import { checkCircles } from "./checkCircles";

const updateMessages = async (chatId, userId, lastDate, searchInput) => {
  const circle = await checkCircles(null, chatId);

  var d = new Date();
  d.setDate(d.getDate() - 4);

  const check = await prisma.message.findFirst({
    where: {
      AND: [
        { chatId: chatId },
        { type: circle.circle },
        { createdAt: { gte: new Date(d.toString()).toISOString() } },
      ],
    },
    select: { id: true, type: true },
  });

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

  // unread
  // const notUnread = await prisma.message.updateMany({
  //   data: {
  //     unRead: false,
  //   },
  //   where: {
  //     AND: [{ chatId: chatId }, { User: { id: !userId } }],
  //   },
  // });
  // unread

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
        check: check,
        circle: circle.circle,
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
        check: check,
        circle: circle.circle,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  //const lastDate = lastPostInResults?.createdAt || "";

  return { data: result, check: check, circle: circle.circle };
};

export default updateMessages;

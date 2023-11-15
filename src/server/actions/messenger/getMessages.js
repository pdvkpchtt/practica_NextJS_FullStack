import { prisma } from "../../db";
import { checkCircles } from "./checkCircles";

const getMessages = async (
  chatId,
  userId,
  cursor,
  searchInput,
  otherUserId
) => {
  const circle = await checkCircles(otherUserId, chatId);

  var d = new Date();
  d.setDate(d.getDate() - 4);

  var d2 = new Date();
  d2.setDate(d2.getDate() - 6);

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

  const checkVacReply = await prisma.message.findFirst({
    where: {
      AND: [
        { chatId: chatId },
        { type: "vacancyReply" },
        { createdAt: { gte: new Date(d2.toString()).toISOString() } },
      ],
    },
    select: { id: true, type: true },
  });

  const data = await prisma.message.findMany({
    take: 21,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
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
      unRead: true,
      type: true,
      createdAt: true,
      vacancyReply: {
        select: {
          id: true,
          vacancy: true,
          file: true,
          link: true,
          vacancyId: true,
          message: true,
        },
      },
    },
    where:
      searchInput.length === 0
        ? { chatId: chatId }
        : {
            chatId: chatId,
            text: { contains: searchInput, mode: "insensitive" },
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
        vacancyReply: item?.vacancyReply,
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
        vacancyReply: item?.vacancyReply,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  const lastDate = lastPostInResults?.createdAt || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
    lastDate,
    check: check,
    checkVacReply: checkVacReply,
    circle: circle.circle,
  };
};

export default getMessages;

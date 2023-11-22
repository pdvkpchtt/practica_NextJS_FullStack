import { prisma } from "../../db";
import { checkCircles } from "./checkCircles";

const updateMessages = async (
  chatId,
  userId,
  lastDate,
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

  const uod = await prisma.message.update({
    where: {
      chat: { id: chatId },
    },
    data: { unRead: false },
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
        checkVacReply: checkVacReply,
        circle: circle.circle,
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
        check: check,
        checkVacReply: checkVacReply,
        circle: circle.circle,
        vacancyReply: item?.vacancyReply,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  //const lastDate = lastPostInResults?.createdAt || "";

  return {
    data: result,
    check: check,
    circle: circle.circle,
    checkVacReply: checkVacReply,
  };
};

export default updateMessages;

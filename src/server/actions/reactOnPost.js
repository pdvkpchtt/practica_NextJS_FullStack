import { prisma } from "../db";

export const reactOnPost = async (input) => {
  const foundReaction = await prisma.reaction.findFirst({
    where: { postId: input.postId, userId: input.id },
  });

  if (!foundReaction) {
    const reaction = await prisma.reaction.create({
      data: {
        type: input.type,
        post: {
          connect: {
            id: input.postId,
          },
        },
        user: {
          connect: {
            id: input.id,
          },
        },
      },
    });
    return reaction;
  } else {
    const deletedReaction = await prisma.reaction.delete({
      where: { id: foundReaction.id },
    });

    return deletedReaction;
  }

  return;
};

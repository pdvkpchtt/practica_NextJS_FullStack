import { prisma } from "../db";

export const getPostById = async (id, userId) => {
  const currentPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          username: true,
          id: true,
          image: true,
          role: true,
          Company: {
            select: { name: true, userId: true, image: true, username: true },
          },
        },
      },
      Reaction: { select: { type: true, userId: true } },
      title: true,
      text: true,
    },
  });

  const reactionsCount = {};
  currentPost.Reaction.forEach((reaction) => {
    if (!reactionsCount[reaction.type]) {
      reactionsCount[reaction.type] = { count: 0, active: false };
    }
    if (reaction.userId) {
      reactionsCount[reaction.type].count += 1;
    }

    if (reaction.userId === userId) {
      reactionsCount[reaction.type].active = true;
    }

    reactionsCount[reaction.type].postId = currentPost.id;
  });
  const reactions = Object.entries(reactionsCount).map(
    ([type, { count, active, postId }]) => ({
      type,
      count,
      active,
      postId,
    })
  );

  return {
    id: currentPost.id,
    createdAt: currentPost.createdAt,
    author_name: currentPost.user.name,
    author_image: currentPost.user.image,
    author_id: currentPost.user.id,
    username: currentPost.user.username,
    reactions,
    title: currentPost.title,
    text: currentPost.text,
    role: currentPost.user.role,
    myPost: currentPost.user.id === userId,
  };
};

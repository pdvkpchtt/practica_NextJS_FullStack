import { prisma } from "../db";

export const getRatedPosts = async (id, cursor, otherId) => {
  const posts = await prisma.post.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: {
      Reaction: {
        some: {
          userId: { in: otherId === undefined ? id : otherId },
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          lastname: true,
          id: true,
          image: true,
          username: true,
          role: true,
          HR: { select: { company: { select: { id: true, username: true } } } },
          Company: {
            select: {
              name: true,
              userId: true,
              image: true,
              username: true,
            },
          },
        },
      },
      Reaction: { select: { type: true, userId: true } },
      title: true,
      text: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = posts.length > 10;
  let slicedPosts = posts;
  if (posts.length > 10) {
    slicedPosts = posts.slice(0, -1);
  }
  const result = slicedPosts.map((post) => {
    const reactionsCount = {};
    post.Reaction.forEach((reaction) => {
      if (!reactionsCount[reaction.type]) {
        reactionsCount[reaction.type] = { count: 0, active: false };
      }
      if (reaction.userId) {
        reactionsCount[reaction.type].count += 1;
      }

      if (reaction.userId === id) {
        reactionsCount[reaction.type].active = true;
      }

      reactionsCount[reaction.type].postId = post.id;
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
      id: post.id,
      createdAt: post.createdAt,
      author_name: post.user.name + " " + post.user.lastname,
      author_image: post.user.image,
      username: post.user.username,
      author_id: post.user.id,
      reactions,
      isHrCompanyId: post.user?.HR[0]?.company?.username
        ? post.user?.HR[0]?.company?.username
        : post.user?.HR[0]?.company?.id,
      title: post.title,
      text: post.text,
      role: post.user.role,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return { data: result, hasNextPage: hasNextPage, cursor: newCursor };
};

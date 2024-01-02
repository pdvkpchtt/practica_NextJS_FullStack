"use server";

import { prisma } from "../db";

export const getUserPosts = async (id, cursor, yourId) => {
  const posts = await prisma.post.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
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
              id: true,
              name: true,
              userId: true,
              image: true,
              username: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      Reaction: { select: { type: true, userId: true } },
      text: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: id,
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

      if (yourId === undefined) {
        if (reaction.userId === id) {
          reactionsCount[reaction.type].active = true;
        }
      } else {
        if (reaction.userId === yourId) {
          reactionsCount[reaction.type].active = true;
        }
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
      title: post.title,
      reactions,
      text: post.text,
      hrCompanyId: post.user?.HR[0]?.company?.id,
      hrCompanyUsername: post.user?.HR[0]?.company?.username,
      role: post.user.role,
      isHrCompanyId:
        post.user?.HR[0]?.company?.username !== null
          ? post.user?.HR[0]?.company?.username
          : post.user?.HR[0]?.company?.id,
      category: post.category,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return { data: result, hasNextPage: hasNextPage, cursor: newCursor };
};

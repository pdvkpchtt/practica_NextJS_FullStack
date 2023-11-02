"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { prisma } from "../db";

export const addPost = async (input) => {
  const session = await getServSession();

  const post = await prisma.post.create({
    data: {
      title: input.title,
      text: input.text,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      Reaction: {
        createMany: {
          data: input.reactions,
        },
      },
      category: {
        connect: {
          id: input.category.id,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          role: true,
          username: true,
          name: true,
          id: true,
          HR: { select: { company: { select: { username: true } } } },
          image: true,
          Company: {
            select: {
              name: true,
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
      Reaction: { select: { type: true, userId: true } },
      title: true,
      text: true,
      category: {
        select: { name: true, id: true },
      },
    },
  });

  console.log("post", post);

  const reactionsCount = {};
  input.reactions.forEach((reaction) => {
    if (!reactionsCount[reaction.type]) {
      reactionsCount[reaction.type] = { count: 0 };
    }
    if (reaction.userId) {
      reactionsCount[reaction.type].count += 1;
    }
    reactionsCount[reaction.type].active = false;
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
    author_name: post.user.name,
    author_image: post.user.image,
    author_id: post.user.id,
    username: post.user.username,
    reactions,
    isHrCompanyId: post.user?.HR[0]?.company?.username,
    title: post.title,
    text: post.text,
  };
};

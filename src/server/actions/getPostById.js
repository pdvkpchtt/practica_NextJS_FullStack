import { redirect } from "next/navigation";
import { prisma } from "../db";

export const getPostById = async (id, userId) => {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
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
          Company: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
        },
      },
      Reaction: { select: { type: true, userId: true } },
      company: { select: { id: true, username: true } },
      title: true,
      text: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!post) redirect("_not_found");
  else {
    const reactionsCount = {};
    post?.Reaction?.forEach((reaction) => {
      if (!reactionsCount[reaction.type]) {
        reactionsCount[reaction.type] = { count: 0, active: false };
      }
      if (reaction.userId) {
        reactionsCount[reaction.type].count += 1;
      }

      if (reaction.userId === userId) {
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
      title: post.title,
      text: post.text,
      hrCompanyId: post?.company?.username,
      hrCompanyUsername: post?.company?.username,

      isHrCompanyId: post?.company?.username,
      role: post.user.role,
      category: post.category,
    };
  }
};

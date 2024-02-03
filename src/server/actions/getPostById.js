import { redirect } from "next/navigation";
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
      Reaction: { select: { type: true, userId: true } },
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

  if (!currentPost) redirect("_not_found");
  else {
    const reactionsCount = {};
    currentPost?.Reaction?.forEach((reaction) => {
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
      author_name: currentPost.user.name + " " + currentPost.user.lastname,
      author_image: currentPost.user.image,
      username: currentPost.user.username,
      author_id: currentPost.user.id,
      reactions,
      title: currentPost.title,
      text: currentPost.text,
      hrCompanyId: currentPost.user?.HR[0]?.company?.id,
      hrCompanyUsername: currentPost.user?.HR[0]?.company?.username,

      isHrCompanyId: currentPost.user?.HR[0]?.company?.username
        ? currentPost.user?.HR[0]?.company?.username
        : currentPost.user?.HR[0]?.company?.id,
      role: currentPost.user.role,
      category: currentPost.category,
    };
  }
};

"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { prisma } from "../db";

export const getPostsWithAlgoritm = async (id, cursor) => {
  const session = await getServSession();

  let arr = [];
  let arr2 = [];

  const circles = await prisma.User.findFirst({
    select: {
      connections: {
        include: {
          connections: {
            include: { connections: { include: { connections: true } } },
          },
        },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  circles?.connections?.map((i) => arr.push(i.id));
  circles?.connections.map((i2) => i2.connections.map((i) => arr2.push(i)));
  arr2.map((i) => arr.push(i.id));
  arr2.map((i) =>
    i.connections.map((i) => !arr.includes(i.id) && arr.push(i.id))
  );

  return arr;
  //   const posts = await prisma.post.findMany({
  //     take: 11,
  //     ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
  //     select: {
  //       id: true,
  //       createdAt: true,
  //       user: {
  //         select: {
  //           name: true,
  //           id: true,
  //           image: true,
  //           username: true,
  //           role: true,
  //           HR: { select: { company: { select: { id: true, username: true } } } },
  //           Company: {
  //             select: {
  //               id: true,
  //               name: true,
  //               userId: true,
  //               image: true,
  //               username: true,
  //             },
  //           },
  //         },
  //       },
  //       Reaction: { select: { type: true, userId: true } },
  //       title: true,
  //       text: true,
  //       category: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });
  //   const hasNextPage = posts.length > 10;
  //   let slicedPosts = posts;
  //   if (posts.length > 10) {
  //     slicedPosts = posts.slice(0, -1);
  //   }
  //   const result = slicedPosts.map((post) => {
  //     const reactionsCount = {};
  //     post.Reaction.forEach((reaction) => {
  //       if (!reactionsCount[reaction.type]) {
  //         reactionsCount[reaction.type] = { count: 0, active: false };
  //       }
  //       if (reaction.userId) {
  //         reactionsCount[reaction.type].count += 1;
  //       }
  //       if (reaction.userId === id) {
  //         reactionsCount[reaction.type].active = true;
  //       }
  //       reactionsCount[reaction.type].postId = post.id;
  //     });
  //     const reactions = Object.entries(reactionsCount).map(
  //       ([type, { count, active, postId }]) => ({
  //         type,
  //         count,
  //         active,
  //         postId,
  //       })
  //     );
  //     return {
  //       id: post.id,
  //       createdAt: post.createdAt,
  //       author_name: post.user.name,
  //       author_image: post.user.image,
  //       username: post.user.username,
  //       author_id: post.user.id,
  //       reactions,
  //       title: post.title,
  //       text: post.text,
  //       hrCompanyId: post.user?.HR[0]?.company?.id,
  //       hrCompanyUsername: post.user?.HR[0]?.company?.username,
  //       isHrCompanyId: post.user?.HR[0]?.company?.username
  //         ? post.user?.HR[0]?.company?.username
  //         : post.user?.HR[0]?.company?.id,
  //       role: post.user.role,
  //       category: post.category,
  //     };
  //   });
  //   const lastPostInResults = result[result.length - 1];
  //   const newCursor = lastPostInResults?.id || "";
  //   return { data: result, hasNextPage: hasNextPage, cursor: newCursor };
};

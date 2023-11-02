import { prisma } from "../../db";

export const deletePost = async (id) => {
  console.log(id);
  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });
};

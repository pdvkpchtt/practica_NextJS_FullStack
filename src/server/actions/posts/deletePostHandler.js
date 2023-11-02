"use server";

import { deletePost } from "./deletePost";

export const deletePostHandler = async (id) => {
  await deletePost(id);
};

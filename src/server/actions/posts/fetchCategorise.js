"use server";

import { getAllCategories } from "./getAllCategories";

export const fetchCategorise = async () => {
  const categories = await getAllCategories();

  return categories;
};

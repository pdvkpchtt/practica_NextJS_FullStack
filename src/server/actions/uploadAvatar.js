"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";
import uuid from "react-uuid";
import { prisma } from "server/db";
var p = require("path");

export const uploadAvatar = async (data) => {
  const session = await getServSession();

  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uuid = uuid();

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join("/", "tmp", uuid + p.extname(file.name));
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  const user = await prisma.User.update({
    where: { id: session.user.id },
    data: {
      image: "/img/" + uuid + p.extname(file.name),
    },
  });

  return { success: true, path };
};

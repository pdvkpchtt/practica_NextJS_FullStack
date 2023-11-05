"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "server/db";
import { uuid } from "uuidv4";
var p = require("path");

export const uploadAvatarCompany = async (data) => {
  const session = await getServSession();

  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const id = uuid();

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join("/", "var/www/practica/images", id + p.extname(file.name));
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  const user = await prisma.Hr.findFirst({
    where: { userId: session.user.id },
    select: { companyId: true },
  });
  console.log(user, "jopa");

  const company = await prisma.Company.update({
    where: { id: user.companyId },
    data: {
      image: "https://practica.team/img/" + id + p.extname(file.name),
    },
  });

  return { success: true, path };
};

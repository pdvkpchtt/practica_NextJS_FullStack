"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "server/db";
import { uuid } from "uuidv4";
var p = require("path");

export const uploadFile = async (data) => {
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
  const path = join(
    "/",
    "var/www/practica/files",
    id + p.extname(Buffer.from(file.name).toString("utf8"))
  );
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  const user = await prisma.File.create({
    data: {
      path:
        "https://practica.team/file/" +
        id +
        p.extname(Buffer.from(file.name).toString("utf8")),
      name: Buffer.from(file.name).toString("utf8"),
      user: {
        connect: {
          id: session?.user?.id,
        },
      },
    },
  });

  return { success: true, path };
};
"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "server/db";
import { uuid } from "uuidv4";
var p = require("path");

export const upploadVerifyFile = async (data, compId) => {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }
  console.log(file.size, file, "joplo");

  if (file.size > 10485760) return { status: "error", message: "zxc size" };
  else if (file.type !== "application/pdf")
    return { status: "error", message: "zxc type" };
  else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const id = uuid();
    const path = join(
      "/",
      "var/www/practica/files",
      id + p.extname(decodeURIComponent(escape(file.name)))
    );
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
    const user = await prisma.VerifyFile.create({
      data: {
        path:
          "https://practica.team/file/" +
          id +
          p.extname(decodeURIComponent(escape(file.name))),
        name: decodeURIComponent(escape(file.name)),
        company: {
          connect: {
            id: compId,
          },
        },
      },
    });
    return { success: true, path };
  }
};

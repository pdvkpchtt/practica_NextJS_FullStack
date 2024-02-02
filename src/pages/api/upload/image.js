"use server";
export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};

import { authOptions, getServSession } from "app/api/auth/[...nextauth]/route";
import { writeFile, rename } from "fs/promises";
import { getServerSession } from "next-auth";
import { join } from "path";
import { prisma } from "server/db";
import { uuid } from "uuidv4";
import multiparty from "multiparty";
const p = require("path");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new multiparty.Form();
    const formData = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });
    console.log("formData", formData);

    const file = formData.files.file[0];

    console.log("file_upload", file);

    // res.status(200).send({ error: "No file uploaded" });
    if (!file) {
      res.status(200).json({ error: "No file uploaded" });
    }

    const id = uuid();

    const path = join(
      "/",
      "var/www/practica/files",
      id + p.extname(file.originalFilename)
    );
    console.log(file.path);
    console.log(path);
    await rename(file.path, path);
    // await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`);

    res.status(200).json({
      filePath:
        "https://practica.team/file/" + id + p.extname(file.originalFilename),
    });
  } else {
    res.status(200).json({ error: "method not allowed" });
  }
}

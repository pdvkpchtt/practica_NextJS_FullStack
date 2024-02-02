"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { string, z } from "zod";
import { uuid } from "uuidv4";

export const createCompany = async ({ data }) => {
  const session = await getServSession();

  // валидация
  const validate = z.object({
    name: z.string().min(1, { message: "inputName minlen" }),
    username: z
      .string()
      .min(3, { message: "inputUsername minlen" })
      .refine((value) => /^[a-zA-Z0-9._]+$/.test(value), {
        message: "inputUsername regex",
      }),
    slogan: z.string().max(60, { message: "inputSlogan maxlen" }),
    industry: z.string().min(1, { message: "inputIndustry minlen" }),
    about: z.string().max(240, { message: "inputAbout maxlen" }),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    username: data.username,
    slogan: data.slogan !== null ? data.slogan : "",
    industry: data.industry?.label,
    about: data.about !== null ? data.about : "",
  });

  const checkusername = await prisma.Company.findFirst({
    where: { username: data.username },
    select: { id: true },
  });

  if (!validateRes.success)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: checkusername?.id ? "inputUsername unique" : null,
    };
  // валидация

  const hr = await prisma.Hr.findFirst({
    where: {
      userId: session?.user?.id,
    },
    select: { id: true },
  });

  const companyEdited = await prisma.company.create({
    data: {
      image: data.image,
      name: data.name,
      username: data.username.split(" ").join(""),
      slogan: data.slogan,
      about: data.about,
      isStartap: data.isStartap,
      Cities: {
        createMany: { data: [...data.Cities] },
      },
      Links: {
        createMany: { data: [...data.Links] },
      },
      industry:
        data.industry?.length === 0
          ? {}
          : { connect: { id: data.industry.id } },
      employee: data.employee ? {} : { connect: { id: data.employee.id } },
      user: { connect: { id: session?.user?.id } },
      HR: { connect: { id: hr.id } },
    },
    select: {
      id: true,
    },
  });
};

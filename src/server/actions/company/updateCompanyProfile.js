"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { string, z } from "zod";

export const updateEmail = async (data) => {
  const session = await getServSession();

  const editedMail = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      email: data,
      emailVerified: null,
    },
  });

  return editedMail;
};

export const updateCompanyProfile = async ({ userId, data }) => {
  console.log(data, "fuck");
  // валидация
  const validate = z.object({
    name: z.string().min(1, { message: "inputName minlen" }),
    username: z.string().min(1, { message: "inputUsername minlen" }),
    slogan: z.string().max(60, { message: "inputSlogan maxlen" }).optional(),
    industry: z.string().min(1, { message: "inputIndustry minlen" }),
    about: z.string().max(240, { message: "inputAbout maxlen" }).optional(),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    username: data.username,
    slogan: data.slogan !== null ? data.slogan : "",
    industry: data.industry?.label,
    about: data.about !== null ? data.slogan : "",
  });
  const me = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      HR: { select: { company: { select: { id: true } } } },
    },
  });

  const checkusername = await prisma.company.findFirst({
    where: { username: data.username, id: { not: me.HR[0].company.id } },
    select: { id: true },
  });

  if (!validateRes.success || checkusername?.id)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: checkusername?.id ? "inputUsername unique" : null,
    };
  // валидация

  const companyEdited = await prisma.company.update({
    where: { id: me.HR[0].company.id },
    data: {
      name: data.name,
      username: data.username,
      slogan: data.slogan,
      about: data.about,
      isStartap: data.isStartap,
      Cities: {
        deleteMany: {},
        createMany: data.Cities?.length === 0 ? {} : { data: [...data.Cities] },
      },
      Links: {
        deleteMany: {},
        createMany: data.Links?.length === 0 ? {} : { data: [...data.Links] },
      },
      industry:
        data.industry?.length === 0
          ? {}
          : { connect: { id: data.industry.id } },
      employee:
        data.employee?.length === 0
          ? {}
          : { connect: { id: data.employee.id } },
    },
  });
};

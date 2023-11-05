"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const updateEmail = async (data) => {
  const session = await getServSession();

  const editedMail = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      email: data,
      emailVerified: null,
      // HR: { select: { company: { select: { id: true } } } },
    },
  });

  return editedMail;
};

export const updateCompanyProfile = async ({ userId, data }) => {
  // if (role === "company") {
  //   const companyEdited = await prisma.company.upsert({
  //     where: { userId: userId },
  //     update: {
  //       name: data.name,
  //       username: data.username,
  //       slogan: data.slogan,
  //       about: data.about,
  //       isStartap: data.isStartap,
  //       Cities: {
  //         deleteMany: {},
  //         createMany:
  //           data.Cities?.length === 0 ? {} : { data: [...data.Cities] },
  //       },
  //       Links: {
  //         deleteMany: {},
  //         createMany: data.Links?.length === 0 ? {} : { data: [...data.Links] },
  //       },
  //       industry:
  //         data.industry?.length === 0
  //           ? {}
  //           : { connect: { id: data.industry.id } },
  //       employee:
  //         data.employee?.length === 0
  //           ? {}
  //           : { connect: { id: data.employee.id } },
  //     },
  //     create: {
  //       name: data.name,
  //       username: data.username,
  //       slogan: data.slogan,
  //       about: data.about,
  //       Cities: {
  //         createMany:
  //           data.Cities?.length === 0 ? {} : { data: [...data.Cities] },
  //       },
  //       Links: {
  //         createMany: data.Links?.length === 0 ? {} : { data: [...data.Links] },
  //       },
  //       industry:
  //         data.industry?.length === 0
  //           ? {}
  //           : { connect: { id: data.industry.id } },
  //       employee:
  //         data.employee?.length === 0
  //           ? {}
  //           : { connect: { id: data.employee.id } },
  //       user: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //     },
  //   });

  //   return companyEdited;
  // } else
  //  if (role === "hr") {
  const me = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      HR: { select: { company: { select: { id: true } } } },
    },
  });

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

  return companyEdited;
  // }
};

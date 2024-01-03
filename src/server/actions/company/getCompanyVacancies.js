"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getCompanyVacancies = async (id, cursor) => {
  const session = await getServSession();

  console.log(id);
  const vacancy = await prisma.vacancy.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: { companyId: id },
    select: {
      createdAt: true,
      id: true,
      name: true,
      description: true,
      shortDescription: true,
      conditions: true,
      waitings: true,
      salaryStart: true,
      salaryEnd: true,
      distantWork: true,

      _count: {
        select: { VacancyReply: true },
      },
      VacancyReply: {
        select: { userId: true, status: true },
        where: { userId: session?.user?.id },
      },
      hrCreator: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              lastname: true,
              image: true,
            },
          },
        },
      },
      format: {
        select: {
          id: true,
          text: true,
        },
      },
      contract: {
        select: {
          id: true,
          label: true,
        },
      },
      currency: {
        select: {
          id: true,
          label: true,
        },
      },
      experience: {
        select: {
          id: true,
          text: true,
        },
      },
      educationLevel: {
        select: {
          id: true,
          text: true,
        },
      },
      Company: {
        select: {
          id: true,
          userId: true,
          username: true,
          name: true,
          image: true,
          HR: { select: { userId: true } },
        },
      },
      Location: {
        select: {
          label: true,
        },
      },
      vacArea: {
        select: {
          label: true,
        },
      },
      VacancySkills: true,
      Bookmarks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = vacancy.length > 10;
  let slicedPosts = vacancy;
  if (vacancy.length > 10) {
    slicedPosts = vacancy.slice(0, -1);
  }
  const result = slicedPosts.map((vacancy) => {
    const myReply = vacancy.VacancyReply.find(
      (i) => i.userId === session?.user?.id
    );

    return {
      id: vacancy.id,
      name: vacancy.name,
      salaryStart: vacancy.salaryStart,
      salaryEnd: vacancy.salaryEnd,
      distantWork: vacancy.distantWork,
      contract: vacancy.contract,
      shortDescription: vacancy.shortDescription,
      description: vacancy.description,
      vacArea: vacancy.vacArea,
      company: vacancy.Company,
      VacancySkills: vacancy.VacancySkills,
      Location: vacancy.Location,
      VacancyReply: vacancy?.VacancyReply,
      currency: vacancy.currency,
      Bookmarks: vacancy.Bookmarks,
      Company: vacancy.Company,
      hrCreator: vacancy?.hrCreator?.user,
      myVac: vacancy?.hrCreator?.id === session?.user?.id,
      myVac: vacancy?.hrCreator?.user?.id === session?.user?.id,
      partOfTeam: vacancy?.Company?.HR?.find(
        (i) => i.userId === session?.user?.id
      ),
      hasMyReply: myReply,
      replyCount: vacancy?._count?.VacancyReply,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};

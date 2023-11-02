import { prisma } from "../../db";

export const getCompanyVacancies = async (id, cursor) => {
  console.log(id);
  const vacancy = await prisma.vacancy.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: { companyId: id },
    select: {
      id: true,
      name: true,
      description: true,
      shortDescription: true,
      conditions: true,
      waitings: true,
      salaryStart: true,
      salaryEnd: true,
      distantWork: true,

      hrCreator: {
        select: {
          user: {
            select: {
              username: true,
              name: true,
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
      VacancySkills: {
        select: {
          skillId: true,
          skill: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
      Bookmarks: true,
    },
  });

  const hasNextPage = vacancy.length > 10;
  let slicedPosts = vacancy;
  if (vacancy.length > 10) {
    slicedPosts = vacancy.slice(0, -1);
  }
  const result = slicedPosts.map((vacancy) => {
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
      currency: vacancy.currency,
      Bookmarks: vacancy.Bookmarks,
      Company: vacancy.Company,
      hrCreator: vacancy?.hrCreator?.user,
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

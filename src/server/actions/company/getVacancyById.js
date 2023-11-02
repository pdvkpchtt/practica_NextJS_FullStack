import { prisma } from "../../db";

export const getVacancyById = async (id) => {
  const currentVacancy = await prisma.vacancy.findUnique({
    where: {
      id: id,
    },
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
          about: true,
          name: true,
          image: true,
          Links: true,
          Cities: true,
          HR: true,
          user: {
            select: {
              id: true,
              email: true,
              _count: {
                select: { myCompanyFolowers: true },
              },
            },
          },
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
      Bookmarks: true,
    },
  });

  return {
    id: currentVacancy.id,
    name: currentVacancy.name,
    salaryStart: currentVacancy.salaryStart,
    format: currentVacancy.format,
    salaryEnd: currentVacancy.salaryEnd,
    contract: currentVacancy.contract,
    shortDescription: currentVacancy.shortDescription,
    description: currentVacancy.description,
    vacArea: currentVacancy.vacArea,
    company: currentVacancy.Company,
    VacancySkills: currentVacancy.VacancySkills,
    Location: currentVacancy.Location,
    currency: currentVacancy.currency,
    conditions: currentVacancy.conditions,
    waitings: currentVacancy.waitings,
    Bookmarks: currentVacancy.Bookmarks,
    Company: currentVacancy.Company,
    distantWork: currentVacancy.distantWork,
    hrCreator: currentVacancy?.hrCreator?.user,
    hrcount: currentVacancy?.Company?.HR?.filter((i) => i.dataVerified !== null)
      ?.length,
    followersCount: currentVacancy?.Company?.user?._count?.myCompanyFolowers,
  };
};

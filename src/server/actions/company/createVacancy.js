import { prisma } from "../../db";

export const createVacancy = async (id, data, role = "company") => {
  let getHrId = "";
  if (role === "hr") {
    getHrId = await prisma.Hr.findFirst({
      where: { userId: id },
      select: {
        id: true,
        company: { select: { userId: true } },
      },
    });
  }

  const company = await prisma.company.update({
    where: { userId: getHrId?.company?.userId },
    data: {
      Vacancy: {
        create: {
          name: data.name,
          description: data.description,
          shortDescription: data.shortDescription,
          conditions: data.conditions,
          waitings: data.waitings,
          salaryStart: data.prisceByTalk ? null : data.salaryStart,
          salaryEnd: data.prisceByTalk ? null : data.salaryEnd,
          distantWork: data.distantWork,

          format: { connect: { id: data.format.id } },
          contract: { connect: { id: data.contract.id } },
          currency: data.prisceByTalk
            ? {}
            : { connect: { id: data.currency.id } },
          experience: { connect: { id: data.experience.id } },
          educationLevel: { connect: { id: data.EducationLevel.id } },

          Location: {
            createMany: {
              data: [...data.Location],
            },
          },
          vacArea: {
            createMany: {
              data: [...data.vacArea],
            },
          },
          VacancySkills: {
            createMany: {
              data: [...data.VacancySkills],
            },
          },
          hrCreator: { connect: { id: getHrId.id } },
        },
      },
    },
  });

  return company;
};

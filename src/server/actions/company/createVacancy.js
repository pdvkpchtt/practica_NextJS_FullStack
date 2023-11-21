import { prisma } from "../../db";
import { string, z } from "zod";

export const createVacancy = async (id, data, role = "company") => {
  // валидация
  const validate = z.object({
    name: z
      .string()
      .min(1, { message: "inputName minlen" })
      .max(80, { message: "inputName maxlen" }),
    description: z
      .string()
      .min(1, { message: "inputDescription minlen" })
      .max(640, { message: "inputDescription maxlen" }),
    shortDescription: z
      .string()
      .max(240, { message: "inputShortDesc maxlen" })
      .optional()
      .or(z.literal("")),
    conditions: z
      .string()
      .max(480, { message: "inputConditions maxlen" })
      .optional()
      .or(z.literal("")),
    waitings: z
      .string()
      .max(480, { message: "inputWaitings maxlen" })
      .optional()
      .or(z.literal("")),
    salaryStart: string().min(1, { message: "inputStart minlen" }),
    salaryEnd: string().min(1, { message: "inputEnd minlen" }),
    currency: string().min(1, { message: "currency minlen" }),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    description: data.description,
    shortDescription: data.shortDescription,
    conditions: data.conditions,
    waitings: data.waitings,
    salaryStart: data.salaryStart,
    salaryEnd: data.salaryEnd,
    currency: data.currency.label,
  });

  if (!validateRes.success)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
    };
  // валидация

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

          format: data.format.id ? { connect: { id: data.format.id } } : {},
          contract: data.contract.id
            ? { connect: { id: data.contract.id } }
            : {},
          currency: data.prisceByTalk
            ? {}
            : { connect: { id: data.currency.id } },
          experience: data.experience.id
            ? { connect: { id: data.experience.id } }
            : {},
          educationLevel: data.EducationLevel.id
            ? { connect: { id: data.EducationLevel.id } }
            : {},

          Location:
            data.Location.length > 0
              ? {
                  createMany: {
                    data: [...data.Location],
                  },
                }
              : {},
          vacArea:
            data.vacArea.length > 0
              ? {
                  createMany: {
                    data: [...data.vacArea],
                  },
                }
              : {},
          VacancySkills:
            data.VacancySkills.length > 0
              ? {
                  createMany: {
                    data: [...data.VacancySkills],
                  },
                }
              : {},
          hrCreator: { connect: { id: getHrId.id } },
        },
      },
    },
  });
};

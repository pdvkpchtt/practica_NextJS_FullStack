import { prisma } from "../../db";

export const getVacancyFields = async (cursor) => {
  const area = await prisma.Area.findMany({
    select: {
      label: true,
    },
  });
  const contract = await prisma.Contract.findMany({
    select: {
      id: true,
      label: true,
    },
  });
  const cities = await prisma.BigCity.findMany({
    select: {
      label: true,
    },
  });
  const edlv = await prisma.EducationLevel.findMany({
    select: {
      id: true,
      text: true,
    },
  });
  const exp = await prisma.experience.findMany({
    select: {
      id: true,
      text: true,
    },
  });
  const frmt = await prisma.Format.findMany({
    select: {
      id: true,
      text: true,
    },
  });

  const cur = await prisma.Currency.findMany({
    select: {
      id: true,
      label: true,
    },
  });

  return {
    area: area,
    currency: cur,
    contract: contract,
    cities: cities,
    format: frmt.map((i) => ({ id: i.id, label: i.text })),
    experience: exp.map((i) => ({ id: i.id, label: i.text })),
    EducationLevel: edlv.map((i) => ({ id: i.id, label: i.text })),
  };
};

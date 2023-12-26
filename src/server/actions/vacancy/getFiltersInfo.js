import { prisma } from "../../db";

export const getFiltersInfo = async (cursor) => {
  // vacancies
  const location = await prisma.Location.groupBy({
    by: ["label"],
  });

  const vacArea = await prisma.vacArea.groupBy({
    by: ["label"],
  });

  const skills = await prisma.skill.findMany({});

  const vacskills = await prisma.VacancySkills.findMany({});
  // vacancies

  // comapnies
  const industry = await prisma.CompanyIndustry.findMany({
    where: {
      Company: {
        some: {},
      },
    },
    select: {
      label: true,
    },
  });
  const employee = await prisma.CompanyEmployee.findMany({
    where: {
      Company: {
        some: {},
      },
    },
    select: {
      label: true,
    },
  });
  // comapnies

  // people
  const peoplecity = await prisma.User.groupBy({
    by: ["city"],
  });
  const workExperience = await prisma.WorkExperience.groupBy({
    by: ["post"],
  });
  const educationLevel = await prisma.EducationLevel.findMany({
    where: {
      user: {
        some: {},
      },
    },
    select: {
      text: true,
    },
  });
  const userskills = await prisma.Skill.findMany({
    where: {
      UserSkills: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
  // people

  var filteredArray = vacskills.filter(function (array_el) {
    return (
      skills.filter(function (anotherOne_el) {
        return anotherOne_el.name === array_el.name;
      }).length !== 0
    );
  });

  return {
    location: location,
    vacArea: vacArea,
    vacskills: filteredArray,
    peoplecity: peoplecity.map((i) => ({ label: i.city })),
    workExperience: workExperience.map((i) => ({ label: i.post })),
    educationLevel: educationLevel.map((i) => ({ label: i.text })),
    userskills: { skills: userskills },
    industry: industry,
    employee: employee,
  };
};

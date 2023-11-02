"use server";

import { prisma } from "../../db";

export const getCompanyIndustries = async () => {
  const industries = await prisma.CompanyIndustry.findMany({});

  return industries;
};

export const getCompanyEmployee = async () => {
  const employee = await prisma.CompanyEmployee.findMany({});

  return employee;
};

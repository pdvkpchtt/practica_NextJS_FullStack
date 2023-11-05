"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getCompany = async ({ userId }) => {
  const session = await getServSession();

  const foundCompany = await prisma.company.findFirst({
    where: { OR: [{ id: userId }, { username: userId }] },
    select: {
      id: true,
      userId: true,
      name: true,
      username: true,
      image: true,
      slogan: true,
      Cities: { select: { label: true } },
      Links: { select: { label: true, link: true } },
      about: true,
      direction: true,
      isStartap: true,

      industry: { select: { label: true, id: true } },
      employee: { select: { label: true, id: true } },
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          email: true,
          _count: {
            select: { myCompanyFolowers: true },
          },
        },
      },
      HR: true,
    },
    // include: {
    //   Education: true,
    //   WorkExperience: true,
    //   _count: {
    //     select: { connections: true },
    //   },
    // },
  });

  return {
    id: foundCompany?.id,
    email: foundCompany?.user?.email,
    userId: foundCompany?.userId,
    name: foundCompany?.name,
    username: foundCompany?.username,
    slogan: foundCompany?.slogan,
    isStartap: foundCompany?.isStartap,
    about: foundCompany?.about,
    image: foundCompany?.image,
    Cities: !foundCompany?.Cities ? [] : foundCompany?.Cities,
    Links: !foundCompany?.Links ? [] : foundCompany?.Links,
    industry: !foundCompany?.industry ? [] : foundCompany?.industry,
    employee: !foundCompany?.employee ? [] : foundCompany?.employee,
    createdAt: foundCompany?.createdAt,
    updatedAt: foundCompany?.updatedAt,
    user: {
      id: foundCompany?.user?.id,
      email: foundCompany?.user?.email,
    },
    followersCount: foundCompany?.user?._count?.myCompanyFolowers,
    imHr: foundCompany?.HR?.find((i) => i.userId === session?.user?.id)
      ? foundCompany?.HR?.find((i) => i.userId === session?.user?.id)
          ?.dataVerified !== null
      : false,
    hrcount: foundCompany?.HR?.filter((i) => i.dataVerified !== null)?.length,
  };
};

"use server";
import { prisma } from "../../db";

export const getCompanyProfile = async ({ userId, role = "hr" }) => {
  const userEmail = await prisma.user.findFirst({
    where: { OR: [{ id: userId }, { id: userId }] },
    select: {
      email: true,
      _count: {
        select: { Following: true },
      },
    },
  });
  if (role.includes("hr")) {
    const companyInfo = await prisma.Hr.findFirst({
      where: { userId: userId },
      select: {
        company: {
          select: {
            id: true,
            name: true,
            username: true,
            slogan: true,
            Cities: { select: { label: true } },
            Links: { select: { label: true, link: true, id: true } },
            image: true,
            about: true,
            direction: true,
            industry: { select: { label: true, id: true } },
            employee: { select: { label: true, id: true } },
            createdAt: true,
            isStartap: true,
            HR: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                email: true,
                role: true,
                _count: {
                  select: { Following: true },
                },
              },
            },
          },
        },
      },
    });
    return {
      id: companyInfo?.company?.id,
      email: userEmail?.email,
      userId: companyInfo?.company?.userId,
      // followersCount: userEmail?._count?.myCompanyFolowers,
      role: companyInfo?.company?.user?.role,
      name: companyInfo?.company?.name,
      image: companyInfo?.company?.image,
      username: companyInfo?.company?.username,
      slogan: companyInfo?.company?.slogan,
      about: companyInfo?.company?.about,
      Cities: !companyInfo?.company?.Cities ? [] : companyInfo?.company?.Cities,
      Links: !companyInfo?.company?.Links ? [] : companyInfo?.company?.Links,
      industry: !companyInfo?.company?.industry
        ? []
        : companyInfo?.company?.industry,
      employee: !companyInfo?.company?.employee
        ? []
        : companyInfo?.company?.employee,
      createdAt: companyInfo?.company?.createdAt,
      updatedAt: companyInfo?.company?.updatedAt,
      hrcount: companyInfo?.company?.HR?.filter((i) => i.dataVerified !== null)
        ?.length,
      isStartap: companyInfo?.company?.isStartap,
      followersCount: companyInfo?.company?.user?._count?.Following,
    };
  }
};

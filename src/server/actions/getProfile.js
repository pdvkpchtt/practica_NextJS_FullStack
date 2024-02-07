"use server";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { prisma } from "../db";

export const getProfile = async ({ userId }) => {
  const session = await getServSession();

  const user = await prisma.user.findFirst({
    where: { OR: [{ id: userId }, { username: userId }] },
    select: {
      id: true,
      name: true,
      lastname: true,
      fullname: true,
      username: true,
      role: true,
      image: true,
      about: true,
      email: true,
      country: true,
      city: true,
      views: true,
      isFirstTime: true,
      inSearch: true,
      birthDate: true,
      phone: true,
      phoneVerified: true,
      Education: {
        select: {
          id: true,
          name: true,
          degree: true,
          startDate: true,
          endDate: true,
        },
      },
      educationLevel: true,
      WorkExperience: {
        select: {
          id: true,
          organization: true,
          post: true,
          start_year: true,
          start_month: true,
          end_month: true,
          end_year: true,
          isStill: true,
        },
      },
      Company: {
        select: {
          name: true,
          username: true,
          slogan: true,
          about: true,
          country: true,
          city: true,
          direction: true,
        },
      },
      UserSkills: {
        select: {
          skill: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
      _count: {
        select: { connections: true, Following: true },
      },
      connections: {
        include: {
          connections: {
            include: { connections: { include: { connections: true } } },
          },
        },
      },
      ISendRequest: true,
      IGetRequest: true,
      UpdatesToMe: true,
    },
    // include: {
    //   Education: true,
    //   WorkExperience: true,
    //   _count: {
    //     select: { connections: true },
    //   },
    // },
  });

  BigInt.prototype["toJSON"] = function () {
    return parseInt(this.toString());
  };

  if (user.role.includes("hr")) {
    const comapny = await prisma.Hr.findMany({
      where: { AND: [{ userId: user.id }, { dataVerified: { not: null } }] },
      select: {
        company: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });

    let arr2 = [];
    user?.connections?.map((i) =>
      i?.connections?.map((i2) => i2?.connections?.map((i3) => arr2?.push(i3)))
    );
    let arr1 = [];
    user?.connections?.map(
      (i) => i?.id === session?.user?.id && arr1?.push(i?.id)
    );
    let arr3 = [];
    arr2?.map((i) => i?.id === session?.user?.id && arr3?.push(i?.id));
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      image: user.image,
      about: user.about,
      country: user.country,
      email: user.email,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      inSearch: user.inSearch,
      city: user.city,
      isFirstTime: user.isFirstTime,

      views: JSON.stringify(user.views),
      birthDate: user.birthDate,
      education: user.Education.map((education) => ({
        id: education.id,
        name: education.name,
        degree: education.degree,
        startDate: education.startDate,
        endDate: education.endDate,
      })),
      educationLevel: user.educationLevel,
      workExperience: user.WorkExperience.map((workExperience) => ({
        id: workExperience.id,
        organization: workExperience.organization,
        post: workExperience.post,
        start_year: workExperience.start_year,
        start_month: workExperience.start_month,
        end_month: workExperience.end_month,
        end_year: workExperience.end_year,
        isStill: workExperience.isStill,
      })),
      UserSkills: user.UserSkills.map((userSkill) => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        type: userSkill.skill.type,
      })),
      connections: user._count.connections,
      companiesIFollow: user._count.Following,
      connectionsArr: user.connections,
      ISendRequest: user.ISendRequest,
      IGetRequest: user.IGetRequest,
      Company: {
        name: user?.Company?.name,
        username: user?.Company?.username,
        slogan: user?.Company?.slogan,
        about: user?.Company?.about,
        country: user?.Company?.country,
        city: user?.Company?.city,
        direction: user?.Company?.direction,
      },
      UpdatesToMe: user?.UpdatesToMe,
      hrCompany: comapny,
      isFirstCircle: arr1,
      isSecondCircle: user?.connections
        ?.map((i2) => i2?.connections?.map((i) => i?.id === session?.user?.id))
        ?.map((i) => i?.find((i2) => i2 === true)),
      isThirdCircle: arr3,
    };
  } else {
    let arr2 = [];
    user?.connections?.map((i) =>
      i?.connections?.map((i2) => i2?.connections?.map((i3) => arr2?.push(i3)))
    );
    let arr1 = [];
    user?.connections?.map(
      (i) => i?.id === session?.user?.id && arr1?.push(i?.id)
    );
    let arr3 = [];
    arr2?.map((i) => i?.id === session?.user?.id && arr3?.push(i?.id));
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      image: user.image,
      about: user.about,
      country: user.country,
      city: user.city,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      inSearch: user.inSearch,
      isFirstTime: user.isFirstTime,

      email: user.email,
      views: JSON.stringify(user.views),
      birthDate: user.birthDate,
      education: user.Education.map((education) => ({
        id: education.id,
        name: education.name,
        degree: education.degree,
        startDate: education.startDate,
        endDate: education.endDate,
      })),
      educationLevel: user.educationLevel,
      workExperience: user.WorkExperience.map((workExperience) => ({
        id: workExperience.id,
        organization: workExperience.organization,
        post: workExperience.post,
        start_year: workExperience.start_year,
        start_month: workExperience.start_month,
        end_month: workExperience.end_month,
        end_year: workExperience.end_year,
        isStill: workExperience.isStill,
      })),
      UserSkills: user.UserSkills.map((userSkill) => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        type: userSkill.skill.type,
      })),
      connections: user._count.connections,
      connectionsArr: user.connections,
      companiesIFollow: user._count.Following,
      ISendRequest: user.ISendRequest,
      IGetRequest: user.IGetRequest,
      Company: {
        name: user?.Company?.name,
        username: user?.Company?.username,
        slogan: user?.Company?.slogan,
        about: user?.Company?.about,
        country: user?.Company?.country,
        city: user?.Company?.city,
        direction: user?.Company?.direction,
      },
      UpdatesToMe: user?.UpdatesToMe,
      isFirstCircle: arr1,
      isSecondCircle: user?.connections
        ?.map((i2) => i2?.connections?.map((i) => i?.id === session?.user?.id))
        ?.map((i) => i?.find((i2) => i2 === true)),
      isThirdCircle: arr3,
    };
  }
};

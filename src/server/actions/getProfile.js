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
      username: true,
      role: true,
      image: true,
      about: true,
      email: true,
      country: true,
      city: true,
      views: true,
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
          start_date: true,
          end_date: true,
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
        select: { connections: true, companiesIFollow: true },
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
    const comapny = await prisma.Hr.findFirst({
      where: { userId: user.id },
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

    const arr2 = [];
    user.connections.map((i) =>
      i.connections.map((i2) => i2.connections.map((i3) => arr2.push(i3)))
    );
    return {
      id: user.id,
      name: user.name,
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
        start_date: workExperience.start_date,
        end_date: workExperience.end_date,
      })),
      UserSkills: user.UserSkills.map((userSkill) => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        type: userSkill.skill.type,
      })),
      connections: user._count.connections,
      companiesIFollow: user._count.companiesIFollow,
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
      isFirstCircle: user.connections.find((i) => i.id === session.user.id),
      isSecondCircle: user.connections
        .map((i2) => i2.connections.map((i) => i.id === session.user.id))
        .map((i) => i.find((i2) => i2 === true)),
      isThirdCircle: arr2.find((i) => i.id === session.user.id),
    };
  } else {
    const arr2 = [];
    user.connections.map((i) =>
      i.connections.map((i2) => i2.connections.map((i3) => arr2.push(i3)))
    );
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      image: user.image,
      about: user.about,
      country: user.country,
      city: user.city,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      inSearch: user.inSearch,

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
        start_date: workExperience.start_date,
        end_date: workExperience.end_date,
      })),
      UserSkills: user.UserSkills.map((userSkill) => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        type: userSkill.skill.type,
      })),
      connections: user._count.connections,
      connectionsArr: user.connections,
      companiesIFollow: user._count.companiesIFollow,
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
      isFirstCircle: user.connections.find((i) => i.id === session.user.id),
      isSecondCircle: user.connections
        .map((i2) => i2.connections.map((i) => i.id === session.user.id))
        .map((i) => i.find((i2) => i2 === true)),
      // isThirdCircle: user.connections
      //   .map((i) => i.connections.map((i2) => i2.connections.find(i3 => i3.connections.)))
      isThirdCircle: arr2.find((i) => i.id === session.user.id),
    };
  }
};

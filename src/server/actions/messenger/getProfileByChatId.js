"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getProfileByChatId = async (userId = null, chatId = null) => {
  const session = await getServSession();

  if (userId !== null) {
    const user = await prisma.user.findFirst({
      where: { OR: [{ id: userId }, { username: userId }] },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        image: true,
        about: true,
        country: true,
        city: true,
        views: true,
        birthDate: true,
        Education: {
          select: {
            id: true,
            name: true,
            degree: true,
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
          select: { connections: true },
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

    if (user.role === "hr") {
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
        city: user.city,
        views: JSON.stringify(user.views),
        birthDate: user.birthDate,
        education: user.Education.map((education) => ({
          id: education.id,
          name: education.name,
          degree: education.degree,
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
        views: JSON.stringify(user.views),
        birthDate: user.birthDate,
        education: user.Education.map((education) => ({
          id: education.id,
          name: education.name,
          degree: education.degree,
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
  } else {
    const user = await prisma.Chat.findUnique({
      where: { id: chatId },
      select: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
            image: true,
            about: true,
            country: true,
            city: true,
            views: true,
            birthDate: true,
            Education: {
              select: {
                id: true,
                name: true,
                degree: true,
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
              select: { connections: true },
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
          where: {
            NOT: { id: session.user.id },
          },
        },
      },
    });

    BigInt.prototype["toJSON"] = function () {
      return parseInt(this.toString());
    };

    if (user.participants[0].role === "hr") {
      const comapny = await prisma.Hr.findFirst({
        where: { userId: user.participants[0].id },
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
      user.participants[0].connections.map((i) =>
        i.connections.map((i2) => i2.connections.map((i3) => arr2.push(i3)))
      );
      return {
        id: user?.participants[0].id,
        name: user?.participants[0].name,
        username: user?.participants[0].username,
        role: user?.participants[0].role,
        image: user?.participants[0].image,
        about: user?.participants[0].about,
        country: user?.participants[0].country,
        city: user?.participants[0].city,
        views: JSON.stringify(user?.participants[0].views),
        birthDate: user?.participants[0].birthDate,
        connections: user?.participants[0]._count.connections,
        connectionsArr: user?.participants[0].connections,
        ISendRequest: user?.participants[0].ISendRequest,
        IGetRequest: user?.participants[0].IGetRequest,
        Company: {
          name: user?.participants[0]?.Company?.name,
          username: user?.participants[0]?.Company?.username,
          slogan: user?.participants[0]?.Company?.slogan,
          about: user?.participants[0]?.Company?.about,
          country: user?.participants[0]?.Company?.country,
          city: user?.participants[0]?.Company?.city,
          direction: user?.participants[0]?.Company?.direction,
        },
        UpdatesToMe: user?.participants[0]?.UpdatesToMe,
        hrCompany: comapny,
        isFirstCircle: user?.participants[0].connections.find(
          (i) => i.id === session.user.id
        ),
        isSecondCircle: user?.participants[0].connections
          .map((i2) => i2.connections.map((i) => i.id === session.user.id))
          .map((i) => i.find((i2) => i2 === true)),
        isThirdCircle: arr2.find((i) => i.id === session.user.id),
      };
    } else {
      const arr2 = [];
      user?.participants[0]?.connections.map((i) =>
        i.connections.map((i2) => i2.connections.map((i3) => arr2.push(i3)))
      );
      return {
        id: user?.participants[0]?.id,
        name: user?.participants[0]?.name,
        username: user?.participants[0]?.username,
        role: user?.participants[0]?.role,
        image: user?.participants[0]?.image,
        about: user?.participants[0]?.about,
        country: user?.participants[0]?.country,
        city: user?.participants[0]?.city,
        views: JSON.stringify(user?.participants[0]?.views),
        birthDate: user?.participants[0]?.birthDate,
        connections: user?.participants[0]?._count.connections,
        connectionsArr: user?.participants[0]?.connections,
        ISendRequest: user?.participants[0]?.ISendRequest,
        IGetRequest: user?.participants[0]?.IGetRequest,
        Company: {
          name: user?.participants[0]?.Company?.name,
          username: user?.participants[0]?.Company?.username,
          slogan: user?.participants[0]?.Company?.slogan,
          about: user?.participants[0]?.Company?.about,
          country: user?.participants[0]?.Company?.country,
          city: user?.participants[0]?.Company?.city,
          direction: user?.participants[0]?.Company?.direction,
        },
        UpdatesToMe: user?.participants[0]?.UpdatesToMe,
        isFirstCircle: user?.participants[0]?.connections.find(
          (i) => i.id === session.user.id
        ),
        isSecondCircle: user?.participants[0]?.connections
          .map((i2) => i2.connections.map((i) => i.id === session.user.id))
          .map((i) => i.find((i2) => i2 === true)),
        // isThirdCircle: user.connections
        //   .map((i) => i.connections.map((i2) => i2.connections.find(i3 => i3.connections.)))
        isThirdCircle: arr2.find((i) => i.id === session.user.id),
      };
    }
  }
};
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
        plan: true,
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
        city: user.city,
        views: JSON.stringify(user.views),
        birthDate: user.birthDate,
        connections: user._count.connections,
        connectionsArr: user.connections,
        ISendRequest: user.ISendRequest,
        IGetRequest: user.IGetRequest,
        plan: user.plan,
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

        requestStatus:
          user?.IGetRequest?.find(
            (item) => item.userSendId === session?.user?.id
          ) !== undefined
            ? true
            : false,
        friendStatus:
          user?.connections?.find((item) => item.id === session.user.id) !==
          undefined
            ? true
            : false,
        ifHeSentRequest:
          user?.ISendRequest?.find(
            (item) => item.userGetId === session.user.id
          ) !== undefined
            ? true
            : false,
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
        connections: user._count.connections,
        connectionsArr: user.connections,
        plan: user.plan,
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
        isFirstCircle: user.connections.find((i) => i.id === session.user.id),
        isSecondCircle: user.connections
          .map((i2) => i2.connections.map((i) => i.id === session.user.id))
          .map((i) => i.find((i2) => i2 === true)),
        isThirdCircle: arr2.find((i) => i.id === session.user.id),

        requestStatus:
          user?.IGetRequest?.find(
            (item) => item.userSendId === session?.user?.id
          ) !== undefined
            ? true
            : false,
        friendStatus:
          user?.connections?.find((item) => item.id === session.user.id) !==
          undefined
            ? true
            : false,
        ifHeSentRequest:
          user?.ISendRequest?.find(
            (item) => item.userGetId === session.user.id
          ) !== undefined
            ? true
            : false,
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
            plan: true,
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

    if (user.participants[0].role.includes("hr")) {
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
        plan: user.participants[0].plan,
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

        requestStatus:
          user?.participants[0].IGetRequest?.find(
            (item) => item.userSendId === session?.user?.id
          ) !== undefined
            ? true
            : false,
        friendStatus:
          user?.participants[0].connections?.find(
            (item) => item.id === session.user.id
          ) !== undefined
            ? true
            : false,
        ifHeSentRequest:
          user?.participants[0].ISendRequest?.find(
            (item) => item.userGetId === session.user.id
          ) !== undefined
            ? true
            : false,
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

        requestStatus:
          user?.participants[0].IGetRequest?.find(
            (item) => item.userSendId === session?.user?.id
          ) !== undefined
            ? true
            : false,
        friendStatus:
          user?.participants[0].connections?.find(
            (item) => item.id === session.user.id
          ) !== undefined
            ? true
            : false,
        ifHeSentRequest:
          user?.participants[0].ISendRequest?.find(
            (item) => item.userGetId === session.user.id
          ) !== undefined
            ? true
            : false,
      };
    }
  }
};

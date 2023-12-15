"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { prisma } from "../db";

export const getPeoples = async (cursor, filters) => {
  const session = await getServSession();

  const users = await prisma.user.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      lastname: true,
      fullname: true,
      username: true,
      image: true,
      country: true,
      about: true,
      role: true,
      city: true,
      Company: {
        select: {
          name: true,
        },
      },
      connections: {
        include: {
          connections: {
            include: { connections: { include: { connections: true } } },
          },
        },
      },
      Education: { select: { name: true } },
      educationLevel: { select: { text: true } },
      WorkExperience: { select: { post: true } },
      UserSkills: {
        select: {
          id: true,
          skillId: true,
          skill: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
    where: filters?.startFiltering
      ? filters?.input.length > 0
        ? filters?.input[0] === "@"
          ? {
              username: {
                contains: filters?.input.slice(1),
                mode: "insensitive",
              },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
              educationLevel: {
                text: {
                  contains: filters?.educationLevel?.label,
                  mode: "insensitive",
                },
              },

              WorkExperience:
                filters?.workExperience?.label?.length > 0
                  ? filters?.workExperience?.label === "Есть"
                    ? {
                        some: {},
                      }
                    : { none: {} }
                  : {},
              UserSkills:
                filters?.UserSkills?.length > 0
                  ? {
                      some: {
                        skillId: {
                          in: filters?.UserSkills?.map(
                            (item) => true && item.id
                          ),
                        },
                      },
                    }
                  : {},
            }
          : {
              fullname: { contains: filters?.input, mode: "insensitive" },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
              educationLevel: {
                text: {
                  contains: filters?.educationLevel?.label,
                  mode: "insensitive",
                },
              },

              WorkExperience:
                filters?.workExperience?.label?.length > 0
                  ? filters?.workExperience?.label === "Есть"
                    ? {
                        some: {},
                      }
                    : { none: {} }
                  : {},
              UserSkills:
                filters?.UserSkills?.length > 0
                  ? {
                      some: {
                        skillId: {
                          in: filters?.UserSkills?.map(
                            (item) => true && item.id
                          ),
                        },
                      },
                    }
                  : {},
            }
        : {
            city: {
              contains: filters?.peoplecity?.label,
              mode: "insensitive",
            },
            educationLevel: {
              text: {
                contains: filters?.educationLevel?.label,
                mode: "insensitive",
              },
            },
            WorkExperience:
              filters?.workExperience?.label?.length > 0
                ? filters?.workExperience?.label === "Есть"
                  ? {
                      some: {},
                    }
                  : { none: {} }
                : {},
            UserSkills:
              filters?.UserSkills?.length > 0
                ? {
                    some: {
                      skillId: {
                        in: filters?.UserSkills?.map((item) => true && item.id),
                      },
                    },
                  }
                : {},
          }
      : filters?.input.length > 0
      ? filters?.input[0] === "@"
        ? {
            username: {
              contains: filters?.input.slice(1),
              mode: "insensitive",
            },
          }
        : {
            fullname: { contains: filters?.input, mode: "insensitive" },
          }
      : {},
  });

  const hasNextPage = users.length > 10;
  let slicedPosts = users;
  if (users.length > 10) {
    slicedPosts = users.slice(0, -1);
  }
  const result = slicedPosts.map((u) => {
    let arr2 = [];
    u.connections.map((i) =>
      i.connections.map((i2) => i2.connections.map((i3) => arr2.push(i3)))
    );
    let arr1 = [];
    u.connections.map((i) => i.id === session.user.id && arr1.push(i.id));
    let arr3 = [];
    arr2.map((i) => i.id === session.user.id && arr3.push(i.id));

    if (u.role !== "company")
      if (u.id !== session.user.id)
        return {
          id: u.id,
          name: u.name,
          lastname: u.lastname,
          username: u.username,
          image: u.image,
          country: u.country,
          city: u.city,
          UserSkills: u.UserSkills,
          Company: u.Company,
          educationLevel: u.educationLevel,
          about: u.about,
          isFirstCircle: arr1,
          isSecondCircle: u.connections
            .map((i2) => i2.connections.map((i) => i.id === session.user.id))
            .map((i) => i.find((i2) => i2 === true)),
          isThirdCircle: arr3,
        };
      else
        return {
          id: u.id,
          name: u.name,
          lastname: u.lastname,
          username: u.username,
          image: u.image,
          country: u.country,
          city: u.city,
          UserSkills: u.UserSkills,
          Company: u.Company,
          educationLevel: u.educationLevel,
          about: u.about,
          itsMe: true,
        };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};

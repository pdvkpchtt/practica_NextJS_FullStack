"use server";

import { uuid } from "uuidv4";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { generateNames } from "../../shared/utils/generateNames";
import { prisma } from "../db";
import { uniqueNamesGenerator, NumberDictionary } from "unique-names-generator";

export const finishRegistration = async (inputRole, new_hr_company) => {
  const session = await getServSession();
  const numberDictionary = NumberDictionary.generate({ min: 0, max: 999 });

  // const { role, email, name, id } = await prisma.user.findFirst({
  //   where: { id: session.user.id },
  //   select: {
  //     id: true,
  //     role: true,
  //     email: true,
  //     name: true,
  //   },
  // });
  //if (role) return

  let name = generateNames();

  if (inputRole === "student") {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: inputRole,
        name: name.split(" ")[0],
        lastname: name.split(" ")[1],
        fullname: name.split(" ")[0] + " " + name.split(" ")[1],
        username: uniqueNamesGenerator({
          dictionaries: [
            [name.split(" ")[0]],
            [name.split(" ")[1]],
            numberDictionary,
          ],
          length: 3,
          separator: "",
        }),
        educationLevel: { connect: { id: "clnwyikrr00819rnkylzwsojh" } },
        plan: {
          connect: {
            id: "cloe5d9670000viko6sm3k870",
          },
        },
      },
      select: { role: true },
    });
    return user;
  }

  if (inputRole === "new_hr") {
    const data = await prisma.Hr.create({
      data: {
        user: { connect: { id: session.user.id } },
        company: {
          connect: {
            id: new_hr_company,
          },
        },
        token: uuid(),
        dataVerified: new Date(),
      },
    });

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: "hr",
        name: name.split(" ")[0],
        lastname: name.split(" ")[1],
        fullname: name.split(" ")[0] + " " + name.split(" ")[1],
        username: name.split(" ")[0] + " " + name.split(" ")[1],
        username: uniqueNamesGenerator({
          dictionaries: [
            [name.split(" ")[0]],
            [name.split(" ")[1]],
            numberDictionary,
          ],
          length: 3,
          separator: "",
        }),
        educationLevel: { connect: { id: "clnwyikrr00819rnkylzwsojh" } },
        plan: {
          connect: {
            id: "cloe5d9670000viko6sm3k870",
          },
        },
      },
      select: { role: true },
    });
    return user;
  }

  const compName = generateNames();

  const company = await prisma.company.create({
    data: {
      name: compName,
      username: uniqueNamesGenerator({
        dictionaries: [
          [compName.split(" ")[0]],
          [compName.split(" ")[1]],
          numberDictionary,
        ],
        length: 3,
        separator: "",
      }),
      user: { connect: { id: session.user.id } },
    },
    select: {
      id: true,
    },
  });

  const data = await prisma.Hr.create({
    data: {
      user: { connect: { id: session.user.id } },
      company: {
        connect: {
          id: company.id,
        },
      },
      token: uuid(),
      dataVerified: new Date(),
    },
  });

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      role: "hr",
      name: name.split(" ")[0],
      lastname: name.split(" ")[1],
      fullname: name.split(" ")[0] + " " + name.split(" ")[1],
      username: name.split(" ")[0] + " " + name.split(" ")[1],
      username: uniqueNamesGenerator({
        dictionaries: [
          [name.split(" ")[0]],
          [name.split(" ")[1]],
          numberDictionary,
        ],
        length: 3,
        separator: "",
      }),
      educationLevel: { connect: { id: "clnwyikrr00819rnkylzwsojh" } },
      plan: {
        connect: {
          id: "cloe5d9670000viko6sm3k870",
        },
      },
    },
    select: { role: true },
  });
  return user;
};

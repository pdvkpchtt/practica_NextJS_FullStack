"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import { uploadAvatar } from "../../server/actions/uploadAvatar";

import EmptyAvatar from "../../shared/ui/EmptyAvatar";

const EditLeft = ({ data, setDataToUpdate, dataToUpdate }) => {
  const [birthValue, setBirthValue] = useState(data.birthDate || "");

  const birthDateHandler = (e) => {
    // потом доделаю (upd ДОДЕЛАЛ)

    if (
      // (upd тестил на андроиде и там не регестрируется нажатие на бекспейс поэтому добавил это)
      e.length < birthValue.length &&
      birthValue[birthValue.length - 1] == "."
    ) {
      setBirthValue(e.slice(0, -1));
      // console.log("tr");
    } else if (e.length == 2) {
      setBirthValue(e + ".");
    } else if (e.length == 5) {
      setBirthValue(e + ".");
    } else if (
      e.slice(0, 2).match(/[a-zA-Zа-яА-Я\W]/g) ||
      e.slice(3, 5).match(/[a-zA-Zа-яА-Я\W]/g) ||
      e.slice(6, 10).match(/[a-zA-Zа-яА-Я\W]/g)
    ) {
      console.log("");
    } else {
      setBirthValue(e);
    }
  };

  useEffect(() => {
    setDataToUpdate({
      ...dataToUpdate,
      birthDate: birthValue,
    });
  }, [birthValue]);
  console.log(dataToUpdate);
  return (
    <Card
      style=" hideScrollbarNavMobile
        max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] 
        flex flex-col gap-[16px] 
        [@media(hover)]:max-h-full [@media(hover)]:h-fit [@media(hover)]:overflow-y-auto"
      padding={12}
    >
      <div className="relative">
        {/* <form
          action={uploadAvatar}
          className="absolute flex flex-col left-0 top-0 w-full h-full transition duration-[250ms] hover:opacity-100 opacity-0 rounded-[8px]"
        >
          <input type="file" name="file" accept="image/*" />
          <button type="submit">uppload</button>
        </form> */}
        {data.image ? (
          <Image
            src={data.image}
            alt="Profile photo"
            className="[@media(hover)]:max-w-[236px] w-full rounded-[8px]"
            width={236}
            height={236}
            quality={100}
            priority={true}
          />
        ) : (
          <EmptyAvatar />
        )}
      </div>

      <Input
        placeholder="Например, Анастасия"
        label="Имя"
        value={dataToUpdate.name}
        onChange={(name) =>
          setDataToUpdate({
            ...dataToUpdate,
            name: name,
          })
        }
      />
      <Input
        placeholder="Например, designer_23yo"
        label="Имя пользователя"
        value={dataToUpdate.username}
        onChange={(username) =>
          setDataToUpdate({
            ...dataToUpdate,
            username: username,
          })
        }
      />
      <Input
        placeholder="Например, Россия"
        label="Страна"
        value={dataToUpdate.country}
        onChange={(country) =>
          setDataToUpdate({
            ...dataToUpdate,
            country: country,
          })
        }
      />
      <Input
        placeholder="Например, Уфа"
        label="Город"
        value={dataToUpdate.city}
        onChange={(city) =>
          setDataToUpdate({
            ...dataToUpdate,
            city: city,
          })
        }
      />
      <Input
        placeholder="дд.мм.гггг"
        label="День рождения"
        value={birthValue}
        onChange={(e) => birthDateHandler(e)}
        // onKeyDown={(event) => {
        //   event == "Backspace" &&
        //     birthValue[birthValue.length - 1] == "." &&
        //     setBirthValue(birthValue.slice(0, -2));
        // }}
        maxLength={10}
        defaultValue={data.birthDate}
      />
    </Card>
  );
};

export default EditLeft;

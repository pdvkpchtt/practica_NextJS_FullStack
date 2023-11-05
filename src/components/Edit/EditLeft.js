"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import { uploadAvatar } from "../../server/actions/uploadAvatar";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import { updateEmail } from "../../server/actions/company/updateCompanyProfile";

const EditLeft = ({ data, setDataToUpdate, dataToUpdate }) => {
  const [birthValue, setBirthValue] = useState(data.birthDate || "");
  const [myMail, setMyMail] = useState(data.email);
  const [error, setError] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const changeEmail = async () => {
    console.log(myMail, error);
    if (!isValidEmail(myMail)) {
      setError(true);
    } else {
      if (myMail !== data.email) {
        await updateEmail(myMail);
        signOut();
      }
    }
  };

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
    <div className="flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]">
      <Card
        style="
        max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] 
        flex flex-col gap-[16px] h-fit"
        padding={12}
      >
        <div className="rounded-[8px] overflow-hidden [@media(pointer:coarse)]:w-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]">
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              className="[@media(hover)]:min-w-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(hover)]:min-h-[236px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
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

      {/* изменить почту */}
      <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
              hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <Input
          type="email"
          error={error}
          placeholder="jeff@bezos.com"
          label="Ваша почта"
          value={myMail}
          onChange={(val) => setMyMail(val)}
        />
        <p
          onClick={() => {
            changeEmail();
          }}
          className={`${
            myMail !== data.email
              ? "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
              : "text-[#bfbfbf] cursor-default"
          } text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]`}
        >
          Изменить
        </p>
      </Card>
      {/* изменить почту */}
    </div>
  );
};

export default EditLeft;

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import { uploadAvatar } from "../../server/actions/uploadAvatar";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import { updateEmail } from "../../server/actions/company/updateCompanyProfile";
import UpploadAvatarModal from "../../shared/ui/UpploadAvatarModal";
import ImageIcon from "../../shared/icons/ImageIcon";
import TextSecondary from "../../shared/Text/TextSecondary";

const EditLeft = ({
  data,
  setDataToUpdate,
  dataToUpdate,
  status,
  setStatus,
}) => {
  const router = useRouter();

  const [birthValue, setBirthValue] = useState(data.birthDate || "");
  const [myMail, setMyMail] = useState(data.email);
  const [error, setError] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);

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
        <div
          className="rounded-[8px] relative overflow-hidden aspect-square cursor-pointer [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]"
          onClick={() => setBottomModal(true)}
        >
          <div className="absolute flex items-center justify-center w-full h-full bg-transparent group hover:bg-black hover:bg-opacity-25 transition duration-[150ms]">
            <ImageIcon style="opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition duration-[150ms]" />
          </div>
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              unoptimized
              className="[@media(hover)]:min-w-[236px] object-cover [@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(hover)]:min-h-[236px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
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
          caption={
            !status
              ? null
              : status?.includes("inputName minlen")
              ? "Поле обязательно к заполнению"
              : null
          }
          onChange={(name) => {
            setDataToUpdate({
              ...dataToUpdate,
              name: name,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputName")));
          }}
        />
        <Input
          placeholder="Например, designer_23yo"
          label="Имя пользователя"
          value={dataToUpdate.username}
          caption={
            !status
              ? null
              : status?.includes("inputUsername minlen")
              ? "Поле обязательно к заполнению"
              : status?.includes("inputUsername unique")
              ? "Этот username занят"
              : null
          }
          onChange={(username) => {
            setDataToUpdate({
              ...dataToUpdate,
              username: username,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputUsername")));
          }}
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
        <div className="flex flex-col w-full">
          <TextSecondary
            text={"День рождения"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <InputMask
            mask="99.99.9999"
            value={dataToUpdate.birthDate}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, birthDate: e.target.value });
            }}
            maskChar=""
          >
            {(inputProps) => (
              <input
                placeholder={""}
                value={inputProps.birthDate}
                className={`px-[12px] h-[42px] text-[#2c2c2c] dark:text-white text-[14px] pb-[12px] bg-[#f6f6f8] w-full dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px]`}
                //   onChange={}
                //   maxLength={17}
              />
            )}
          </InputMask>
        </div>
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
        {myMail !== data.email && (
          <p
            onClick={() => {
              changeEmail();
            }}
            className={`${
              "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
              // : "text-[#bfbfbf] cursor-default"
            } text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]`}
          >
            Сохранить
          </p>
        )}
      </Card>
      {/* изменить почту */}

      <UpploadAvatarModal
        isOpen={bottomModal}
        handleClose={() => {
          setBottomModal(false);
          router.refresh();
        }}
      />
    </div>
  );
};

export default EditLeft;

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { signOut } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import uuid from "react-uuid";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import TextSecondary from "../../shared/Text/TextSecondary";
import { updateEmail } from "../../server/actions/company/updateCompanyProfile";
import { invite } from "../../server/actions/hr/invite";
import UpploadAvatarModal from "../../shared/ui/UpploadAvatarModal";
import getCompanyNewAva from "../../server/actions/company/getCompanyNewAva";

import AddCityIcon from "../../shared/icons/AddCityIcon";
import ImageIcon from "../../shared/icons/ImageIcon";
import CustomLoader from "../../shared/ui/CustomLoader";

const EditCompanyLeft = ({
  data,
  setDataToUpdate,
  dataToUpdate,
  itemsForDD3,
  status,
  setStatus,
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const router = useRouter();

  const [state, setState] = useState(false);
  const [myMail, setMyMail] = useState(dataToUpdate.email);
  const [hrMail, setHrMail] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkLink, setLinkLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [bottomModal, setBottomModal] = useState(false);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [invalid, setInvalid] = useState(null);
  const [ava, setAva] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isUrl(url) {
    return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      url
    );
  }

  // console.log(dataToUpdate.Links);
  return (
    <div className="flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]">
      <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
        hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <div
          className="relative cursor-pointer bg-[#f6f6f8] dark:bg-[#141414] dark:bg-opacity-50 overflow-hidden rounded-full [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto"
          onClick={() => setBottomModal(true)}
        >
          {!loadingImg ? (
            <div className="absolute flex items-center aspect-square justify-center w-full h-full bg-transparent group hover:bg-black hover:bg-opacity-25 transition duration-[150ms]">
              <ImageIcon
                size={35}
                style="opacity-0 group-hover:opacity-100 object-cover scale-50 group-hover:scale-100 transition duration-[150ms]"
              />
            </div>
          ) : (
            <div className="absolute cursor-default flex items-center justify-center w-full h-full group bg-black bg-opacity-25 transition duration-[150ms]">
              <CustomLoader
                diameter={35}
                strokeWidth={5}
                strokeWidthSecondary={5}
              />
            </div>
          )}

          {dataToUpdate.image ? (
            <Image
              src={dataToUpdate.image}
              alt="Profile photo"
              className="min-w-[110px] object-cover w-[110px] h-[110px] min-h-[110px]"
              width={110}
              height={110}
              unoptimized
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar hungredAndTen />
          )}
        </div>
        <Input
          placeholder="Doofenshmirtz Corporation"
          label="Название компании"
          value={dataToUpdate.name}
          onChange={(name) => {
            setDataToUpdate({
              ...dataToUpdate,
              name: name,
            });
            if (status)
              setStatus(status?.filter((i) => !i.includes("inputName")));
          }}
          caption={
            !status
              ? null
              : status?.includes("inputName minlen")
              ? "Поле обязательно к заполнению"
              : null
          }
        />
        <Input
          placeholder="Например, designer_23yo"
          label="Имя компании"
          value={dataToUpdate.username}
          caption={
            !status
              ? null
              : status?.includes("inputUsername minlen")
              ? "Минимальная длина поля 3 символа"
              : status?.includes("inputUsername unique")
              ? "Этот username занят"
              : status?.includes("inputUsername change")
              ? "Измените username после регистрации"
              : status?.includes("inputUsername regex")
              ? "Username содержит недопустимые символы или пробел"
              : null
          }
          onChange={(username) => {
            setDataToUpdate({
              ...dataToUpdate,
              username: username,
            });
            if (status)
              setStatus(status?.filter((i) => !i.includes("inputUsername")));
          }}
        />

        {/* добавление городов */}
        <div className="flex flex-col relative">
          <TextSecondary
            text={"Расположение"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          {!dataToUpdate?.Cities ? (
            <AddCityIcon onClick={() => setState(true)} />
          ) : dataToUpdate?.Cities?.length === 0 ? (
            <AddCityIcon onClick={() => setState(true)} />
          ) : (
            <p
              className={
                "text-[14px] break-words text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[18px] tracking-[-0.182px] cursor-pointer [@media(hover)]:w-[236px]"
              }
              onClick={() => setState(true)}
            >
              {dataToUpdate.Cities.map(
                (item, key) =>
                  item.label +
                  `${key === dataToUpdate.Cities.length - 1 ? "" : ", "}`
              )}
            </p>
          )}
          <DropDownWithChoise
            state={state}
            setState={setState}
            city={!dataToUpdate.Cities ? [] : dataToUpdate.Cities}
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                Cities: val,
              });
            }}
            items={itemsForDD3}
            placeholder="Город"
          />
        </div>
        {/* добавление городов */}
      </Card>

      {/* ссылки */}
      {dataToUpdate.Links.length !== 0 && (
        <Card
          style=" 
      [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
      flex flex-row gap-[16px] flex-wrap 
      hideScrollbarNavMobile [@media(hover)]:h-fit"
          padding={12}
        >
          {dataToUpdate.Links.map((item, key) => (
            <p
              key={key}
              className={
                "text-[14px] whitespace-nowrap text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-normal leading-[18px] tracking-[-0.21px] cursor-pointer"
              }
              onClick={() => {
                setLinkLink(item.link);
                setLinkName(item.label);
                setLinkId(item.id);
                setError2(false);
              }}
            >
              {item.label}
            </p>
          ))}
        </Card>
      )}
      {/* ссылки */}

      {/* Добавить ссылки */}
      <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
              hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <div className="flex flex-col gap-[8px]">
          <Input
            placeholder="Название"
            label="Ссылка"
            maxLength={25}
            value={linkName}
            onChange={(val) => setLinkName(val)}
          />
          <Input
            placeholder="Ссылка"
            error={error2}
            // label="Ссылка на ресурс"
            value={linkLink}
            onChange={(val) => {
              setLinkLink(val);
              setError2(false);
            }}
          />
        </div>
        <div className="flex flex-row gap-[12px] flex-wrap">
          <p
            onClick={() => {
              if (linkName.length > 0 && linkLink.length > 0) {
                if (isUrl(linkLink)) {
                  setDataToUpdate({
                    ...dataToUpdate,
                    Links: [
                      ...dataToUpdate.Links,
                      {
                        label: linkName,
                        link: linkLink,
                        id: uuid(),
                      },
                    ],
                  });
                  setLinkName("");
                  setLinkLink("");
                } else {
                  setError2(true);
                }
              }
            }}
            className={`text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms] ${
              linkName.length > 0 && linkLink.length > 0
                ? "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
                : "text-[#bfbfbf] cursor-default"
            }`}
          >
            Сохранить
          </p>
          <p
            onClick={() => {
              setDataToUpdate({
                ...dataToUpdate,
                Links: dataToUpdate?.Links?.filter((i) => !(i.id === linkId)),
              });

              setLinkName("");
              setLinkLink("");
            }}
            className={`text-[16px] cursor-pointer w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms] text-[#F04646] hover:text-[#C92121] active:text-[#8a3838]`}
          >
            Удалить
          </p>
        </div>
      </Card>
      {/* Добавить ссылки */}

      {/* изменить почту */}
      {/* <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
              hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <Input
          type="email"
          placeholder="jeff@bezos.com"
          label="Ваша почта"
          value={myMail}
          onChange={(val) => setMyMail(val)}
        />
        <p
          onClick={() => {
            if (myMail !== data.email) changeEmail();
          }}
          className={`${
            myMail !== data.email
              ? "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
              : "text-[#bfbfbf] cursor-default"
          } text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]`}
        >
          Изменить
        </p>
      </Card> */}
      {/* изменить почту */}

      {/* добавить рекрутера */}
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
          placeholder="hr@recruter.com"
          label="Почта рекрутера"
          value={hrMail}
          onChange={(val) => {
            setHrMail(val);
            setError(false);
            setInvalid(false);
          }}
          caption={
            invalid === "userExist"
              ? "Пользователь с таким email не зарегстрирован в practica"
              : invalid === "userHr"
              ? "Этот пользователь уже HR"
              : invalid === "userMe"
              ? "Нельзя отправить приглашение себе"
              : invalid === "userAlready"
              ? "Пользователь приглашён или уже является HR вашей компании"
              : null
          }
        />
        <p
          onClick={async () => {
            if (hrMail.length > 0) {
              if (!isValidEmail(hrMail)) {
                setError(true);
              } else {
                const res = await invite(
                  hrMail?.toLowerCase(),
                  data.id,
                  data.name
                );

                if (res?.status === "error") setInvalid(res.message);
                else {
                  toast(`📧 Приглашение отправлено на email`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    // theme: "dark",
                    progressStyle: { background: "#5875e8" },
                    containerId: "forCopy",
                  });
                  setError(false);
                  setHrMail("");
                }
              }
            }
          }}
          className={`text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms] ${
            hrMail.length > 0 && !invalid
              ? "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
              : "text-[#bfbfbf] cursor-default"
          }`}
        >
          Пригласить
        </p>
      </Card>
      {/* добавить рекрутера */}
      <Card
        padding={6}
        style={"invisible [@media(pointer:coarse)]:hidden"}
      ></Card>

      <UpploadAvatarModal
        compId={data?.id}
        isOpen={bottomModal}
        handleClose={() => {
          setBottomModal(false);
          // router.refresh();
          // router.refresh();
        }}
        company
        onDone={(res) => {
          console.log(res, "fuck");

          setDataToUpdate({ ...dataToUpdate, image: res });
          setBottomModal(false);
        }}
      />
    </div>
  );
};

export default EditCompanyLeft;

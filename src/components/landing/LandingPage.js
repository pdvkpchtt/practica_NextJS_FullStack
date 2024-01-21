"use client";

import Image from "next/image";

import WTF from "./WTF";
import Slider from "./Slider";
import RaodMapCard from "./RaodMapCard";

import roadmap1 from "./imgs/text-editor 1.png";
import roadmap2 from "./imgs/text-editor 2.png";
import roadmap3 from "./imgs/Frame 4231.png";
import first from "./first.png";
import second from "./second.png";
import third from "./third.png";
import ava1 from "../../shared/icons/landing/ava1.png";

import SvgFancy1 from "../../shared/icons/landing/SvgFancy1";
import SwgFancy2 from "../../shared/icons/landing/SwgFancy2";
import Icon1 from "./icons/Icon1";
import Icon2 from "./icons/Icon2";
import Icon3 from "./icons/Icon3";
import Icon4 from "./icons/Icon4";
import Icon5 from "./icons/Icon5";
import { Telega, TikTok, YouTube } from "./icons/Icon6";
import Icon7 from "./icons/Icon7";
import Icon8 from "./icons/Icon8";
import Slider2 from "./Slider2";

import first2 from "./slides2/1.png";
import second2 from "./slides2/2.png";
import third2 from "./slides2/3.png";
import fourth2 from "./slides2/4.png";
import fifth2 from "./slides2/5.png";
import six2 from "./slides2/6.png";
import seven2 from "./slides2/7.png";
import eight2 from "./slides2/8.png";
import nine2 from "./slides2/9.png";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const roadmap = [
  {
    title: "Комьюнити",
    content: [
      {
        icon: [<Icon1 />],
        title: "Нетворкинг",
        text1:
          "Теперь для HR-а вы не просто призрак с резюме, а живой соискатель, претендующий на вакансию.",
        text2:
          "Заполняйте профиль, привлекайте офферы и расширяйте сеть полезных знакомств.",
        done: true,
        subimg: first2,
      },
      {
        icon: [<Icon2 />],
        title: "Текстовый редактор для постов",
        text1:
          "Создавайте уникальные посты и делитесь своим мнением, чтобы привлечь единомышленников и HR-ов.",
        text2: "",
        done: false,
        img: (
          <Image
            quality={100}
            unoptimized
            width={276}
            height={210}
            className="absolute bottom-0 [@media(pointer:coarse)]:left-0 z-[1] select-none"
            src={roadmap1}
            alt="roadmap img"
          />
        ),
        subimg: second2,
      },
      {
        icon: [<Icon3 />],
        title: "iOS & Android",
        text1: "Для вашего удобства мы создадим приложение на две платформы.",
        text2: "",
        done: false,
        subimg: third2,
      },
    ],
  },
  {
    title: "Компаниям",
    content: [
      {
        icon: [<Icon4 />],
        title: "ии-рекрутинг",
        text1:
          "Онлайн-собеседования с применением современных технологий, чтобы облегчить и ускорить поиск лучшего кандидата.",
        text2: "",
        done: false,
        subimg: fourth2,
      },
      {
        icon: [<Icon5 />],
        title: "developers wars",
        text1:
          "Для рекрутеров-новичков поиск сильных IT-специалистов - сложная задача.",
        text2:
          "Поэтому мы поможем оценить компетентность специалиста высококачественными задачами по программированию, сокращая время найма.",
        done: false,
        subimg: fifth2,
      },
      {
        icon: [<TikTok />, <YouTube />, <Telega />],
        title: "Реклама вакансий у популярных блогеров",
        text1: "У нас много связей,которыми мы с удовольствием делимся с вами.",
        text2:
          "Расскажите об открытых вакансиях компании на аудиторию известных блогеров.",
        done: false,
        subimg: six2,
      },
      {
        icon: [<Icon7 />],
        title: "Редактор вакансий",
        text1: "Создавайте вакансии, которыми заинтересуются специалисты.",
        text2: "",
        done: false,
        img: (
          <Image
            quality={100}
            unoptimized
            width={276}
            height={152}
            className="mt-[20px] select-none"
            src={roadmap2}
            alt="roadmap img"
          />
        ),
        subimg: seven2,
      },
      {
        icon: [<Icon8 />],
        title: "Кастомизация профиля",
        text1:
          "Сделайте свою страничку заметной и привлекайте больше специалистов и офферов.",
        text2: "",
        done: false,
        subimg: eight2,
      },
      {
        icon: [<></>],
        title: "",
        text1: "",
        text2: "",
        done: false,
        img: (
          <Image
            quality={100}
            unoptimized
            width={316}
            height={450}
            className="absolute select-none top-0 left-0 z-[1]"
            src={roadmap3}
            alt="roadmap img"
          />
        ),
        subimg: nine2,
      },
    ],
  },
];

const blocks = [
  {
    title: "Нетворкинг за пределами обычных\nкарьерных платформ.",
    subtitle:
      "Найдете не только работу, но и ценные контакты для карьеры мечты.",
    img: "loopa.mov",
  },
  {
    title: "Доверие и эмоции важны молодым\nспециалистам.",
    subtitle:
      "Новый формат профиля повышает узнаваемость компании и привлекает больше внимания соискателей.",
    img: "loopa2.mov",
  },
  {
    title: "Выбирайте людей, а не резюме.",
    subtitle:
      "Получите полноценное представление о соискателе из профиля c опытом, достижениями и постами.",
    img: "loopa3.mov",
  },
];

const users = [
  {
    name: "Nikolay",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Timur",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Denis",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Danil",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Nastya",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Anastasia",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
  {
    name: "Maxim",
    img: ava1,
    role: "роль",
    story: "Так-то так-то зашел в проект",
  },
];

const LandingPage = () => {
  const roadmapRef = useRef();
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <WTF roadmapRef={roadmapRef} />
      {/* <LandingGearsComponents /> */}

      <div className="h-full flex-col flex gap-[64px] mt-[calc(100vh+64px)] text-center items-center">
        {blocks.map((item, key) => (
          <div
            className="flex flex-col gap-[12px] text-center items-center [@media(pointer:coarse)]:px-[12px]"
            key={key}
          >
            <p className="text-[#2D52E6] text-[36px] [@media(hover)]:hidden [@media(pointer:coarse)]:text-[28px] [@media(pointer:coarse)]:leading-[28px] whitespace-pre-wrap text-center font-bold leading-[36px] tracking-[-1.14px]">
              {item.title.replace("\n", " ")}
            </p>
            <p className="text-[#2D52E6] text-[36px] [@media(pointer:coarse)]:hidden [@media(pointer:coarse)]:text-[28px] [@media(pointer:coarse)]:leading-[28px] whitespace-pre-wrap text-center font-bold leading-[36px] tracking-[-1.52px]">
              {item.title}
            </p>
            <p className="text-[#7d7d7d] text-[16px] font-medium leading-[19px] mb-[24px] tracking-[-0.32px]">
              {item.subtitle}
            </p>
            <video
              className="rounded-[30px] shadow-2xl w-[963px] h-fit"
              muted
              autoPlay
              loop
            >
              <source src={item.img} type="video/mp4" />
            </video>
            {/* <Image
                width={1300}
                height={878}
                src={item.img}
                quality={100}
                priority
                unoptimized
                alt="landing first"
              /> */}
          </div>
        ))}

        <p className="text-[#2D52E6] text-[36px] font-bold text-center [@media(pointer:coarse)]:text-[28px] [@media(pointer:coarse)]:leading-[28px] whitespace-pre-wrap leading-[36px] tracking-[-1.52px] flex flex-wrap  [@media(pointer:coarse)]:px-[12px]">
          practica <span className="fancyText">многогранна</span>
        </p>

        <Slider />
        <div className="flex flex-col gap-[12px] [@media(pointer:coarse)]:hidden  [@media(pointer:coarse)]:px-[12px]">
          <div className="flex flex-row gap-[12px]">
            <div className="relative flex flex-col w-[274px] h-[383px] overflow-hidden rounded-[30px] gap-[16px] text-start p-[20px]">
              <SvgFancy1 />
              <p className="text-[#fff] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                нетворкинг
              </p>
              <p className="text-[#fff] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                заводите ценные контакты с профессионалами из любых сфер
              </p>
              <p className="text-[#fff] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                находите единомышленников среди других соискателей
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row h-[202px] gap-[12px] justify-between">
                <div className="bg-[#fff] rounded-[30px] w-[264px] flex flex-col gap-[16px] p-[20px] text-start">
                  <p className="text-[#5875e8] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                    партнерства
                  </p>
                  <p className="text-[#5875e8] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                    заводите ценные контакты с профессионалами из любых сфер
                  </p>
                </div>
                <div className="fancyBg1 rounded-[30px] w-[284px] flex flex-col gap-[16px] p-[20px] text-start">
                  <p className="text-[#fff] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                    стартапы
                  </p>
                  <p className="text-[#fff] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                    собирайте команду единомышленников и создавайте топовые
                    проекты
                  </p>
                </div>
              </div>
              {/* bottom row */}
              <div className="w-[560px] rounded-[30px] h-[169px] fancyBg2 p-[20px] flex flex-col gap-[16px] text-start">
                <p className="text-[#fff] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                  комьюнити
                </p>
                <p className="text-[#fff] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                  делитесь опытом и впечатлениями и получайте фидбек от других
                  специалистов
                </p>
              </div>
              {/* bottom row */}
            </div>
          </div>
          <div className="flex flex-row h-[164px] w-[848px] gap-[12px] justify-between">
            <div className="text-start relative rounded-[30px] w-[398px] h-[164px] flex flex-col justify-center gap-[12px] p-[20px]">
              <SwgFancy2 />
              <p className="text-[#5875e8] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                Бесплатное размещение вакансий
              </p>
            </div>
            <div className="text-start rounded-[30px] bg-[#fff] w-[438px] flex flex-col gap-[12px] p-[20px]">
              <p className="text-[#5875e8] select-none text-[32px] font-medium leading-[38px] tracking-[-0.48px]">
                PWA технология
              </p>
              <p className="text-[#5875e8] select-none text-[22px] font-medium leading-[26px] tracking-[-0.44px]">
                работайте прямо из браузера без загрузки и установки приложения
                даже в офлайн-режиме
              </p>
            </div>
          </div>
        </div>

        {/* роадмапа */}
        <p className="text-[#2D52E6] text-[36px] relative [@media(pointer:coarse)]:mb-[-32px] [@media(pointer:coarse)]:text-[28px] [@media(pointer:coarse)]:leading-[28px] mt-[64px] mb-[15px] whitespace-pre-wrap text-center font-semibold leading-[36px] tracking-[-1.52px]">
          Roadmap
          <div
            className="absolute w-[5px] h-[5px]  top-[-125px]"
            ref={roadmapRef}
          />
        </p>

        <Slider2 roadmap={roadmap} />

        {roadmap.map((i, key) => (
          <div
            className="flex flex-col [@media(pointer:coarse)]:hidden gap-[32px]"
            key={key}
          >
            <p className="text-[36px] text-start [@media(pointer:coarse)]:text-center text-[#2c2c2c] font-medium tracking-[-0.54px]">
              {i.title}
            </p>

            <div className="flex flex-row justify-center gap-[16px] flex-wrap">
              {i.content.map((i, key) => (
                <RaodMapCard
                  key={key}
                  done={i.done}
                  icon={i.icon}
                  title={i.title}
                  text1={i.text1}
                  text2={i.text2}
                  img={i.img || <></>}
                />
              ))}
            </div>
          </div>
        ))}
        {/* роадмапа */}

        {/* bottom */}
        <div className="flex flex-col gap-[24px] text-start w-full [@media(hover)]:ml-[66px] mb-[83px] [@media(pointer:coarse)]:px-[12px]">
          <div className="flex flex-col gap-[5px] w-full">
            <p className="text-[48px] font-bold leading-[58px] tracking-[-1.2px] text-[#5875e8]">
              practica
            </p>
            <p className="text-[24px] font-medium leading-[29px] tracking-[-0.36px] text-[#2c2c2c]">
              На связи с лучшими
            </p>
          </div>

          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-medium leading-[24px] tracking-[-0.3px] text-[#2c2c2c]">
              Общая почта:
            </p>
            <p className="text-[20px] cursor-pointer underline hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[24px] tracking-[-0.3px] text-[#5875e8]">
              info@practicajobs.ru
            </p>
          </div>

          {/* <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-medium leading-[24px] tracking-[-1.2px] text-[#2c2c2c]">
              Для коммерческого сотрудничества:
            </p>
            <p className="text-[20px] cursor-pointer underline hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[24px] tracking-[-1.2px] text-[#5875e8]">
              commerse@practica.com
            </p>
          </div>

          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-medium leading-[24px] tracking-[-1.2px] text-[#2c2c2c]">
              Для медия:
            </p>
            <p className="text-[20px] cursor-pointer underline hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[24px] tracking-[-1.2px] text-[#5875e8]">
              press@practica.com
            </p>
          </div> */}
        </div>
        {/* bottom */}

        <div className="flex w-full text-start flex-row [@media(pointer:coarse)]:flex-col gap-[32px] [@media(hover)]:ml-[66px] h-fit [@media(pointer:coarse)]:px-[12px]">
          <Link
            target={"_blank"}
            href={
              "https://worried-robin-41e.notion.site/practica-2f23d456a24a46c38b89982a2cdebce5"
            }
            className="text-[20px] font-medium cursor-pointer underline leading-[24px] h-fit tracking-[-0.3px] text-[#2c2c2c]"
          >
            Пользовательское соглашение
          </Link>
          <Link
            target={"_blank"}
            href={
              "https://www.notion.so/practica-881c68c185544ef28b5c4571fedd6eac?pvs=4"
            }
            className="text-[20px] font-medium cursor-pointer underline leading-[24px] h-fit tracking-[-0.3px] text-[#2c2c2c]"
          >
            Обработка персональных данных
          </Link>
          <Link
            target={"_blank"}
            href={
              "https://worried-robin-41e.notion.site/f7d806ac13ae4e1ea402175edb00b331"
            }
            className="text-[20px] font-medium cursor-pointer underline leading-[24px] h-fit tracking-[-0.3px] text-[#2c2c2c]"
          >
            Оферта
          </Link>
        </div>

        <div className="flex flex-col gap-[6px] [@media(hover)]:ml-[66px] [@media(pointer:coarse)]:px-[12px] min-h-[104px]  w-full text-start">
          <p className="text-[12px] font-medium text-[#8f8f8f]">
            ООО «Практика»
          </p>
          <p className="text-[12px] font-medium text-[#8f8f8f]">
            ОГРН 1237700851882
          </p>
          <p className="text-[12px] font-medium text-[#8f8f8f]">
            ИНН 9731125749
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

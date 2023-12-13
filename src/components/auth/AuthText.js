"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = [
  "",
  "компаниями",
  "рекрутерами",
  "сотрудниками",
  "соискателями",
  "студентами",
  "кандитами",
  "программистами",
  "cпециалистами по AI",
  "инженерами",
  "дизайнерами",
  "маркетологами",
  "строителями",
  "контент мейкерами",
  "менджерами",
  "аналитиками",
  "журналистами",
  "копирайтерами",
  "нефтяниками",
  "логистами",
  "финансистами",
  "предпринимателями",
  "водителями",
  "поварами",
  "официантами",
  "дегустатрами вин",
  "руководителями",
  "тренерами",
  "адвокатами",
  "психологами",
  "врачами",
  "учителями",
  "архитекторами",
  "механиками",
  "разработчиками игр",
  "сценаристами",
  "фотографами",
];

const AuthText = () => {
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWord(variants[count]);
      if (count == variants.length - 1) setCount(0);
      else setCount(count + 1);
    }, [3000]);

    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

  return (
    <div className="flex [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-[24px] flex-col gap-[5px] max-w-full w-full">
      <p className="text-[#5875e8] font-bold select-none text-[48px] leading-[58px] tracking-[-1.6px] [@media(pointer:coarse)]:text-[40px] [@media(pointer:coarse)]:leading-[48px] [@media(pointer:coarse)]:tracking-[-1.6px]">
        practica
      </p>

      <div className="flex flex-row flex-wrap">
        <p className="flex min-w-fit [@media(pointer:coarse)]:min-w-[164px] flex-row text-[#2c2c2c] dark:text-white font-normal select-none text-[26px] leading-[28.6px] tracking-[-1.3px] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:tracking-[-1.3px] [@media(pointer:coarse)]:leading-[19.8px]">
          На связи с лучшими
        </p>
        <AnimatePresence mode="wait">
          {variants.map((item, index) => {
            if (index == count)
              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[#5875e8] font-normal select-none text-[26px] leading-[28.6px] tracking-[-1.3px] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:leading-[19.8px] [@media(pointer:coarse)]:ml-[-8px] [@media(pointer:coarse)]:tracking-[-1.3px]"
                >
                  &thinsp;&thinsp;{item}
                </motion.p>
              );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthText;

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = [
  "",
  "сотрудниками",
  "компаниями",
  "рекрутерами",
  "соискателями",
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
    <div className="flex mt-[-45px] [@media(pointer:coarse)]:mt-[-2px] flex-col gap-[5px] max-w-[484px] w-full">
      <p className="text-[#5875e8] font-bold select-none text-[48px] leading-[58px] tracking-[-0.075em] [@media(pointer:coarse)]:text-[40px] [@media(pointer:coarse)]:leading-[48px] [@media(pointer:coarse)]:tracking-[-0.0625em]">
        practica
      </p>

      <div className="flex flex-row flex-wrap">
        <p className="flex min-w-[225px] [@media(pointer:coarse)]:min-w-[164px] flex-row text-[#2c2c2c] dark:text-white font-normal select-none text-[26px] leading-[28.6px] tracking-[-0.08125em] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:tracking-[-0.05625em] [@media(pointer:coarse)]:leading-[19.8px]">
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
                  className="text-[#5875e8] font-normal select-none text-[26px] leading-[28.6px] tracking-[-0.08125em] [@media(pointer:coarse)]:text-[18px] [@media(pointer:coarse)]:leading-[19.8px] [@media(pointer:coarse)]:tracking-[-0.05625em]"
                >
                  {item}
                </motion.p>
              );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthText;

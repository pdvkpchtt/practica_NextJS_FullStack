import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import DropDownIcon from "../../shared/icons/DropDownIcon";

const DropDownWithSearch = ({
  styled = "",
  items = [],
  city = {},
  placeholder = "",
  setCity = () => {},
}) => {
  const ref = useRef();
  const [state, setState] = useState(false);
  const [input, setInput] = useState(city);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    if (city.length === 0) setInput("");
  }, [city]);

  return (
    <>
      <div className={`relative ${state && "z-[500]"} ${styled}`}>
        <div
          className={`flex w-full relative p-[12px] z-[41] h-[42px] flex-row transition-all duration-[200ms] items-center justify-between 
                ${
                  state === false
                    ? "rounded-[8px] cursor-pointer"
                    : "rounden-b-0 rounded-t-[8px] cursor-text"
                } 
               bg-[#F6F6F8] dark:bg-[#2c2c2c] dark:border-[#141414] border-[#f6f6f8]`}
        >
          <div
            className="absolute left-0 top-0 w-full h-full z-[41] "
            onClick={() => {
              setState(true);

              if (state && !isMobile) ref?.current?.focus();
            }}
          />
          <input
            ref={ref}
            value={input}
            onClick={() => {
              if (!state && isMobile) ref.current.blur();
            }}
            onChange={(e) => {
              setInput(e.target.value);
              const newArr = items.filter((i) =>
                i.label.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFiltered(newArr);
            }}
            readOnly={state === false}
            placeholder={placeholder}
            className={`${
              state === false ? "cursor-pointer" : "cursor-text"
            } outline-none ${
              state && "z-[41]"
            } bg-[#F6F6F8] dark:bg-[#2c2c2c] placeholder:select-none text-[#2c2c2c] dark:text-white placeholder:text-[#bfbfbf] dark:placeholder:text-[#8f8f8f] w-full mr-[12px]`}
          />

          <DropDownIcon
            style={state && "transform rotate-180 cursor-pointer z-[42]"}
            onClick={() => setState(false)}
          />
        </div>
        {/* нижняя хуйня */}
        <AnimatePresence>
          {state && (
            <>
              <motion.div
                className="top-0 left-0 fixed w-full h-full z-[-1]"
                onClick={() => setState(false)}
              />
              <motion.div
                className={`h-fit absolute w-full max-h-[200px] shadow-lg overflow-y-auto hideScrollbarNavMobile z-[41] bg-[#F6F6F8] dark:bg-[#2c2c2c] rounded-b-[8px]`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {filtered?.length !== 0 ? (
                  filtered?.map((item, key) => (
                    <div
                      className={`${
                        key === filtered.length - 1 && "rounded-b-[8px]"
                      } 
                  hover:bg-[#efeff1] z-[41] select-none dark:hover:bg-[#212121] cursor-pointer flex flex-col transition duration-[250ms] p-[12px] font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]`}
                      onClick={() => {
                        setCity(item);
                        setInput(item.label);

                        setState(false);
                      }}
                    >
                      {item.label}
                    </div>
                  ))
                ) : (
                  <div
                    className={`flex rounded-b-[8px] select-none flex-col transition duration-[250ms] p-[12px] font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]`}
                    onClick={() => {
                      ref?.current?.focus();
                    }}
                  >
                    Ничего не найдено
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* нижняя хуйня */}
      </div>
    </>
  );
};

export default DropDownWithSearch;

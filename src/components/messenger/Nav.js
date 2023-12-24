"use client";

import { LayoutGroup, motion } from "framer-motion";

const Nav = ({ useState, navState, layoutId = "", role }) => {
  const clickHandler = (id, setFunc, state, item) => {
    setFunc(
      state.map((item) =>
        item.id == id ? { ...item, active: true } : { ...item, active: false }
      )
    );
  };

  return (
    <LayoutGroup id={layoutId}>
      <div className="flex flex-row gap-[24px] mt-[12px]">
        {role?.includes("hr")
          ? navState.map((item, key) => (
              <div
                onClick={() => clickHandler(key, useState, navState, item)}
                className="cursor-pointer"
              >
                <NavItem item={item} key={key} />
              </div>
            ))
          : navState.reverse().map((item, key) => (
              <div
                onClick={() => clickHandler(key, useState, navState, item)}
                className="cursor-pointer"
              >
                <NavItem item={item} key={key} />
              </div>
            ))}
      </div>
    </LayoutGroup>
  );
};

export default Nav;

const NavItem = ({ item }) => {
  return (
    <motion.div className="flex flex-col gap-[10px]">
      {item.component}

      {item.active ? (
        <motion.div
          layoutId="activeItem"
          className="h-[2px] w-full bg-[#5875e8] z-50"
        />
      ) : null}
    </motion.div>
  );
};

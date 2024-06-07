"use client";

import NavigationPc from "../../shared/ui/NavigationPc";

const Right = ({
  handleClick,
  navState,
  opacity = false,
  trigger = false,
  rightRef = null,
}) => {
  return (
    <div
      ref={rightRef}
      className={`flex flex-col ${
        !trigger
          ? "[@media(hover)]:ml-[276px]"
          : opacity && "[@media(hover)]:ml-[276px]"
      } [@media(pointer:coarse)]:gap-[12px] gap-[16px] w-full h-fit`}
    >
      <NavigationPc
        useState={(value) => handleClick(value)}
        navState={navState}
        layoutId="pc"
      />

      <div className="flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]  w-full">
        {navState.map((item, key) => item.active && <>{item.component}</>)}
      </div>
    </div>
  );
};

export default Right;

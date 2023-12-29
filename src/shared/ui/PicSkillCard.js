import { useTheme } from "next-themes";

import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

const PickSkillCard = ({
  del = false,
  onClick,
  text = "",
  style = "",
  hard = true,
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`${style} items-center select-none cursor-pointer group ${
        del
          ? hard
            ? "text-[#fff] bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C]"
            : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] bg-[#74899B] bg-opacity-[8%]"
          : "text-[#2c2c2c] dark:text-white bg-[#74899B] bg-opacity-[8%]"
      } transition duration-[250ms] w-fit flex flex-row gap-[8px] px-[8px] py-[4px] rounded-[20px] font-medium text-[13px] leading-[16px] tracking-[-0.027em]`}
      onClick={() => onClick()}
    >
      {del ? (
        <CrossIcon hard={hard} />
      ) : (
        <PlusIcon
          hard={hard}
          noHover
          fill={resolvedTheme == "light" ? "#2c2c2c" : "#fff"}
        />
      )}
      {text}
    </div>
  );
};

export default PickSkillCard;

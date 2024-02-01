const OtherPlusIcon = ({ fill = "#5875e8", noHover = false, hard = true }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
      <path
        className={`${
          !noHover &&
          "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }`}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M5 10h10M10 15V5"
      />
    </svg>
  );
};

export default OtherPlusIcon;

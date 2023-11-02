const PlusInCircleIcon = ({ onClick }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick ? onClick : null}
    >
      <rect
        width="30"
        height="30"
        rx="15"
        className="fill-[#5875e8] hover:fill-[#3A56C5] active:fill-[#2C429C] transition duration-[250ms]"
      />
      <path
        d="M10.5 15H19.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19.5V10.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusInCircleIcon;

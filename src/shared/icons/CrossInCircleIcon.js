const CrossInCircleIcon = ({ onClick }) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick ? onClick : null}
    >
      <rect
        y="0.5"
        width="30"
        height="30"
        rx="15"
        className="fill-[#cdcdcd] dark:fill-[#3C3C3C]"
      />
      <path
        d="M21.1844 9.3102L14.8205 15.6742L13.2295 17.2652L8.81006 21.6846"
        className="stroke-[#3C3C3C] dark:stroke-[#cdcdcd]"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M21.1893 21.6869L14.8253 15.3229L13.2344 13.7319L8.81494 9.3125"
        className="stroke-[#3C3C3C] dark:stroke-[#cdcdcd]"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CrossInCircleIcon;

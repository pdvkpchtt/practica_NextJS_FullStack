const BackArrow = ({ onClick = () => {} }) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group cursor-pointer"
      onClick={onClick}
    >
      <path
        d="M19.5418 15.625L14.9585 20L19.5418 24.375"
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C]"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.0415 20H15.1665"
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C]"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackArrow;

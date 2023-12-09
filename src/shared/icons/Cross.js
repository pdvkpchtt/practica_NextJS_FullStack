const Cross = ({ onClick = () => {} }) => {
  return (
    <svg
      className="cursor-pointer group transition duration-[250ms]"
      onClick={onClick}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18"
        cy="18"
        r="18"
        className="dark:fill-[#141414] fill-[#f6f6f8]"
      />

      <path
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M22.5 13.5L13.5 22.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M13.5 13.5L22.5 22.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Cross;

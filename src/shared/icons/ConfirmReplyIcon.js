const ConfirmReplyIcon = ({ big = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={big ? 18 : 17}
      height={big ? 18 : 16}
      fill="none"
    >
      <path
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M10.5 6.667a4 4 0 0 1-6.14 3.38l-1.86.62.62-1.86a4 4 0 1 1 7.38-2.14Z"
      />
      <path
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M6.725 10.66a4.002 4.002 0 0 0 5.914 2.054l1.86.62-.62-1.86.095-.157a4 4 0 0 0-3.475-5.983l-.15.003-.075.004"
      />
    </svg>
  );
};

export default ConfirmReplyIcon;

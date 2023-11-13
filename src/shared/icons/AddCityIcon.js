const AddCityIcon = ({ onClick = () => {}, area = false }) => {
  return (
    // <svg
    //   width="18"
    //   height="18"
    //   viewBox="0 0 18 18"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="cursor-pointer"
    //   onClick={onClick}
    // >
    //   <path
    //     d="M9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75Z"
    //     className={
    //       area
    //         ? "stroke-[#687094] hover:stroke-[#51597A] active:stroke-[#444B67] fill-[#687094] hover:fill-[#51597A] active:fill-[#444B67] transition duration-[250ms]"
    //         : "stroke-[#5875e8] hover:stroke-[#3A56C5] active:stroke-[#2C429C] fill-[#5875e8] hover:fill-[#3A56C5] active:fill-[#2C429C] transition duration-[250ms]"
    //     }
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M6 9H12"
    //     stroke="white"
    //     strokeWidth="1.2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M9 12V6"
    //     stroke="white"
    //     strokeWidth="1.2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>

    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
    >
      <path
        d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21Z"
        className={
          area
            ? "stroke-[#687094] hover:stroke-[#51597A] active:stroke-[#444B67] fill-[#687094] hover:fill-[#51597A] active:fill-[#444B67] transition duration-[250ms]"
            : "stroke-[#5875e8] hover:stroke-[#3A56C5] active:stroke-[#2C429C] fill-[#5875e8] hover:fill-[#3A56C5] active:fill-[#2C429C] transition duration-[250ms]"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V8"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddCityIcon;

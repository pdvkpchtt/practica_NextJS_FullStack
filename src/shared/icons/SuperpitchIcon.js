const SuperpitchIcon = ({ blue = true, black = false, white = false }) => {
  const style =
    (blue &&
      "stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]") ||
    (black && "stroke-[#2c2c2c] dark:stroke-[#fff]") ||
    (white && "stroke-[#fff]");

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 16.667H14.9997"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6.66699V11.667H15.8333C16.1616 11.667 16.4867 11.6023 16.79 11.4767C17.0934 11.3511 17.369 11.1669 17.6011 10.9348C17.8332 10.7026 18.0174 10.427 18.143 10.1237C18.2687 9.82039 18.3333 9.4953 18.3333 9.16699C18.3333 8.83869 18.2687 8.5136 18.143 8.21028C18.0174 7.90697 17.8332 7.63137 17.6011 7.39922C17.369 7.16708 17.0934 6.98293 16.79 6.85729C16.4867 6.73166 16.1616 6.66699 15.8333 6.66699H15Z"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9997 6.66699H3.33301V10.8337C3.33301 11.5997 3.48389 12.3582 3.77704 13.066C4.0702 13.7737 4.49988 14.4168 5.04155 14.9584C5.58323 15.5001 6.22629 15.9298 6.93402 16.223C7.64175 16.5161 8.4003 16.667 9.16634 16.667C9.93239 16.667 10.6909 16.5161 11.3987 16.223C12.1064 15.9298 12.7495 15.5001 13.2911 14.9584C13.8328 14.4168 14.2625 13.7737 14.5556 13.066C14.8488 12.3582 14.9997 11.5997 14.9997 10.8337V6.66699Z"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5003 2.5L11.667 4.16667"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0003 2.5L9.16699 4.16667"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50033 2.5L6.66699 4.16667"
        className={style}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SuperpitchIcon;

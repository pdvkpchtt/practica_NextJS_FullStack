const NoteIcon = ({ fill = "#000", size = 17 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_5297_8413)">
        <path
          className="group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
          d="M9.16732 2.06751H4.50065C3.02789 2.06751 1.83398 3.26141 1.83398 4.73417V12.7342C1.83398 14.2069 3.02789 15.4008 4.50065 15.4008H12.5007C13.9734 15.4008 15.1673 14.2069 15.1673 12.7342V8.06751M6.50065 10.0675V8.34365C6.50065 8.16684 6.57089 7.99727 6.69591 7.87225L12.2245 2.34365C12.7452 1.82295 13.5894 1.82295 14.1101 2.34365L14.8912 3.1247C15.4119 3.6454 15.4119 4.48962 14.8912 5.01032L9.36258 10.5389C9.23756 10.6639 9.06799 10.7342 8.89118 10.7342H7.16732C6.79913 10.7342 6.50065 10.4357 6.50065 10.0675Z"
          stroke={fill}
          strokeWidth="1.33333"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5297_8413">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5 0.734375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NoteIcon;

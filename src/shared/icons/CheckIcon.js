const CheckIcon = ({ size = 20, fill = "#5875e8" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 9.99984L8.53583 13.5357L15.6067 6.46484"
        stroke={fill}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;

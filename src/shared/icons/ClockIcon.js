const ClockIcon = ({ fill = "#000" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10C2.5 11.9891 3.29018 13.8968 4.6967 15.3033C6.10322 16.7098 8.01088 17.5 10 17.5Z"
        stroke="#5875E8"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className="group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M10 5.83301V9.99967H14.1667"
        stroke="#5875E8"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;

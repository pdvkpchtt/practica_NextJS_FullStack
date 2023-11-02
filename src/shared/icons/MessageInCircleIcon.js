const MessageInCircleIcon = ({ onClick = () => {} }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
    >
      <rect
        width="30"
        height="30"
        rx="15"
        className="fill-[#cdcdcd] dark:fill-[#3C3C3C]"
      />
      <path
        d="M21 14.9996C21.0002 16.0737 20.712 17.1281 20.1655 18.0529C19.6191 18.9776 18.8344 19.7387 17.8935 20.2567C16.9525 20.7747 15.8898 21.0306 14.8162 20.9976C13.7426 20.9647 12.6975 20.6442 11.79 20.0696L9 20.9996L9.93 18.2096C9.43237 17.4233 9.12445 16.532 9.0306 15.6061C8.93674 14.6803 9.05951 13.7454 9.38921 12.8752C9.71891 12.005 10.2465 11.2234 10.9303 10.5922C11.614 9.96102 12.4353 9.49752 13.329 9.23836C14.2227 8.9792 15.1645 8.93147 16.0799 9.09896C16.9952 9.26644 17.8591 9.64454 18.6032 10.2034C19.3473 10.7622 19.9512 11.4864 20.3671 12.3188C20.7831 13.1513 20.9998 14.069 21 14.9996Z"
        className="stroke-[#3C3C3C] dark:stroke-[#cdcdcd] fill-[#3C3C3C] dark:fill-[#cdcdcd]"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default MessageInCircleIcon;

const ImageIcon = ({ style = "", size = 50 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path
        d="M3.95831 16.0415L7.49998 15.2082L15.2441 7.46404C15.4004 7.30777 15.4881 7.09584 15.4881 6.87487C15.4881 6.6539 15.4004 6.44198 15.2441 6.28571L13.7141 4.75571C13.5579 4.59948 13.3459 4.51172 13.125 4.51172C12.904 4.51172 12.6921 4.59948 12.5358 4.75571L4.79165 12.4999L3.95831 16.0415Z"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0416 16.042H11.4583"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ImageIcon;

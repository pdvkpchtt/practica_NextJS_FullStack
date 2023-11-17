import React from "react";

const LandingButton = ({ style = "" }) => {
  return (
    <div className={style}>
      <svg
        width="8vw"
        height="8vh"
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_552_4162)">
          <rect
            width="74"
            height="74"
            rx="37"
            fill="#5875E8"
            fillOpacity="0.4"
          />
        </g>
        <path
          d="M44.6654 38.9165L36.9987 46.5832L29.332 38.9165"
          stroke="white"
          strokeWidth="3.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44.6654 27.4165L36.9987 35.0832L29.332 27.4165"
          stroke="white"
          strokeWidth="3.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <filter
            id="filter0_b_552_4162"
            x="-4"
            y="-4"
            width="82"
            height="82"
            filterUnits="userSpaceOnUse"
            colorInterpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_552_4162"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_552_4162"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LandingButton;

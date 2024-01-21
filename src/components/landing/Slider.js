"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow } from "swiper/modules";

import first from "./slides/1.png";
import second from "./slides/2.png";
import third from "./slides/3.png";
import fourth from "./slides/4.png";
import fifth from "./slides/5.png";

const Slider = () => {
  const data = [first, second, third, fourth, fifth];

  return (
    <>
      <div className="w-full h-fit sm:hidden relative [@media(hover)]:hidden ">
        {/* <div className="h-full absolute w-[50px] blur-sm bg-[#f6f6f8] z-[2] right-[-30px]" /> */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          className="h-fit z-[1]"
        >
          {data.map((d, index) => (
            <SwiperSlide
              key={index}
              className="h-fit  [@media(pointer:coarse)]:pb-[15px]"
            >
              <Image
                src={d}
                unoptimized
                quality={100}
                width={284}
                height={383}
                alt={"slide" + index + 1}
                className="shadow-md rounded-[30px]"
                // className="min-h-[383px] min-w-[284px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex-col hidden sm:flex [@media(hover)]:hidden gap-[24px]">
        {data.map((d, index) => (
          <Image
            src={d}
            unoptimized
            quality={100}
            width={284}
            height={383}
            alt={"slide" + index + 1}
            className="min-h-[383px] min-w-[284px] shadow-md rounded-[30px]"
          />
        ))}
      </div>
    </>
  );
};

export default Slider;

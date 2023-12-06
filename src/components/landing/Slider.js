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
  const data = [
    first,
    second,
    third,
    fourth,
    fifth,
    first,
    second,
    third,
    fourth,
    fifth,
    first,
    second,
    third,
    fourth,
    fifth,
  ];

  return (
    <div className="w-full h-[383px] [@media(hover)]:hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {data.map((d, index) => (
          <SwiperSlide key={index}>
            <Image
              src={d}
              unoptimized
              quality={100}
              width={284}
              height={383}
              alt={"slide" + index + 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;

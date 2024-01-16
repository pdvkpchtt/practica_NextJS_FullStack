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
import RaodMapCard from "./RaodMapCard";

const Slider2 = ({ roadmap }) => {
  const data = [first, second, third, fourth, fifth];

  return (
    <>
      <div className="w-full sm:hidden relative [@media(hover)]:hidden">
        {/* <div className="h-full absolute w-[50px] blur-sm bg-[#f6f6f8] z-[2] right-[-30px]" /> */}
        {roadmap.map((i, key) => (
          <div className="" key={key}>
            <p className="text-[36px] text-start [@media(pointer:coarse)]:text-center text-[#2c2c2c] font-medium tracking-[-0.54px]">
              {i.title}
            </p>
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
              className={`${key === 0 && "mb-[32px]"} min-h-[383px] z-[1]`}
            >
              {i.content.map((i, key) => (
                <SwiperSlide key={key} className="min-h-[383px]     ">
                  <RaodMapCard
                    key={key}
                    done={i.done}
                    icon={i.icon}
                    title={i.title}
                    text1={i.text1}
                    text2={i.text2}
                    img={i.img || <></>}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {roadmap.map((i, key) => (
        <div className="flex flex-col gap-[32px]" key={key}>
          <p className="text-[36px] text-start [@media(pointer:coarse)]:text-center text-[#2c2c2c] font-medium tracking-[-0.54px]">
            {i.title}
          </p>

          <div className="flex flex-col justify-center gap-[16px] flex-wrap">
            {i.content.map((i, key) => (
              <RaodMapCard
                key={key}
                done={i.done}
                icon={i.icon}
                title={i.title}
                text1={i.text1}
                text2={i.text2}
                img={i.img || <></>}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Slider2;

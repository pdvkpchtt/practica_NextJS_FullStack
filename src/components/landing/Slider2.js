"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow } from "swiper/modules";

import RaodMapCard from "./RaodMapCard";

const Slider2 = ({ roadmap }) => {
  return (
    <>
      <div className="w-full sm:hidden relative [@media(hover)]:hidden">
        {/* <div className="h-full absolute w-[50px] blur-sm bg-[#f6f6f8] z-[2] right-[-30px]" /> */}

        {roadmap.map((i, key) => (
          <div key={key}>
            <p
              className={`text-[36px] text-start [@media(pointer:coarse)]:text-center text-[#2c2c2c] font-medium tracking-[-0.54px] ${
                key !== 0 && "mt-[32px]"
              }`}
            >
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
              className={`${"mt-[32px]"} h-fit z-[1]`}
            >
              {i.content.map((i, key) => (
                <SwiperSlide
                  key={key}
                  className="h-fit  [@media(pointer:coarse)]:pb-[15px]"
                >
                  <Image
                    src={i.subimg}
                    unoptimized
                    quality={100}
                    width={269}
                    height={383}
                    alt={"slide" + key + 1}
                    className="shadow-md rounded-[30px]"
                    // className="min-h-[383px] min-w-[284px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {roadmap.map((i, key) => (
        <div
          className="hidden sm:flex [@media(hover)]:hidden flex-col gap-[32px]"
          key={key}
        >
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

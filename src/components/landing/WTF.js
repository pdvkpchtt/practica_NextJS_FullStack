"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";
import Image from "next/image";
import TextLogo from "./TextLogo";
import EnterIcon from "shared/icons/EnterIcon";

const color = "#5875e8";

// хуйня по центру
// const Icosahedron = () => (
//   <mesh rotation-x={0.35}>
//     <icosahedronGeometry args={[1, 0]} />
//     <meshBasicMaterial wireframe color={color} />
//   </mesh>
// );

const Star = ({ p }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const distance = mix(2, 10, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene({ numStars = 500 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get() / 1.2,
      yAngle.get() * 4.5,
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(1.2));

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      {/* <Icosahedron /> */}
      {stars}
    </>
  );
}

export default function WTF() {
  return (
    <div className="absolute top-0 left-0 w-full h-full px-[3%] [@media(pointer:coarse)]:px-[5%] pt-[3%] [@media(pointer:coarse)]:pt-[5%] pb-[94px]">
      <div className="bg-[#e1e1e1] h-full w-full rounded-[5vh] overflow-hidden relative">
        <p className="font-bold absolute w-full h-full text-center flex items-center justify-center select-none">
          <TextLogo />
        </p>
        <Canvas gl={{ antialias: false }}>
          <Scene />
        </Canvas>
      </div>
      <div className="cursor-pointer absolute bottom-[30px] right-[3%]  [@media(pointer:coarse)]:right-[5%] [@media(hover)]:w-[118px] text-[16px] font-medium px-[16px] py-[12px] leading-[19px] tracking-[-0.24px] text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] bg-[#647F98] bg-opacity-[15%] flex flex-row gap-[8px] items-center justify-center group rounded-[16px]">
        <EnterIcon />
        Войти
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

import first from "./slides/1.png";
import second from "./slides/2.png";
import third from "./slides/3.png";
import fourth from "./slides/4.png";
import fifth from "./slides/5.png";

const Slider = ({ images = [first, second, third, fourth, fifth] }) => {
  return <div className="w-[284px] bg-red-500 h-[383px]"></div>;
};

export default Slider;

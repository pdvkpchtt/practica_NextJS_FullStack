"use client";

import Image from "next/image";
import React from "react";

import TextMain from "../../shared/Text/TextMain ";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

import LocationIcon from "../../shared/icons/LocationIcon";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import MessengeIcon from "../../shared/icons/MessengeIcon";

const dummyData = {
  name: "Андрей Кричевский",
  username: "anastasia.zima",
  contry: "Russia",
  city: "Ufa",
  birthdate: "15 июня 2002",
  connects: 0,
  views: 0,
};

const ChatInfo = ({ navState }) => {
  const location = [dummyData.city || null, dummyData.contry || null];

  return (
    <Card
      style=" 
        max-w-[260px] fixed [@media(pointer:coarse)]:hidden ml-[728px] h-fit [@media(hover)]:mt-[62px] w-full [@media(pointer:coarse)]:max-w-[100%] 
        flex flex-col gap-[12px]"
      padding={12}
    >
      <EmptyAvatar />
    </Card>
  );
};

export default ChatInfo;

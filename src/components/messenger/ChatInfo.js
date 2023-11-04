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
        w-[260px] [@media(pointer:coarse)]:hidden h-fit [@media(hover)]:mt-[62px]
        flex flex-col gap-[12px]"
      padding={12}
    >
      <div className="rounded-[8px] overflow-hidden [@media(pointer:coarse)]:w-full [@media(hover)]:w-[236px]">
        <EmptyAvatar />
      </div>
    </Card>
  );
};

export default ChatInfo;

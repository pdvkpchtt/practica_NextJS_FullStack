import React from "react";
import {
  Tailwind,
  Button,
  Text,
  Column,
  Body,
  Html,
  Img,
  Row,
} from "@react-email/components";

const Letter = ({ token, host, email }) => {
  return (
    <Tailwind>
      <Column className="w-[560px] bg-[#f6f6f8] pb-[56px] text-center mx-auto">
        <Img
          src="https://downloader.disk.yandex.ru/preview/b4bb3737c047e99a12175d8bb6e09093766f6c2999323dbb23eb1527edd7b5f1/656f53dc/NGtLSvittCd_UUsgyVcEFlCZP77SQI5qpjRNP1aeZxPln-DPomqa83sYi6vMYsyAg36o2EElHvajEIWIklZjSg%3D%3D?uid=0&filename=Slide%2016_9%20-%201%20%281%29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048"
          alt="Bg"
          width="560"
          height="315"
        />
        <Text className="text-[24px] text-[#2c2c2c] font-semibold leading-[24px] mt-[32px] mb-[24px]">
          Привет!
        </Text>
        <Text className="text-[17px] text-[#2c2c2c] font-normal leading-[24px] mb-[16px]">
          Код для входа в Practica
        </Text>

        <Text
          className={`text-[#5875e8] text-[32px] cursor-pointer font-semibold leading-[24px] tracking-[24px] ml-[24px] p-0`}
        >
          {token}
        </Text>
      </Column>
    </Tailwind>
  );
};

export default Letter;

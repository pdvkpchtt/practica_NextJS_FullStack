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
  Head,
} from "@react-email/components";

const Letter = ({ token, host, email }) => {
  return (
    //      https://downloader.disk.yandex.ru/preview/b4bb3737c047e99a12175d8bb6e09093766f6c2999323dbb23eb1527edd7b5f1/656f53dc/NGtLSvittCd_UUsgyVcEFlCZP77SQI5qpjRNP1aeZxPln-DPomqa83sYi6vMYsyAg36o2EElHvajEIWIklZjSg%3D%3D?uid=0&filename=Slide%2016_9%20-%201%20%281%29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048
    <Tailwind>
      <Head>
        <title>Virify code</title>
      </Head>
      <Body className="w-full bg-transparent flex flex-col items-center justify-center">
        <Body className="w-[560px] bg-[#f6f6f8] pb-[56px] text-center mx-auto">
          <Img
            src="https://practica.team/file/5d814f3e-d364-485c-94d9-0578c974af05.png"
            alt="Bg"
            width="560"
            height="315"
            className="bg-white dark:bg-transparent"
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
        </Body>
      </Body>
    </Tailwind>
  );
};

export default Letter;

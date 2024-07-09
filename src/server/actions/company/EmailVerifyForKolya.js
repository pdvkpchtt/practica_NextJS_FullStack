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

const Letter = ({ url = "", compName = "", comId = "" }) => {
  return (
    <Tailwind>
      <Head>
        <title>Virify code</title>
      </Head>
      <Body className="w-full bg-transparent flex flex-col items-center justify-center">
        <Body className="w-[560px] bg-[#f6f6f8] pb-[32px] text-center mx-auto">
          <Text className="text-[24px] text-[#2c2c2c] font-semibold leading-[24px] mt-[32px] mb-[24px]">
            Оповещение о верификации!
          </Text>
          <Text className="text-[17px] text-[#2c2c2c] font-normal leading-[24px] mb-[16px]">
            Компания {compName} отправила документы на верификацию
          </Text>
          <Text className="text-[17px] text-[#2c2c2c] font-normal leading-[24px] mb-[16px]">
            ID компании в БД - {comId}
          </Text>

          <Button
            href={url}
            className={`text-[#fff] text-[14px] cursor-pointer font-medium leading-[16px] tracking-[-0.21px] px-[16px] py-[12px] rounded-[16px] bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] transition-all duration-[250ms]`}
          >
            Ссылка на компанию
          </Button>

          <Text className="text-[14px] text-[#8f8f8f] font-normal leading-[19px] mt-[40px]">
            Если сообщение отправлено по ошибке, то не отвечайте на него
          </Text>
        </Body>
      </Body>
    </Tailwind>
  );
};

export default Letter;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MaskedInput, getCurrencyMaskGenerator } from "react-hook-mask";

import TextMain from "../../shared/Text/TextMain ";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import TextAcent from "../../shared/Text/TextAcent";
import TextSecondary from "../../shared/Text/TextSecondary";
import CheckBox from "../../shared/ui/CheckBox";

import subscriptions from "../../assets/subscriptions2.png";
import { ButtonPrimary } from "shared/ui/Button";

const maskGenerator = getCurrencyMaskGenerator({
  prefix: "",
  thousandSeparator: " ",
});

const BuyContacts = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  const [paymentInfo, setPaymentInfo] = useState({
    payer: null,
    wayofpay: true,
    amount: "",
  });

  return (
    <>
      <div className="max-w-[260px] w-full h-full  bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] p-[20px] rounded-l-[20px] [@media(pointer:coarse)]:hidden">
        <div
          className="[@media(hover)]:min-h-[439.21px] bg-cover"
          style={{ backgroundImage: `url(${subscriptions.src})` }}
        />
      </div>

      <div className="max-w-[720px] w-full bg-white [@media(pointer:coarse)]:dark:bg-[#141414] [@media(hover)]:dark:bg-[#212122] rounded-r-[20px] flex flex-col [@media(pointer:coarse)]:bg-transparent">
        {/* header pc */}
        <div className="border-b-[0.7px] items-center border-b-[#E7E7E7] dark:border-b-[#2f2f2f] p-[12px] flex flex-row justify-between [@media(pointer:coarse)]:hidden">
          <div
            className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </div>

          <TextMain
            text="Покупка контактов"
            style="font-medium text-[22px] leading-[26.4px] tracking-[-0.027em]"
          />

          <div
            className={`group rounded-[16px] invisible px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </div>
        </div>
        {/* header pc */}

        {/* header mobile */}
        <div className="fixed px-[16px] top-0 left-0 w-full bg-white dark:bg-[#212122] z-10 border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] py-[10px] [@media(hover)]:hidden">
          <div className="max-w-[476px] w-full mx-auto flex flex-row justify-between">
            <div
              className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
              onClick={() => router.back()}
            >
              <ArrowLeftIcon />
            </div>
          </div>
        </div>
        {/* header mobile */}

        {/* body */}
        <div className="flex  [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:overflow-y-auto [@media(pointer:coarse)]:mb-[80px] flex-col gap-[24px] [@media(pointer:coarse)]:dark:bg-[#141414] h-full p-[12px] [@media(pointer:coarse)]:mt-[19px]">
          {/* block */}
          <div className="flex flex-col gap-[8px]">
            <TextMain
              text="Пополнение счета"
              style="font-medium text-[20px] leading-[22px]"
            />
            <TextMain
              text="для покупки контактов, вам надо сначала пополнить счет"
              style="font-normal text-[16px] leading-[16px]"
            />
          </div>
          {/* block */}

          {/* block 2 */}
          <div className="flex flex-col gap-[8px]">
            <TextMain
              text="Плательщик"
              style="font-medium text-[20px] leading-[22px]"
            />

            <TextAcent
              text="Добавить плательщика"
              style="text-[16px]"
              onClick={() => router.push("/purchasecontacts/addpayer")}
            />
          </div>
          {/* block 2 */}

          {/* block 3 */}
          <div className="flex flex-col gap-[12px]">
            <TextMain
              text="Способ оплаты"
              style="font-medium text-[20px] leading-[22px]"
            />
            <div className="flex flex-row gap-[8px] items-center">
              <CheckBox
                active={paymentInfo.wayofpay}
                onClick={() =>
                  setPaymentInfo({
                    ...paymentInfo,
                    wayofpay: true,
                  })
                }
              />
              <TextMain
                text={"Безналичная оплата"}
                style="font-medium text-[16px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
              />
            </div>
            <div className="flex flex-row gap-[8px] items-center">
              <CheckBox
                active={!paymentInfo.wayofpay}
                onClick={() =>
                  setPaymentInfo({
                    ...paymentInfo,
                    wayofpay: false,
                  })
                }
              />
              <TextMain
                text={"Пластиковая карта"}
                style="font-medium text-[16px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
              />
            </div>
          </div>
          {/* block 3 */}

          {/* block 4  */}
          <div className="flex flex-row [@media(pointer:coarse)]:flex-col gap-[8px] items-end w-full">
            <div className="flex flex-col [@media(pointer:coarse)]:w-full w-[250px]">
              <TextSecondary
                text={"Сумма к оплате"}
                style="font-medium text-[14px] leading-[16.8px] tracking-[-0.013em] mb-[6px]"
              />
              <MaskedInput
                placeholder="Введите сумму ₽"
                className="px-[12px] h-[42px] rounded-[8px] text-[14px] pb-[12px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
                type="tel"
                maskGenerator={maskGenerator}
                value={paymentInfo.amount}
                onChange={(val) =>
                  setPaymentInfo({ ...paymentInfo, amount: val })
                }
              />
            </div>
            <ButtonPrimary
              text="Перейти к оплате"
              borderRadius={12}
              style="px-[16px] py-[11px] [@media(pointer:coarse)]:w-full"
            />
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
};

export default BuyContacts;

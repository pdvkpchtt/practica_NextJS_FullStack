import Image from "next/image";
import WTF from "./WTF";
import first from "./first.png";

const LandingPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <WTF />
      {/* потом убрать */}
      <div className="fixed z-[-3] left-0 top-0 bg-[#f6f6f8] w-full h-full" />
      {/* потом убрать */}
      {/* <LandingGearsComponents /> */}

      <div className="h-full flex-col flex gap-[8px] mt-[calc(100vh+64px)] text-center items-center">
        <p className="text-[#2D52E6] text-[38px] font-semibold leading-[38px] tracking-[-1.52px] [@media(hover)]:w-[652px]">
          Нетворкинг за пределами обычных платформ для поиска работы.
        </p>
        <p className="text-[#5E5E5E] text-[16px] font-normal leading-[19px] tracking-[-0.32px]">
          Найдете не только работу, но и ценные контакты для карьеры мечты.
        </p>
        <Image
          width={1420}
          height={878}
          src={first}
          quality={100}
          priority
          unoptimized
          alt="landing first"
        />
        <p className="text-[#2D52E6] text-[38px] bgNoise font-semibold leading-[38px] tracking-[-1.52px] [@media(hover)]:w-[652px]">
          Зарегистрируйте свою компанию
        </p>
        <p className="text-[#5E5E5E] text-[16px] font-normal leading-[19px] tracking-[-0.32px]">
          добавьте рекрутеров в несколько кликов
        </p>
        <Image
          width={1420}
          height={878}
          src={first}
          quality={100}
          priority
          unoptimized
          alt="landing first"
        />
      </div>
    </div>
  );
};

export default LandingPage;

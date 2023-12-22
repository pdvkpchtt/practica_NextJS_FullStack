const RaodMapCard = ({
  done = false,
  icon = [],
  text1 = "",
  text2 = "",
  title = "",
  img = <></>,
}) => {
  return (
    <div className="bg-[#ECEDF1] p-[20px] rounded-[30px] select-none overflow-hidden text-start h-[450px] w-[316px] flex flex-col gap-[12px] justify-between relative">
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-row gap-[12px]">
          {icon.map((i, key) => (
            <div key={key}>{i}</div>
          ))}
        </div>

        <p className="text-[#2c2c2c] text-[24px] leading-[29px] font-semibold tracking-[-0.36px]">
          {title}
        </p>
        <p className="text-[#2c2c2c] leading-[22px] text-[18px] font-normal tracking-[-0.36px]">
          {text1}
        </p>
        {text2.length > 0 && (
          <p className="text-[#2c2c2c] leading-[22px] text-[18px] font-normal tracking-[-0.36px]">
            {text2}
          </p>
        )}
        {img && img}
      </div>

      {done && (
        <p className="text-[#5875e8] z-[2] text-[16px] font-medium tracking-[-0.32px]">
          представлено
        </p>
      )}
    </div>
  );
};

export default RaodMapCard;

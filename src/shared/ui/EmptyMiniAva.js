const EmptyMiniAva = ({ text = "" }) => {
  return (
    <div className="rounded-full h-[20px] w-[20px] bg-[#5875e8] flex justify-center items-center text-white font-medium text-[14px] leading-[12px]">
      {text}
    </div>
  );
};

export default EmptyMiniAva;

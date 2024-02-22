const EmptyMiniAva = ({ text = "", mini = false }) => {
  return (
    <div
      className={`rounded-full bg-[#5875e8] flex justify-center items-center text-white font-medium ${
        !mini
          ? "text-[14px] leading-[12px] h-[20px] w-[20px]"
          : "text-[8px] leading-[8px] h-[12px] w-[12px]"
      }`}
    >
      {text}
    </div>
  );
};

export default EmptyMiniAva;

const DropDownItem = ({ text = "", choise, setOpen, handleChoise, asList }) => {
  const handleClick = () => {
    setOpen(false);
    if (asList) handleChoise(text);
    else handleChoise(text.label);
  };
  return (
    <div
      className={`flex cursor-pointer flex-col transition duration-[250ms] p-[12px] hover:bg-[#efeff1] dark:hover:bg-[#212121] ${
        choise == text.label && "bg-[#efeff1] dark:bg-[#212121]"
      } font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]`}
      onClick={() => handleClick()}
    >
      {text.label}
    </div>
  );
};

export default DropDownItem;

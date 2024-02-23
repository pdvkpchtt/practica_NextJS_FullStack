const TextAcent = ({ text = "", onClick = () => {}, style = "" }) => {
  return (
    <p
      onClick={onClick}
      className={`${style} whitespace-nowrap text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] cursor-pointer`}
    >
      {text}
    </p>
  );
};

export default TextAcent;

import { useMediaQuery } from "react-responsive";
import { useClipboard } from "use-clipboard-copy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkillCard = ({
  style,
  text,
  noCopy = false,
  hard = true,
  soft = false,
  area = false,
  onClick = () => {},
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  return (
    <div
      className={`${style} ${
        hard &&
        "bg-[#74899B] bg-opacity-[8%] text-[#F56C89] hover:text-[#E45775] active:text-[#C9506A]"
      } ${
        soft &&
        "bg-[#74899B] bg-opacity-[8%] text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
      } ${
        area &&
        "bg-[#74899B] bg-opacity-[8%] text-[#687094] hover:text-[#51597A] active:text-[#444B67]"
      } px-[8px] w-fit whitespace-nowrap transition duration-[250ms] select-none cursor-pointer py-[4px] rounded-[20px] font-medium text-[13px] leading-[16px] tracking-[-0.027em]`}
      onClick={() => {
        if (!noCopy) {
          toast(`🦄 Текст скопирован`, {
            position: isMobile ? "top-center" : "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            // theme: "dark",
            progressStyle: { background: "#5875e8" },
            containerId: "forCopy",
          });
          clipboard.copy(text);
        } else onClick();
      }}
    >
      {text}
    </div>
  );
};

export default SkillCard;

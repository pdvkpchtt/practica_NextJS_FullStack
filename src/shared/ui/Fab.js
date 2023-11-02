import NoteIcon from "../icons/NoteIcon";

const Fab = ({ children, onClick = () => {} }) => {
  return (
    <div
      className="fixed right-[16px] w-[50px] h-[50px] z-[20] mx-auto bottom-[96px] bg-[#5875e8] p-[12px] rounded-full [@media(hover)]:hidden transition duration-[250ms] hover:bg-[#3A56C5] active:bg-[#2C429C]"
      onClick={() => onClick()}
    >
      {children ? <>{children}</> : <NoteIcon fill="#fff" size={26} />}
    </div>
  );
};

export default Fab;

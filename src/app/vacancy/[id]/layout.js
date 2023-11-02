const VacancyLayout = ({ children }) => {
  return (
    <div
      className="flex gap-[16px] w-full h-full overflow-hidden [@media(pointer:coarse)]:overflow-y-auto 
      [@media(pointer:coarse)]:mb-[80px]  [@media(pointer:coarse)]:mt-[61px]  [@media(pointer:coarse)]:gap-[0px]
            flex-row [@media(pointer:coarse)]:flex-col 
            
          "
    >
      {children}
    </div>
  );
};

export default VacancyLayout;

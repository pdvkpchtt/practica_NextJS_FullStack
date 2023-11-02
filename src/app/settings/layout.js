const SettingsLayout = ({ children }) => {
  return (
    <div className="[@media(pointer:coarse)]:mt-[38px] [@media(hover)]:mt-[62px] w-full">
      {children}
    </div>
  );
};

export default SettingsLayout;

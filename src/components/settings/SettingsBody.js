"use client";

import { signOut } from "next-auth/react";

import { ButtonAlert, MenuButton } from "../../shared/ui/Button";

const SettingsBody = () => {
  return (
    <>
      <div className="flex flex-col">
        <MenuButton
          text="Условия и положения"
          borderBottom
          style="[@media(pointer:coarse)]:rounded-t-[20px] rounded-t-[8px]"
        />
        <MenuButton text="Политика конфиденциальности" borderBottom />
        <MenuButton
          text="Владение авторскими правами"
          style="[@media(pointer:coarse)]:rounded-b-[20px] rounded-b-[8px]"
        />
      </div>

      <div className="w-full [@media(pointer:coarse)]:flex [@media(pointer:coarse)]:justify-center [@media(pointer:coarse)]:mt-[16px] rounded-[8px] [@media(pointer:coarse)]:rounded-[20px] p-[16px]">
        <ButtonAlert text="Выйти" onClick={signOut} />
      </div>
    </>
  );
};

export default SettingsBody;

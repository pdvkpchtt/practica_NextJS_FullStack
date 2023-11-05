import TextMain from "../Text/TextMain ";
import BottomModal from "./BottomModal";
import { uploadAvatar } from "../../server/actions/uploadAvatar";

import AvatarIcon from "../icons/AvatarIcon";
import { useRef } from "react";

const UpploadAvatarModal = ({ isOpen = false, handleClose = () => {} }) => {
  const inputRef = useRef(null);
  const buttRef = useRef(null);

  return (
    <BottomModal isOpen={isOpen} handleClose={handleClose}>
      <div className="p-[12px]">
        <form action={uploadAvatar}>
          <input
            type="file"
            name="file"
            className="hidden"
            ref={inputRef}
            onChange={() => {
              buttRef.current.click();
              handleClose();
            }}
          />
          <input
            type="submit"
            value="Upload"
            ref={buttRef}
            className="hidden"
          />

          <div
            onClick={() => inputRef.current.click()}
            className="bg-[#74899B] bg-opacity-[8%] rounded-[8px] items-center flex flex-row justify-between hover:bg-[#647f98] hover:bg-opacity-[15%] cursor-pointer transition duration-[250ms] p-[16px]"
          >
            <TextMain
              text="Загрузить изображение"
              style="font-medium text-[16px] leading-[20px] tracking-[-0.015em] flex-1"
            />
            <AvatarIcon />
          </div>
        </form>
      </div>
    </BottomModal>
  );
};

export default UpploadAvatarModal;

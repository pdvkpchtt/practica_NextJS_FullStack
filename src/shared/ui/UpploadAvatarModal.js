import { useRef } from "react";

import TextMain from "../Text/TextMain ";
import BottomModal from "./BottomModal";
import { uploadAvatar } from "../../server/actions/uploadAvatar";
import { uploadAvatarCompany } from "../../server/actions/uploadAvatarCompany";

import AvatarIcon from "../icons/AvatarIcon";
import axios from "axios";

const UpploadAvatarModal = ({
  isOpen = false,
  handleClose = () => {},
  onDone = () => {},
  company = false,
  compId,
}) => {
  const inputRef = useRef(null);
  const buttRef = useRef(null);

  const handleChange = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append("avatar", e.target.files[0]);
    let res = null;

    if (company === false)
      res = await axios
        .post("/api/upload/avatar", formData)
        .then((res) => {
          return res?.data;
        })
        .catch(console.log);
    else {
      formData.append("compId", compId);
      res = await axios
        .post("/api/upload/avatarComp", formData)
        .then((res) => {
          return res?.data;
        })
        .catch(console.log);
    }
    onDone(res?.filePath);
  };

  return (
    <BottomModal isOpen={isOpen} handleClose={handleClose}>
      <div className="p-[12px]">
        <form action={() => {}}>
          <input
            type="file"
            name="file"
            accept="image/png, image/jpg, image/jpeg"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              handleChange(e);
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

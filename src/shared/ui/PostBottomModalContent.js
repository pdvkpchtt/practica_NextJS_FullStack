import { deletePostHandler } from "server/actions/posts/deletePostHandler";
import TextMain from "../Text/TextMain ";

const PostBottomModalContent = ({
  postId = "",
  author_id = "",
  handleClose,
  setDeleted,
}) => {
  const deleteHanler = async () => {
    await deletePostHandler(postId);
    setDeleted();
    handleClose();
  };

  return (
    <div className="h-full w-full px-[12px] pt-[12px] pb-[24px]">
      <div
        className="bg-[#74899B] bg-opacity-[8%] rounded-[8px] hover:bg-[#647f98] hover:bg-opacity-[15%] cursor-pointer transition duration-[250ms] p-[16px]"
        onClick={() => deleteHanler()}
      >
        <TextMain
          text="Удалить пост"
          style="font-medium text-[16px] leading-[20px] tracking-[-0.015em]"
        />
      </div>
    </div>
  );
};

export default PostBottomModalContent;

"use client";

import { useContext, useRef } from "react";
import { usePathname } from "next/navigation";

import Fab from "../../shared/ui/Fab";
import CreatePostModal from "./CreatePostModal";
import { ModalContext } from "./ModalContext";

import PenIcon from "../../shared/icons/PenIcon";

const FeedWrap = ({ children, sendPost }) => {
  // const ref = useRef(null);
  const pathname = usePathname();

  const { modalCreatePost, setModalCreatePost, posts, setPosts } =
    useContext(ModalContext);

  return (
    <>
      <div
        className={`flex [@media(hover)]:ml-[175px] [@media(pointer:coarse)]:mb-[80px] [@media(pointer:coarse)]:overflow-y-scroll [@media(pointer:coarse)]:p-[12px] ${
          pathname.includes("/feed/post/")
            ? "[@media(pointer:coarse)]:mt-[61px]"
            : "[@media(pointer:coarse)]:mt-[85px]"
        } flex-col h-full gap-[12px] [@media(hover)]:max-w-[630px] w-full mr-auto`}
      >
        {/* ancor for scroll to top */}
        {/* <div
          ref={ref}
          className="absolute top-[-86px] bg-red-500 w-[50px] h-[50px]"
        /> */}
        {children}
      </div>

      <CreatePostModal
        open={modalCreatePost}
        setClose={setModalCreatePost}
        sendPost={sendPost}
        updateFeed={(post) => setPosts([post, ...posts])}
        onToastClick={() => {
          ref?.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      {!pathname.includes("/post/") && (
        <Fab onClick={() => setModalCreatePost(true)}>
          <PenIcon fill="#fff" size={26} />
        </Fab>
      )}
    </>
  );
};

export default FeedWrap;

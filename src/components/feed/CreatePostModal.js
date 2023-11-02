"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

import CircularProggressBar from "../../shared/ui/CircularProggressBar";
import Modal from "../../shared/ui/Modal";
import PostDropDown from "../../shared/ui/PostDropDown";
import PicReaction from "../../shared/ui/PicReaction";
import MobileModal from "../../shared/ui/MobileModal";
import { OneIconButton } from "../../shared/ui/Button";
import TextMain from "../../shared/Text/TextMain ";
import { fetchCategorise } from "../../server/actions/posts/fetchCategorise";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import Cross2 from "../../shared/icons/Cross2";

import big_thumb from "../../shared/icons/reactions/big_thumb.svg";
import blow_my_mind from "../../shared/icons/reactions/blow_my_mind.svg";
import clown from "../../shared/icons/reactions/clown.svg";
import cry from "../../shared/icons/reactions/cry.svg";
import fire from "../../shared/icons/reactions/fire.svg";
import smile from "../../shared/icons/reactions/smile.svg";
import thumb_down from "../../shared/icons/reactions/thumb_down.svg";

const CreatePostModal = ({
  open = false,
  setClose = () => {},
  sendPost,
  updateFeed,
  // это потом доработается
  headerMax = 120,
  textMax = 500,
  onToastClick = () => {},
}) => {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [dropDownState, setDropDownState] = useState({ name: "Офтоп" });
  const [headState, setHeadState] = useState("");
  const [textState, setTextState] = useState("");

  const [pickedReactions, setPickedReactions] = useState([
    { type: "big_thumb" },
  ]);
  const [loaderState, setLoaderState] = useState(false);
  const [slideToTopState, setSlideToTop] = useState(false);

  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   if (isMobile) {
  //     if (open) document.body.style.overflow = "hidden";
  //     else document.body.style.overflow = "unset";
  //   }
  // }, [open, isMobile]);

  const [reactions, setReactitons] = useState([
    { type: "fire", ...fire, active: false },
    { type: "big_thumb", ...big_thumb, active: true },
    { type: "thumb_down", ...thumb_down, active: false },
    { type: "blow_my_mind", ...blow_my_mind, active: false },
    { type: "smile", ...smile, active: false },
    { type: "cry", ...cry, active: false },
    { type: "clown", ...clown, active: false },
  ]);

  const getCategires = async () => {
    const categories = await fetchCategorise();
    setCategories(categories);
    setDropDownState(categories[0]);
  };

  useEffect(() => {
    getCategires();
  }, []);

  return (
    <>
      <Modal isOpen={open} slideToTop={slideToTopState}>
        {/* header */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-[12px]">
            <CircularProggressBar
              progress={textState.length}
              maxWal={textMax}
              trackColor={
                textState.length === 0
                  ? "stroke-[#ececec] dark:stroke-[#202436]"
                  : "stroke-[#CDD6F8] dark:stroke-[#353D5C]"
              }
              indicatorColor={
                textState.length === 0 ? "stroke-[#ececec]" : "stroke-[#758DEC]"
              }
              trackWidth={2.67}
              indicatorWidth={2.67}
              size={18}
            />
            <PostDropDown
              choise={dropDownState}
              items={categories}
              handleSetChoise={(val) => setDropDownState(val)}
            />
          </div>
          <Cross2 onClick={() => setClose(false)} />
        </div>
        {/* header */}

        {/* body */}
        <div className="flex flex-col my-[12px] gap-[12px] overflow-y-auto">
          <TextareaAutosize
            className="outline-none min-h-[25px] resize-none bg-transparent placeholder:text-[#BFBFBF] text-[20px] font-medium text-[#2c2c2c] dark:text-white leading-[22px] tracking-[-0.025em]"
            placeholder="Заголовок"
            value={headState}
            onChange={(e) => setHeadState(e.target.value)}
            maxLength={headerMax}
          />
          <div
            className="h-[283px] cursor-text w-full"
            onClick={() => inputRef.current.focus()}
          >
            <TextareaAutosize
              ref={inputRef}
              className="outline-none w-full resize-none bg-transparent placeholder:text-[#BFBFBF] text-[16px] font-normal text-[#2c2c2c] dark:text-white leading-[19px] tracking-[-0.015em]"
              placeholder="Текст"
              value={textState}
              onChange={(e) => setTextState(e.target.value)}
              maxLength={textMax}
            />
          </div>
        </div>
        {/* body */}

        {/* bottom */}
        <div className="flex flex-row h-fit justify-between items-center w-full">
          <div className="hideScrollbarNav flex flex-row gap-[10px] overflow-x-scroll flex-1">
            {reactions.map((item, key) => (
              <PicReaction
                key={key}
                icon={item}
                isActive={item.active}
                state={reactions}
                setReactitons={(value) => {
                  setReactitons(value);
                  setPickedReactions(
                    value.map((item) =>
                      item.active ? { type: item.type } : { type: "no_display" }
                    )
                  );
                  console.log(pickedReactions);
                }}
              />
            ))}
          </div>

          <SendButton
            textState={textState}
            headState={headState}
            loaderState={loaderState}
            onClick={
              textState.length > 0 && headState.length > 0
                ? async () => {
                    setSlideToTop(true);
                    setLoaderState(true);
                    console.log(pickedReactions);
                    console.log({
                      text: textState,
                      reactions: pickedReactions,
                    });
                    const post = await sendPost({
                      title: headState,
                      text: textState,
                      reactions: pickedReactions,
                      category: dropDownState,
                    });
                    updateFeed(post);
                    setHeadState("");
                    setTextState("");
                    setLoaderState(false);
                    setClose();

                    // if (!isMobile)
                    //   toast(`🦄 Scroll to post?`, {
                    //     position: isMobile ? "top-center" : "bottom-center",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    //     // theme: "dark",
                    //     progressStyle: { background: "#5875e8" },
                    //     containerId: "forCopy",
                    //     onClick: () => onToastClick(),
                    //   });

                    setSlideToTop(false);
                    setReactitons([
                      { type: "fire", ...fire, active: false },
                      { type: "big_thumb", ...big_thumb, active: true },
                      { type: "thumb_down", ...thumb_down, active: false },
                      { type: "blow_my_mind", ...blow_my_mind, active: false },
                      { type: "smile", ...smile, active: false },
                      { type: "cry", ...cry, active: false },
                      { type: "clown", ...clown, active: false },
                    ]);
                  }
                : () => {}
            }
          />
        </div>
        {/* bottom */}
      </Modal>

      <MobileModal isOpen={open} slideToLeft>
        {/* header */}
        <div className="[@media(pointer:coarse)]:fixed z-20 [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
          <div className="items-center w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
            <div
              onClick={() => {
                setClose();
              }}
            >
              <TextMain
                text="Отмена"
                style={"text-[14px] tracking-[-0.013125em] leading-[17px]"}
              />
            </div>

            <SendButton
              textState={textState}
              headState={headState}
              loaderState={loaderState}
              onClick={
                textState.length > 0 && headState.length > 0
                  ? async () => {
                      setSlideToTop(true);
                      setLoaderState(true);
                      console.log(pickedReactions);
                      console.log({
                        text: textState,
                        reactions: pickedReactions,
                      });
                      const post = await sendPost({
                        title: headState,
                        text: textState,
                        reactions: pickedReactions,
                        category: dropDownState,
                      });
                      updateFeed(post);
                      setHeadState("");
                      setTextState("");
                      setLoaderState(false);
                      setClose();

                      // if (isMobile)
                      //   toast(`🦄 Scroll to post?`, {
                      //     position: isMobile ? "top-center" : "bottom-center",
                      //     autoClose: 2000,
                      //     hideProgressBar: false,
                      //     closeOnClick: true,
                      //     pauseOnHover: false,
                      //     draggable: true,
                      //     progress: undefined,
                      //     // theme: "dark",
                      //     progressStyle: { background: "#5875e8" },
                      //     containerId: "forCopy",
                      //     onClick: () => {
                      //       onToastClick();
                      //     },
                      //   });

                      setSlideToTop(false);
                      setReactitons([
                        { type: "fire", ...fire, active: false },
                        { type: "big_thumb", ...big_thumb, active: true },
                        { type: "thumb_down", ...thumb_down, active: false },
                        {
                          type: "blow_my_mind",
                          ...blow_my_mind,
                          active: false,
                        },
                        { type: "smile", ...smile, active: false },
                        { type: "cry", ...cry, active: false },
                        { type: "clown", ...clown, active: false },
                      ]);
                    }
                  : () => {}
              }
            />
          </div>
        </div>
        {/* header */}

        {/* body */}
        <div className="flex px-[12px] h-[calc(100vh-132px)] mt-[58px] flex-col gap-[12px] overflow-y-auto">
          <div className="flex mt-[12px] flex-row gap-[12px]">
            <CircularProggressBar
              progress={textState.length}
              maxWal={textMax}
              trackColor={
                textState.length === 0
                  ? "stroke-[#ececec] dark:stroke-[#202436]"
                  : "stroke-[#CDD6F8] dark:stroke-[#353D5C]"
              }
              indicatorColor={
                textState.length === 0 ? "stroke-[#ececec]" : "stroke-[#758DEC]"
              }
              trackWidth={2.67}
              indicatorWidth={2.67}
              size={18}
            />
            <PostDropDown
              choise={dropDownState}
              items={categories}
              handleSetChoise={(val) => setDropDownState(val)}
            />
          </div>

          <div className="w-full">
            <TextareaAutosize
              className="outline-none w-full bg-transparent min-h-[25px] resize-none placeholder:text-[#BFBFBF] text-[20px] font-medium text-[#2c2c2c] dark:text-white leading-[22px] tracking-[-0.025em]"
              placeholder="Заголовок"
              value={headState}
              onChange={(e) => setHeadState(e.target.value)}
              maxLength={headerMax}
            />
          </div>
          <div
            className="h-full cursor-text w-full"
            onClick={() => inputRef2.current.focus()}
          >
            <TextareaAutosize
              ref={inputRef2}
              className="outline-none w-full bg-transparent resize-none placeholder:text-[#BFBFBF] text-[16px] font-normal text-[#2c2c2c] dark:text-white leading-[19px] tracking-[-0.015em]"
              placeholder="Текст"
              value={textState}
              onChange={(e) => setTextState(e.target.value)}
              maxLength={textMax}
            />
          </div>
        </div>
        {/* body */}

        {/* bottom */}
        <div className="hideScrollbarNav border-t-[0.7px] border-t-[#E7E7E7] dark:border-t-[#2f2f2f] px-[12px] pt-[12px] flex flex-row gap-[10px] overflow-x-scroll flex-1">
          {reactions.map((item, key) => (
            <PicReaction
              mobile
              key={key}
              icon={item}
              isActive={item.active}
              state={reactions}
              setReactitons={(value) => {
                setReactitons(value);
                setPickedReactions(
                  value.map((item) =>
                    item.active ? { type: item.type } : { type: "no_display" }
                  )
                );
                console.log(pickedReactions);
              }}
            />
          ))}
        </div>

        {/* bottom */}
      </MobileModal>
    </>
  );
};

export default CreatePostModal;

const SendButton = ({
  onClick = () => {},
  textState = "",
  headState = "",
  loaderState = false,
}) => {
  return (
    <div
      className={`rounded-[30px] w-[112px] h-[33px] transition duration-[250ms] px-[8px] py-[7.5px] flex items-center justify-center font-medium text-[14px] leading-[16px] tracking-[-0.015em] select-none
    ${
      headState != "" && textState != ""
        ? "active:bg-[#2C429C] hover:bg-[#3A56C5] bg-[#5875e8] text-white  cursor-pointer"
        : "bg-[#74899b] bg-opacity-[8%] text-[#bfbfbf] cursor-not-allowed"
    }
  `}
      onClick={onClick}
    >
      {!loaderState ? (
        <div>Опубликовать</div>
      ) : (
        <Oval
          height={19}
          width={19}
          color="rgba(255, 255, 255, 1)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="rgba(255, 255, 255, 0.3)"
          strokeWidth={6}
          strokeWidthSecondary={6}
        />
      )}
    </div>
  );
};

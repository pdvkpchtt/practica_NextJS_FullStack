import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Modal = ({
  width = 630,
  isOpen = false,
  handleClose = () => {},
  children,
  translate = "translate(-50%, 0%)",
  slideToTop = false,
  fadeAnim = false,
  withScroll = false,
}) => {
  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const containerVariant = {
    initial: fadeAnim
      ? { scale: 0.7, translateX: "-50%", top: "86px" }
      : { top: "100%", transition: { type: "spring" } },
    isOpen: fadeAnim
      ? {
          scale: 1,
          translateX: "-50%",
          top: "86px",
        }
      : { top: "86px" },
    exit: fadeAnim
      ? { scale: 0.7, translateX: "-50%", top: "86px" }
      : { top: slideToTop ? "-100%" : "100%" },
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full bg-[#4A5479] dark:bg-black dark:bg-opacity-[50%] bg-opacity-[20%] z-[100]"
            initial={"initial"}
            animate={"isOpen"}
            exit={"exit"}
            variants={modalVariant}
            onClick={handleClose}
          ></motion.div>
          <motion.div
            className={`[@media(pointer:coarse)]:hidden [@media(pointer:coarse)]:h-[0px] [@media(pointer:coarse)]:w-[0px] [@media(pointer:coarse)]:m-[0px] [@media(pointer:coarse)]:p-[0px] [@media(hover)]:h-fit fixed dark:bg-[#141414] bg-[#fff] z-[200] bottom-0 left-[50%] ${
              withScroll
                ? "[@media(hover)]:px-[12px] pt-[12px]"
                : "[@media(hover)]:p-[12px]"
            } rounded-[20px]`}
            initial={"initial"}
            animate={"isOpen"}
            exit={"exit"}
            variants={containerVariant}
            style={{ transform: translate, width: width }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

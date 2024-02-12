import { AnimatePresence, motion } from "framer-motion";

const HrHoverModal = ({ setHoverModal = () => {}, hoverModal = false }) => {
  return (
    <AnimatePresence>
      {hoverModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="absolute pt-[33px] top-[12px] right-[0px] cursor-default z-[25] w-[100px] h-[100px]"
          onMouseEnter={() => setHoverModal(true)}
          onMouseLeave={() => setHoverModal(false)}
        >
          <div className="w-full h-full bg-[#FFFFFF] dark:bg-[#2c2c2c] rounded-[12px]"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HrHoverModal;

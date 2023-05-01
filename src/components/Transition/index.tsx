import { motion } from "framer-motion";

const Transition = ({ children }:any) => (
    <div className="overflow-x-hidden">
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    // initial={{ y: 500 }}
    // animate={{
    //   y: 0,
    //   transition: { duration: 2.0, type: "spring" },
    // }}
    // exit={{
    //   y: -500,
    //   transition: { duration: 2.0, type: "spring", ease: "easeInOut" },
    // }}
  >
    {children}
  </motion.div>
  </div>
);
export default Transition;
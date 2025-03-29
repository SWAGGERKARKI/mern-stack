import { motion } from "motion/react";

function PageWrapper({ children }) {
  const pageVariant = {
    initial: { opacity: 0, y: -20 },
    animate: {opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return(
    <motion.div
      variants={pageVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper;
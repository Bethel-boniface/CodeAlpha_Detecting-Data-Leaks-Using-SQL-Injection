import { motion } from "framer-motion";

function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">

            <motion.div
                animate={{
                    x: [0, 120, -80, 0],
                    y: [0, -60, 60, 0],
                    scale: [1, 1.2, 1, 1.1]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl top-20 left-20"
            />

            <motion.div
                animate={{
                    x: [0, -100, 80, 0],
                    y: [0, 80, -50, 0],
                    scale: [1.1, 1, 1.3, 1]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-[450px] h-[450px] rounded-full bg-cyan-400/10 blur-3xl bottom-0 right-0"
            />

            <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-1/2 top-1/2 w-[700px] h-[700px] border border-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
}

export default AnimatedBackground;
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function Stats() {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3
    });

    const stats = [

        {
            value: 15483,
            suffix: "+",
            title: "Threats Blocked"
        },

        {
            value: 8420,
            suffix: "+",
            title: "Protected Users"
        },

        {
            value: 99.9,
            suffix: "%",
            title: "Detection Accuracy"
        },

        {
            value: 24,
            suffix: "/7",
            title: "System Monitoring"
        }

    ];

    return (

        <section
            ref={ref}
            className="bg-slate-950 py-24"
        >

            <div className="max-w-7xl mx-auto px-6">

                <motion.h2

                    initial={{ opacity: 0 }}

                    whileInView={{ opacity: 1 }}

                    transition={{ duration: 0.6 }}

                    className="text-5xl font-bold text-center text-white"

                >

                    Trusted Security Platform

                </motion.h2>

                <p className="text-center text-gray-400 mt-6 mb-20">

                    Enterprise-grade protection for modern applications.

                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        stats.map((item, index) => (

                            <motion.div

                                key={index}

                                initial={{
                                    opacity:0,
                                    y:40
                                }}

                                whileInView={{
                                    opacity:1,
                                    y:0
                                }}

                                transition={{
                                    delay:index*0.15
                                }}

                                className="bg-slate-900 rounded-2xl p-10 text-center border border-slate-800 hover:border-blue-500 transition"

                            >

                                <h3 className="text-5xl font-bold text-blue-500">

                                    {

                                        inView &&

                                        <CountUp

                                            end={item.value}

                                            duration={3}

                                            decimals={item.value % 1 !== 0 ? 1 : 0}

                                        />

                                    }

                                    {item.suffix}

                                </h3>

                                <p className="text-gray-400 mt-5">

                                    {item.title}

                                </p>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Stats;
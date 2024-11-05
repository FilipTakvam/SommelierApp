'use client';
import styles from './page.module.scss';
import { easeInOut, motion, useInView, Variants } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import TextSilder from './components/TextSilder';
import { ReactElement, useEffect, useRef } from 'react';
import WineBottle from './components/WineBottle';
import DigitalSommelier from './components/digitalsommelier';
import { useRouter } from 'next/navigation';

export default function Home(): ReactElement {

  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50%' });

  useEffect(() => {
    console.log(isInView)
  }, [isInView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Adjust the stagger delay as needed
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className='wrapper'>
        <section id="home" className={styles.main}>
          <h1 className={styles.slogan}>
            <Typewriter
              words={['Where tradition\nmeets innovation']}
              typeSpeed={85}
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1.5, ease: easeInOut } }}
          >
            A new way of getting wine recommendations before going to the store
          </motion.p>
          <motion.button
            className="outline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 3, duration: 1.5, ease: easeInOut } }}
            onClick={() => router.push("#thedigitalsommelier", { scroll: true })}
            style={{marginTop: "2em"}}
          >
            Get Recommendation
          </motion.button>
        </section>
        <div>
          <TextSilder
            texts={[
              { text: "Riesling", offset: "-40%" },
              { text: "Pinot Noir", offset: "-50%" },
              { text: "Chardonnay", offset: "-65%" },
              { text: "Zinfandel", offset: "-40%" }
            ]}
          />
        </div>
        <section id="howitworks" className={styles.about} ref={sectionRef}>
          <motion.div
            className={styles.aboutText}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <h2>How it works</h2>

            <motion.div className={styles.textBox} variants={itemVariants}>
              <h3>Decide what to eat</h3>
              <p>First, you need to know what to eat. It is recommended to find a good recipe which describes how it tastes as well as how it is prepared. The better information, the better the result.</p>
            </motion.div>

            <motion.div className={styles.textBox} variants={itemVariants}>
              <h3>Provide the sommelier the information</h3>
              <p>Secondly, using the data from the previous step, pass it to the AI. The AI will incorporate this data into a specialized set of instructions (referred to as a 'prompt') to determine the best possible wine selection.</p>
            </motion.div>

            <motion.div className={styles.textBox} variants={itemVariants}>
              <h3>Verify the results</h3>
              <p>Lastly, check the results and ensure that the results match your expectations. Remember, AI can make mistakes and this tool is only an experiment.</p>
            </motion.div>
          </motion.div>
          <WineBottle />
        </section>
        <DigitalSommelier />
        <footer className={styles.footer}>
          <p className={styles.footerText}>Created by Filip Takvam ©2024. Visit my portfolio - <a href="https://www.filiptakvam.com/" target="_blank" rel="noopener noreferrer">www.filiptakvam.com</a></p>
        </footer>
      </div>
    </>
  );
}

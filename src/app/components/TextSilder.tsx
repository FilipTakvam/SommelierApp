import styles from './textslider.module.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

type TextSliderProps = {
    texts: TextProps[]
}

type TextProps = {
    text: string,
    offset: string,
}

function TextSlider({ texts }: TextSliderProps) { // Fixed spelling from TextSilder to TextSlider
    const sliderContainer = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: sliderContainer,
        offset: ['start end', 'end start']
    })

    return (
        <div ref={sliderContainer} className={styles.sliderContainer}>
            {texts.map((text, index) => (
                <Slide
                    key={index} // Still okay here because it's unique within the texts array
                    text={text.text}
                    slideDirection={index % 2 === 0 ? 'left' : 'right'}
                    progress={scrollYProgress}
                    offset={text.offset}
                />
            ))}
        </div>
    )
}

type SlideProps = {
    slideDirection: "left" | "right",
    progress: MotionValue,
    text: string,
    offset: string,
}

function Slide({ slideDirection, progress, text, offset }: SlideProps) {
    const direction = slideDirection === 'left' ? 1 : -1;
    const translateX = useTransform(progress, [0, 1], [150 * direction, -150 * direction]);
    return (
        <motion.div style={{ x: translateX, left: offset }} className={styles.slide}>
            {[...Array(7)].map((_, index) => (
                <React.Fragment key={index}>
                    {/* Combine index with text to create a unique key */}
                    <h1 key={`${text}-${index}`}>{text}</h1>
                    <h1 key={`${text}-dot-${index}`}>⋅</h1>
                </React.Fragment>
            ))}
        </motion.div>
    )
}

export default TextSlider;

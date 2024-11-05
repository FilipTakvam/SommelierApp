'use client';
import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, Variants } from "framer-motion";
import { easeInOut } from 'framer-motion/dom';

function Navbar() {

  const [open, setOpen] = useState<boolean>(false);

    // Check the screen width and close the navbar if it's below a specific breakpoint
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 767px)'); // Adjust as needed
  
      const handleResize = () => {
        if (!mediaQuery.matches) {
          setOpen(false);
          console.log(mediaQuery.matches)
        }
      };
  
      // Listen for changes in the media query
      mediaQuery.addEventListener('change', handleResize);
  
      // Cleanup event listener on component unmount
      return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

  const scalingVariants: Variants = {
    hide: { scaleY: 0 },
    visible: { scaleY: 1 , transition: {ease: easeInOut}},
    hidden: { scaleY: 0 },
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image
          src={"Logo.svg"}
          alt="Logo"
          sizes="70px"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Desktop Nav */}

      <ul className={styles.navLinks}>
        <li><Link href="#home">Home</Link></li>
        <li><Link href="#howitworks">How it Works</Link></li>
        <li><Link href="#thedigitalsommelier">The Digital Sommelier</Link></li>
      </ul>

      {/* Mobile Nav */}
      <div className={styles.hamburgerMenu} onClick={() => setOpen(!open)}>
        <span className={open ? styles.active : ""}></span>
        <span className={open ? styles.active : ""}></span>
        <span className={open ? styles.active : ""}></span>
      </div>
      <AnimatePresence>
        {open &&
          <motion.div
            className={styles.navLinksContainer}
            variants={scalingVariants}
            style={{ originY: 0 }}
            initial="hidden"
            animate="visible"
            exit="hide"
          >
            <ul className={styles.navLinksMobile}>
              <li><Link href="#home">Home</Link></li>
              <li><Link href="#howitworks">How it Works</Link></li>
              <li><Link href="#thedigitalsommelier">The Digital Sommelier</Link></li>
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
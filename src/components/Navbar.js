'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/navbar.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import Link from 'next/link';
import Menu from './Menu';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import Image from 'next/image';
import { FaQuestion } from "react-icons/fa";

const Navbar = () => {

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const showAnim = gsap.from(`.${styles.header}`, {
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top-=1%",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });
  })

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link href={"/"} className={styles.logo}>
            <div className={styles.black}>
              <Image width={1000} height={1000} src="/images/vmetal-logo.png" className='img-fluid' alt="" />
            </div>
            <div className={styles.white}>
              <Image width={1000} height={1000} src="/images/vmetal-logo.png" className='img-fluid' alt="" />
            </div>
          </Link>
          <div className={styles.links}>
            <div className={styles.contact}>
              <Link href="/inquiry">
                <div className={styles.contactIcon}>
                <FaQuestion color='#fff' />
                </div>
                <span>Inquiry Now</span>
              </Link>
            </div>
            <button className={styles.menuBtn} onClick={() => { setMenu(true) }}>
              <FaBarsStaggered color='var(--text-color)' />
              <span>Menu</span>
            </button>
          </div>
        </nav>
      </header>

      <Menu setMenu={setMenu} menu={menu} />
    </>
  )
}

export default Navbar

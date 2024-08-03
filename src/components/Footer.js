'use client'
import React, { useEffect } from 'react'
import styles from '@/app/styles/footer.module.css'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail, IoLocationSharp, IoLogoWhatsapp, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import Image from 'next/image'


const Footer = () => {

  // const router = useRouter();
  // const { pathname } = router

  useEffect(() => {
    function animation() {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 999px)", () => {
        gsap.set(`.${styles.footer_container}`, { yPercent: -120 })

        const uncover = gsap.timeline({ paused: true })

        uncover
          .to(`.${styles.footer_container}`, { yPercent: 0, ease: 'none' })
          ;

        ScrollTrigger.create({
          trigger: `.${styles.footer_container}`,
          start: 'top 80%',
          end: '+=100%',
          animation: uncover,
          scrub: true,
        })

      })
    }

  })

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer_container}>
          <div className="row g-2">
            <div className="col-lg-5 col-12">
              <Image width={1000} height={1000} src="/images/logo.png" className='img-fluid mb-3' alt="" />
              <form action="" className={styles.form_container}>
                <h5 className='mb-1'>Join our newsletter to stay up to date.</h5>
                <div className="d-flex align-items-center mb-3 mt-2">
                  <input type="email" className='email' id='email' placeholder='Enter your Email' />
                  <button type="submit" className="button2 ms-2">Subscribe</button>
                </div>
                <p>By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.</p>
              </form>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <h5>Usefull Links</h5>
              <ul>
                <li><Link href="">Home</Link></li>
                <li><Link href="">About</Link></li>
                <li><Link href="">Services</Link></li>
                <li><Link href="">Uses</Link></li>
                <li><Link href="">Contact Us</Link></li>
                <li><Link href="">Order</Link></li>
                <li><Link href="">Privacy</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <h5>Products</h5>
              <ul>
                <li><Link href="">HR/HRPO</Link></li>
                <li><Link href="">CR/CRCA</Link></li>
                <li><Link href="">GI</Link></li>
                <li><Link href="">PPGI</Link></li>
                <li><Link href="">PMP Plates</Link></li>
                <li><Link href="">M.S. Structure</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-12 pe-lg-3">
              <h5>Get in Touch</h5>
              <ul>
                <li><Link href="tel:+919510215623">+91 95102 15623</Link></li>
                <li><Link href="mailto:info@vmetalsolutions.com">info@vmetalsolutions.com</Link></li>
                <li><Link href="mailto:sales@vmetalsolutions.com">sales@vmetalsolutions.com</Link></li>
                <li><Link href="">523, First Floor, Road No. 14, Kathwada G.I.D.C., Kathwada, Ahmedabad- 382430</Link></li>
              </ul>
              <ul className={styles.socialMedia}>
                <li><Link href=""><IoLogoWhatsapp className={styles.socialIcon} /></Link></li>
                <li><Link href=""><IoLogoInstagram className={styles.socialIcon} /></Link></li>
                <li><Link href=""><IoLogoLinkedin className={styles.socialIcon} /></Link></li>
              </ul>
            </div>
          </div>
          <p className={styles.copywrite}>Copyright © 2024 | All Rights Reserved by V Metal Solutions Developed By <Link href="https://www.webify.ai/" target='_blank'>Webify.Ai</Link></p>
        </div>
      </footer>
    </>
  )
}

export default Footer


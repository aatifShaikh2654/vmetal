'use client'
import React from 'react'
import styles from '../app/styles/navbar.module.css'
import { IoCloseOutline } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMail, IoLocationSharp, IoLogoWhatsapp, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";

const Menu = ({ menu, setMenu }) => {

    const pathname = usePathname();


    return (
        <>
            <div className={`${styles.menu} ${menu ? styles.active : null}`}>
                <div className={styles.overlay} onClick={() => setMenu(false)}></div>
                <div className={styles.menu_content}>
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        <IoCloseOutline onClick={() => setMenu(false)} className={styles.close} />
                    </div>
                    <div className={styles.menu_links}>
                        <ul>
                            <li><Link scroll={true} className={pathname === "/" ? styles.active : null} href={"/"} onClick={() => setMenu(false)}>Home</Link></li>
                            <li><Link scroll={true} className={pathname === "/about" ? styles.active : null} href={"/about"} onClick={() => setMenu(false)}>About Us</Link></li>
                            <li><Link scroll={true} className={pathname === "/uses" ? styles.active : null} href={"/uses"} onClick={() => setMenu(false)}>Uses</Link></li>
                            <li><Link scroll={true} className={pathname === "/order" ? styles.active : null} href={"/inquiry"} onClick={() => setMenu(false)}>Inquiry</Link></li>
                            <li><Link scroll={true} className={pathname === "/products" ? styles.active : null} href={"/products"} onClick={() => setMenu(false)}>Products</Link></li>
                            <li><Link scroll={true} className={pathname === "/services" ? styles.active : null} href={"/services"} onClick={() => setMenu(false)}>Services</Link></li>
                            <li><Link scroll={true} className={pathname === "/contactus" ? styles.active : null} href={"/contactus"} onClick={() => setMenu(false)}>Contact Us</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Menu

// <div className={styles.menu_bottom}>
//                         <div className={styles.social_media}>
//                             <Link href="" ><IoLogoWhatsapp className={styles.socialIcon} /></Link>
//                             <Link href="" ><IoLogoInstagram className={styles.socialIcon} /></Link>
//                             <Link href="" ><IoLogoLinkedin className={styles.socialIcon} /></Link>
//                         </div>
//                         <div className='d-flex flex-column' style={{ gap: "5px" }}>
//                             <Link href="mailto:info@vmetalsolutions.com">info@vmetalsolutions.com</Link>
//                             <Link href="tel:+919510215623">+91 95102 15623</Link>
//                         </div>
//                     </div>
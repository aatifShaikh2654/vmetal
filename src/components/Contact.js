'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/contact.module.css'
import Image from 'next/image'
import { HiOutlinePhone } from "react-icons/hi";
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';


const Contact = () => {

    const [focus, setFocus] = useState(Array(5).fill(false));

    const handleFocus = (index, e) => {
        const value = e.target.value;
        const array = [...focus]
        array[index] = value !== '' ? true : false;
        setFocus(array)
    }

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger);
        // Function to create ScrollTrigger for a given row selector with delay
        function createScrollTrigger(rowSelector, item, sensitivity, duration) {
            var translateSetter = gsap.quickSetter(rowSelector + item, "y", "px");
            var proxy = { y: 0 };

            ScrollTrigger.create({
                trigger: rowSelector,
                start: "top 10%",
                end: "bottom 50%+=100px",
                onUpdate: self => {
                    var translateY = self.getVelocity() / sensitivity; // Adjust the sensitivity
                    if (Math.abs(translateY) > Math.abs(proxy.y)) {
                        proxy.y = translateY;
                        gsap.to(proxy, {
                            y: 0,
                            duration: duration, // Adjust the duration
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => translateSetter(proxy.y)
                        });
                    }
                }
            });

            gsap.set(rowSelector + item, {
                transformOrigin: "center center",
                force3d: true
            });
        }

        // Apply to both rows with different parameters
        // createScrollTrigger(".scroll-section .images-1", -100, 1); // Row 1: sensitivity -10, duration 1s
        createScrollTrigger(`.${styles.component}`, ` .${styles.image}`, -150, 1.5);
        createScrollTrigger(`.${styles.component}`, ` .${styles.form_container}`, 150, 1.5);
    })

    return (
        <>
            <div className={styles.component}>
                <div className="container-fluid padd-x mb-2">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className={styles.image}>
                                <h2>Get a Quote</h2>
                                <Image width={1000} height={1000} src="/images/contact.jpg" className='img-fluid' alt='' />
                                <div className="d-flex align-items-start">
                                    <HiOutlinePhone className={styles.icon} />
                                    <div className='d-flex flex-column align-items-start'>
                                        <h5>Contact us</h5>
                                        <Link href={"tel:+919510215623"}>+91 95102 15623</Link>
                                        <Link href={"mailto:info@vmetalsolutions.com"}>info@vmetalsolutions.com</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className={styles.form_container}>
                                <h3>Get in touch here.</h3>
                                <div className="input-field">
                                    <input type="text" className='name' onChange={(e) => { handleFocus(0, e) }} name='name' />
                                    <label htmlFor="name" className={focus[0] ? 'on-focus' : null}>Name</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" className='email' onChange={(e) => { handleFocus(1, e) }} name='email' />
                                    <label htmlFor="email" className={focus[1] ? 'on-focus' : null}>Email</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" className='phone' maxLength={10} onChange={(e) => { handleFocus(2, e) }} name='phone' />
                                    <label htmlFor="phone" className={focus[2] ? 'on-focus' : null}>Phone Number</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" className='subject' onChange={(e) => { handleFocus(3, e) }} name='subject' />
                                    <label htmlFor="subject" className={focus[3] ? 'on-focus' : null}>Subject</label>
                                </div>
                                <div className="input-field">
                                    <textarea rows={4} name='message' id='message' onChange={(e) => { handleFocus(4, e) }} />
                                    <label htmlFor="message" className={focus[4] ? 'on-focus' : null}>Message</label>
                                </div>
                                <div className="d-flex align-items-start">
                                    <label className="checkBox">
                                        <input id="ch1" type="checkbox" />
                                        <div className="transition"></div>
                                    </label>
                                    <p>By submitting this form, you confirm that you have read and agree to V Metal Solutions <Link href={""}>Privacy Statement</Link>.</p>
                                </div>
                                <div className="mt-3">
                                    <button type='submit' className='button'>Send Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact

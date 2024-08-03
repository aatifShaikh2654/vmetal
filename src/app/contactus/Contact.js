'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/contact.module.css'
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { BiMap } from "react-icons/bi";
import { HiOutlinePhone } from "react-icons/hi";


const Contact = () => {

    const [focus, setFocus] = useState(Array(5).fill(false));
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });


    const handleFocus = (index, e) => {
        const value = e.target.value;
        const array = [...focus]
        array[index] = value !== '' ? true : false;
        setFocus(array)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
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
        createScrollTrigger(`.${styles.contact} .${styles.content}`, ` span`, -200, 3);
        createScrollTrigger(`.${styles.contact} .${styles.content}`, ` h1`, -200, 3);
        createScrollTrigger(`.${styles.contact} .${styles.content}`, ` p`, -200, 3);
        createScrollTrigger(`.${styles.contact} .${styles.form_container}`, ` .input-field`, 200, 3);
        createScrollTrigger(`.${styles.contact} .${styles.form_container}`, ` .d-flex`, 200, 3);
        createScrollTrigger(`.${styles.contact} .${styles.form_container}`, ` .button`, 200, 3);
        createScrollTrigger(`.${styles.contact}`, ` .${styles.address}`, -200, 3);
        createScrollTrigger(`.${styles.contact}`, ` .${styles.map}`, 200, 3);
    })

    return (
        <>
            <div className={`${styles.contact} padd-x`}>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className={`${styles.item} ${styles.address}`}>
                            <div className={styles.item_content}>
                                <h2>Address</h2>
                                <div className="d-flex flex-column">
                                    <Link href={"https://maps.app.goo.gl/exQQKfuGKcZnjzPi8"}>
                                        <BiMap className={styles.icon} />
                                        <p>523, First Floor, Road No. 14, Kathwada G.I.D.C., Kathwada, Ahmedabad, Gujarat, India, 382430</p>
                                    </Link>
                                    <Link href={"tel:+919510215623"}>
                                        <HiOutlinePhone className={styles.icon} />
                                        <p>+91 95102 15623</p>
                                    </Link>
                                </div>
                            </div>
                            <svg className={styles.asset} width="332" height="258" viewBox="0 0 332 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M222.019 0L147.842 75.6216L184.861 113.377L222.009 75.4997L407.205 264.325L444.234 226.57L222.019 0Z" fill="#103769"></path>
                                <path d="M110.843 119.365L-0.234375 232.62L36.7947 270.375L110.843 194.865L184.742 270.212L221.801 232.427L110.843 119.365Z" fill="#103769"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className={`${styles.item} ${styles.map}`}>
                            <div className={styles.item_content}>
                                <iframe className={styles.map_inner} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.860189027688!2d72.68000687412913!3d23.028905116094105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e870f7682eea3%3A0x8520939c289f701e!2sV%20Metal%20Solutions%20inc!5e0!3m2!1sen!2sin!4v1722621135856!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            <svg className={styles.asset} width="332" height="258" viewBox="0 0 332 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M222.019 0L147.842 75.6216L184.861 113.377L222.009 75.4997L407.205 264.325L444.234 226.57L222.019 0Z" fill="#103769"></path>
                                <path d="M110.843 119.365L-0.234375 232.62L36.7947 270.375L110.843 194.865L184.742 270.212L221.801 232.427L110.843 119.365Z" fill="#103769"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className={styles.content}>
                            <span>Contact Us</span>
                            <h1>Let&apos;s Build Something Great Together!</h1>
                            <p>When it comes to steel, we&apos;re your trusted partner. Whether placing an order, discussing a custom project, or asking a question, we&apos;re here to help. </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className={styles.form_container}>
                            <div className="input-field">
                                <input type="text" className='name' onChange={(e) => { handleFocus(0, e); handleChange(e) }} name='name' />
                                <label htmlFor="name" className={focus[0] ? 'on-focus' : null}>Name</label>
                            </div>
                            <div className="input-field">
                                <input type="text" className='email' onChange={(e) => { handleFocus(1, e); handleChange(e) }} name='email' />
                                <label htmlFor="email" className={focus[1] ? 'on-focus' : null}>Email</label>
                            </div>
                            <div className="input-field">
                                <input type="text" className='phone' onChange={(e) => { handleFocus(2, e); handleChange(e) }} name='phone' />
                                <label htmlFor="phone" className={focus[2] ? 'on-focus' : null}>Phone Number</label>
                            </div>
                            <div className="input-field">
                                <input type="text" className='subject' onChange={(e) => { handleFocus(3, e); handleChange(e) }} name='subject' />
                                <label htmlFor="subject" className={focus[3] ? 'on-focus' : null}>Subject</label>
                            </div>
                            <div className="input-field">
                                <textarea name="message" id="message" rows={4} onChange={(e) => { handleFocus(4, e); handleChange(e) }} />
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
        </>
    )
}

export default Contact

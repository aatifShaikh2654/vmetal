'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/styles/inquiry.module.css'
import { HiChevronDown } from "react-icons/hi";
import Link from 'next/link';
import { HiOutlinePhone } from "react-icons/hi";
import { IoMailOutline } from "react-icons/io5";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const Inquiry = () => {

    const [drop, setDrop] = useState(Array(5).fill(false));
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [service, setService] = useState('');
    const dropdownRefs = useRef([]);


    const handleOpen = (index) => {
        const array = [...drop]
        array[index] = !array[index]
        setDrop(array)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current.every(ref => ref && !ref.contains(event.target))) {
                setDrop(Array(5).fill(false));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setDrop]);


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
        createScrollTrigger(`.${styles.inquiry}`, ` .${styles.content}`, -150, 1.5);
        createScrollTrigger(`.${styles.inquiry}`, ` .col-lg-8`, 150, 1.5);
    })





    return (
        <>
            <div className="container-fluid padd-x">
                <div className={styles.inquiry}>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <div className={styles.content}>
                                <h1>Send us a Message</h1>
                                <Link href={"tel:+9510215623"}>
                                    <HiOutlinePhone className={styles.icon} />
                                    <span>+91 95102 15623</span>
                                </Link>
                                <Link href={"mailto:info@vmetalsolutions.com"}>
                                    <IoMailOutline className={styles.icon} />
                                    <span>info@vmetalsolutions.com</span>
                                </Link>
                                <Link href={"mailto:info@vmetalsolutions.com"}>
                                    <IoMailOutline className={styles.icon} />
                                    <span>sales@vmetalsolutions.com</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className={styles.form_container}>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" placeholder='First Name' className='first_name' id='first_name' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" placeholder='Last Name' className='last_name' id='last_name' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" placeholder='Email Address' className='email' id='email' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input type="text" placeholder='Phone Number' className='phone' id='phone' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="products">Products</label>
                                            <div className={`dropDown ${drop[0] ? "active" : null}`} ref={el => (dropdownRefs.current[0] = el)}>
                                                <div className={`select ${product !== '' ? 'active' : null}`} onClick={() => { handleOpen(0) }}>
                                                    <span>{product ? product : "Select a Product"}</span><HiChevronDown className='drop-icon' />
                                                </div>
                                                <ul>
                                                    <li onClick={() => { handleOpen(0); setProduct('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(0); setProduct('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(0); setProduct('HRPO') }}>HRPO</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="phone">Category</label>
                                            <div className={`dropDown ${drop[1] ? "active" : null}`} ref={el => (dropdownRefs.current[1] = el)}>
                                                <div className={`select ${category !== '' ? 'active' : null}`} onClick={() => { handleOpen(1) }}>
                                                    <span>{category ? category : "Select a Category"}</span><HiChevronDown className='drop-icon' />
                                                </div>
                                                <ul>
                                                    <li onClick={() => { handleOpen(1); setCategory('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(1); setCategory('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(1); setCategory('HRPO') }}>HRPO</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="weight">Weight</label>
                                            <input type="text" placeholder='Weight in (mt)' className='weight' id='weight' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="phone">Services</label>
                                            <div className={`dropDown ${drop[2] ? "active" : null}`} ref={el => (dropdownRefs.current[2] = el)}>
                                                <div className={`select ${service !== '' ? 'active' : null}`} onClick={() => { handleOpen(2) }}>
                                                    <span>{service ? service : "Select a Service"}</span><HiChevronDown className='drop-icon' />
                                                </div>
                                                <ul>
                                                    <li onClick={() => { handleOpen(2); setService('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(2); setService('HRPO') }}>HRPO</li>
                                                    <li onClick={() => { handleOpen(2); setService('HRPO') }}>HRPO</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="ctl">Cut-to-length</label>
                                            <input type="text" placeholder='Length in (mm)' className='ctl' id='ctl' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="width">Width</label>
                                            <input type="text" placeholder='Width in (mm)' className='width' id='width' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="input-field2">
                                            <label htmlFor="thickness">Thickness</label>
                                            <input type="text" placeholder='Thickness in (mm)' className='thickness' id='thickness' />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field2">
                                            <label htmlFor="message">Message</label>
                                            <textarea name="message" id="message" placeholder='message' rows={4} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field2">
                                            <label htmlFor="Attachments">Attachments</label>
                                            <input type="file" placeholder='Attachments' className='Attachments' id='Attachments' />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type='button' className='button2 me-2 rounded-0'>E Brochure</button>
                                        <button type='submit' className='button'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inquiry

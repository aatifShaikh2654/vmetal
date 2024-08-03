'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import React from 'react';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { IoIosArrowRoundDown } from "react-icons/io";

const Herosection = () => {

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
        createScrollTrigger(".herosection .content", " .head", -100, 1);
        createScrollTrigger(".herosection .content", " p", -100, 1);
        createScrollTrigger(".herosection .content", " .button", -100, 1);
        createScrollTrigger(".herosection .images", " .img1", -100, 1);
        createScrollTrigger(".herosection .images", " .img2", 100, 1);
        createScrollTrigger(".herosection", " .asset", -100, 1);
    })

    return (
        <>
            <div className="herosection container-fluid padd-x">
                <div className="asset">
                    <Image width={1000} height={1000} src="/images/asset1.avif" className='img-fluid' alt='' />
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="content">
                            <h1 className='head'>Forging the Future of Steel Innovation</h1>
                            <p>Forging steel&apos;s future means pioneering sustainable technologies, enhancing strength, and revolutionizing industrial applications for resilience.</p>
                            <div className="mt-3">
                                <Link href="" className='button'>Read More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="images">
                            <Image width={1000} height={1000} src="/images/steel2.jpg" className='img1 img-fluid' alt="" />
                            <Image width={1000} height={1000} src="/images/ourProducts.jpg" className='img2 img-fluid' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Herosection;

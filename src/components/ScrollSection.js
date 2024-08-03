'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaPlus } from "react-icons/fa";


const ScrollSection = () => {

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger);
        // Function to create ScrollTrigger for a given row selector with delay
        function createScrollTrigger(rowSelector, sensitivity, duration) {
            var translateSetter = gsap.quickSetter(rowSelector + " .img", "y", "px");
            var proxy = { y: 0 };

            ScrollTrigger.create({
                trigger: rowSelector,
                start: "top 80%",
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

            gsap.set(rowSelector + " .img", {
                transformOrigin: "center center",
                force3d: true
            });
        }

        // Apply to both rows with different parameters
        createScrollTrigger(".scroll-section .images-1", -100, 1); // Row 1: sensitivity -10, duration 1s
        createScrollTrigger(".scroll-section .images-2", 100, 1);
 
    })



    return (
        <>
            <div className="container-fluid section-1 padd-x">
                <div className="row align-items-start">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="section-content">
                            <div className="d-flex align-items-center mb-2" style={{ gap: "10px" }}>
                                <FaPlus className='section-icon' />
                                <hr className='section-line' />
                            </div>
                            <h3>Reliability: Guaranteed</h3>
                            <p>We respond to any production need with great speed. At V Metal Solutions Inc, just-in-time delivery is integral to our philosophy.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="section-content">
                            <div className="d-flex align-items-center mb-2" style={{ gap: "10px" }}>
                                <FaPlus className='section-icon' />
                                <hr className='section-line' />
                            </div>
                            <h3>Cutting-edge Technology</h3>
                            <p>Cutting-edge technology at V Metal Solutions Inc forms the basis of all its services. Whether cutting to length, profiling, corrugation, slitting, or roll development at V Metal Solutions Inc, we ensure the highest standards are adhered to at every level.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="section-content">
                            <div className="d-flex align-items-center mb-2" style={{ gap: "10px" }}>
                                <FaPlus className='section-icon' />
                                <hr className='section-line' />
                            </div>
                            <h3>Delivery on-time</h3>
                            <p>We deliver to our customers as per the commitment which helps them to grow with us.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="padd-x">
                <div className="container-fluid scroll-section px-0">
                    <div className="row align-items-start">
                        <div className="col-lg-6">
                            <div className="scroll-content">
                                <h2>V Metal Solutions Inc was established in 2020 and successfully caters to its customers with its products and services.</h2>
                                <p>We contribute to Steel manufacturing and merchanting, which highly contribute to different functions by giving their customers mild steel sheets, coils, slitted coils, and corrugated sheets as per their requirements and specifications.</p>
                                <div className="d-flex align-items-center">
                                    <Link href="" className='button'>Know More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="images">
                                <div className="images-1">
                                    <Image width={1000} height={1000} src="/images/ourProducts.jpg" className='img img-fluid' alt="" />
                                    <Image width={1000} height={1000} src="/images/services.jpg" className='img img-fluid' alt="" />
                                </div>
                                <div className="images-2">
                                    <Image width={1000} height={1000} src="/images/product1.png" className='img img-fluid' alt="" />
                                    <Image width={1000} height={1000} src="/images/home1.jpg" className='img img-fluid' alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScrollSection

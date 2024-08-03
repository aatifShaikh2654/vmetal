'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/styles/productSlide.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Link from 'next/link'
import Image from 'next/image'


const ProductSlide = ({products}) => {

    const buttonLeftRef = useRef(null);
    const buttonRightRef = useRef(null);

    const initializeAnimations = () => {
        gsap.registerPlugin(Draggable);

        let target = 0;
        let current = 0;
        const ease = 0.075;
        const scrollStep = 400; // Adjust this value for button scroll amount

        const slider = document.querySelector(`.${styles.slider}`);
        const wrapper = slider.querySelector(`.${styles.slider_wrapper}`);
        const slides = wrapper.querySelectorAll(`.${styles.slide}`);

        let maxScroll = wrapper.scrollWidth / 2.6;

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function updateScaleAndPosition() {
            const viewportWidth = window.innerWidth;
            slides.forEach((slide) => {
                const rect = slide.getBoundingClientRect();
                const centerPosition = (rect.left + rect.right) / 2;
                const distanceFromCenter = centerPosition - viewportWidth / 2;

                let scale, offsetX;
                const isSmallScreen = window.innerWidth <= 768;

                if (distanceFromCenter > 0) {
                    scale = isSmallScreen
                        ? Math.min(1.25, 1 + distanceFromCenter / viewportWidth)  // Reduced max scale for small screens
                        : Math.min(1.7, 1 + distanceFromCenter / viewportWidth);
                    offsetX = (scale - 1) * (viewportWidth * 0.1); // Adjust scaling effect
                } else {
                    scale = isSmallScreen
                        ? Math.max(0.7, 1 - Math.abs(distanceFromCenter) / viewportWidth)  // Increased min scale for small screens
                        : Math.max(0.5, 1 - Math.abs(distanceFromCenter) / viewportWidth);
                    offsetX = 0;
                }

                gsap.set(slide, { scale: scale, x: offsetX });
            });
        }

        function update() {
            current = lerp(current, target, ease);

            // Adjust the target to center the last slide
            if (current >= maxScroll) {
                target = maxScroll;
                current = maxScroll;
            } else if (current < 0) {
                target = 0;
                current = 0;
            }

            gsap.set(wrapper, {
                x: -current,
            });

            updateScaleAndPosition();

            requestAnimationFrame(update);
        }

        function handleScroll(e) {
            const sliderRect = slider.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sliderTop = sliderRect.top;
            const sliderBottom = sliderRect.bottom;

            if (sliderTop < windowHeight && sliderBottom > 0) {
                target += e.deltaY;
                target = Math.max(0, target);
                target = Math.min(maxScroll, target);
            }
        }

        function slideLeft() {
            target -= scrollStep;
            target = Math.max(0, target);
        }

        function slideRight() {
            target += scrollStep;
            target = Math.min(maxScroll, target);
        }

        window.addEventListener("resize", () => {
            maxScroll = wrapper.scrollWidth / 2.6;
        });

        window.addEventListener("wheel", handleScroll);

        Draggable.create(wrapper, {
            type: "x",
            bounds: { minX: -maxScroll, maxX: 0 },
            inertia: true,
            onDrag: function () {
                target = -this.x;
            },
            onThrowUpdate: function () {
                target = -this.x;
            },
        });

        buttonLeftRef.current.addEventListener('click', slideLeft);
        buttonRightRef.current.addEventListener('click', slideRight);

        update();

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("resize", () => maxScroll = wrapper.scrollWidth / 2.6);
            window.removeEventListener("wheel", handleScroll);
            buttonLeftRef.current.removeEventListener('click', slideLeft);
            buttonRightRef.current.removeEventListener('click', slideRight);
        };
    }

    useEffect(() => {
        initializeAnimations();
    })


    return (
        <>
            <div className={styles.products}>
                <div className={`${styles.content} padd-x`}>
                    <div className={styles.inner_content}>
                        <h2>Our Products</h2>
                        <p>Durable, reliable, and versatile, our steel products meet your every need, ensuring superior quality and performance in every application.</p>
                    </div>
                    <div className={styles.btns}>
                        <button ref={buttonLeftRef}>
                            <svg className={styles.circleButton__circle}>
                                <rect x="0.75" y="0.75" rx="1.5" width="1.5" height="1.5"></rect>
                                <rect x="0.75" y="0.75" rx="1.5" width="1.5" height="1.5"></rect>
                            </svg>
                            <IoIosArrowRoundBack className={styles.btnIcon} />
                        </button>
                        <button ref={buttonRightRef}>
                            <svg className={styles.circleButton__circle}>
                                <rect x="0.75" y="0.75" rx="1.5" width="1.5" height="1.5"></rect>
                                <rect x="0.75" y="0.75" rx="1.5" width="1.5" height="1.5"></rect>
                            </svg>
                            <IoIosArrowRoundForward className={styles.btnIcon} />
                        </button>
                    </div>
                </div>
                <div className={styles.slider}>
                    <div className={styles.slider_wrapper}>
                        {products.map((item, index) => {
                            return <Link href={`/products/${item.attributes.slug}`} passHref key={index} className={styles.slide}>
                                <h4>{item.attributes.name}</h4>
                                <Image width={1000} height={1000} src={`https://api.vmetalsolutions.com` + item.attributes.image.data[0].attributes.url} className='img-fluid' alt="" />
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSlide


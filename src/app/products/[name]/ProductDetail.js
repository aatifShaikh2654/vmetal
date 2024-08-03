'use client'
import styles from '@/app/styles/detail.module.css'
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import Markdown from "react-markdown";
import Brands from '@/components/Brands';

const ProductDetail = ({ products }) => {

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
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` h1`, -200, 2.5);
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` p`, -240, 3);
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` .button`, -240, 3);
        createScrollTrigger(`.${styles.content_container}`, ` span`, -240, 3);
        createScrollTrigger(`.${styles.content_container}`, ` h4`, -240, 3);
        createScrollTrigger(`.${styles.content_container}`, ` img`, 200, 2.5);
        createScrollTrigger(`.${styles.content_container}`, ` p`, -200, 2.5);
    })


    return (
        <>
            <div className="container-fluid padd-x">
                <div className={styles.hero}>
                    <div className={styles.asset}>
                        <Image width={1000} height={1000} src="/images/asset2.avif" className='img-fluid' alt='' />
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12 p-0" style={{ height: "auto" }}>
                            <div className={styles.content}>
                                <h1>{products.attributes && products.attributes.title1}</h1>
                                <p>{products.attributes && products.attributes.subtitle1}</p>
                                <Link href="" className='button'>Order now</Link>
                            </div>
                        </div>
                        <div className="col-lg-7 col-12 p-0 position-relative z-1">
                            <div className={styles.content_img}>
                                {products.attributes ? <Image width={1000} height={1000} src={`https://api.vmetalsolutions.com` + products.attributes.image.data[0].attributes.url} className='img-fluid' alt='' /> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content_container}>
                    <span>{products.attributes && products.attributes.title2}</span>
                    <h4>{products.attributes && products.attributes.title3}</h4>
                    <div className="row my-3 mt-5">
                        <div className="col-lg-4 col-12">
                            {products.attributes ? <Image width={1000} height={1000} src={'https://api.vmetalsolutions.com' + products.attributes.coverImage.data.attributes.url} className='img-fluid' alt='' /> : null}
                        </div>
                        <div className="col-lg-8 col-12 mt-lg-0 mt-3">
                            <Markdown>{products.attributes && products.attributes.newDescription}</Markdown>
                        </div>
                    </div>
                </div>


                <Brands subtitle={"Brands Supplied"} />

            </div>
        </>
    )
}

export default ProductDetail

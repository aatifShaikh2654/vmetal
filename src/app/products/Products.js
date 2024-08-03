'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/product.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ProductCard from '@/components/ProductCard'
import axios from 'axios'

const Products = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await axios.get(`https://api.vmetalsolutions.com/api/products?populate=*`, {
            method: "GET",
        });
        const data = response.data.data;
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

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
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` h1`, -200, 3);
        createScrollTrigger(`.${styles.hero} .${styles.content}`, " p", -230, 4);
        createScrollTrigger(`.${styles.hero}`, ` .${styles.para}`, -200, 3);
        createScrollTrigger(`.${styles.hero}`, " .img1", -200, 3);
        createScrollTrigger(`.${styles.hero}`, " .img2", 200, 3);

    })

    return (
        <>
            <div className={styles.products}>
                <div className="container-fluid p-0">
                    <div className={styles.hero}>
                        <div className={styles.hero_left}>
                            <div className={styles.image}>
                                <Image width={1000} height={1000} src="/images/ourProducts1.jpg" className='img-fluid' alt="" />
                            </div>
                            <p className={styles.para}> Mainly the mild steel products (CR/CRCA, HR/HRPO, GP/GI, PPGI/PPGL, PMP, Z/C Purlin) are manufactured in various forms and are delivered to various companies.</p>
                        </div>
                        <div className={styles.hero_right}>
                            <div className={styles.content}>
                                <h1>Quality Steel for Every Construction Project</h1>
                                <p>V Metal Solutions Inc of Steel is manufacturing and merchanting highly contributes to various processes by giving their customers mild steel sheets, coils, slitted coils and corrugated sheets as per their requirements and specifications.</p>
                                <div className="row g-4">
                                    <div className="col-7">
                                        <Image width={1000} height={1000} src='/images/product1.png' className='img1 img-fluid' style={{ marginTop: "10px" }} alt='' />
                                    </div>
                                    <div className="col-5">
                                        <Image width={1000} height={1000} src="/images/services.jpg" className='img2 img-fluid' style={{ marginTop: "-20px" }} alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid padd-x d-flex align-items-center justify-content-center">
                    <div className={styles.product_list}>
                        <h2>Our Products</h2>
                        <div className="row g-4">
                            {products && products.map((item, index) => {
                                return <div key={index} className="col-lg-4 col-sm-6 col-12">
                                    <ProductCard data={item} category={"products"} />
                                </div>
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Products

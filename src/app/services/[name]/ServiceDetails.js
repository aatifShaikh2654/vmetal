'use client'
import axios from 'axios';
import styles from '@/app/styles/detail.module.css'
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import Markdown from "react-markdown";

const ServiceDetails = ({ data }) => {



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
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` h1`, -200, 2);
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` p`, -200, 2);
        createScrollTrigger(`.${styles.hero} .${styles.content}`, ` .button`, -200, 2);
        createScrollTrigger(`.${styles.content_container}`, ` span`, -220, 3);
        createScrollTrigger(`.${styles.content_container}`, ` h4`, -220, 3);
        createScrollTrigger(`.${styles.content_container}`, ` img`, 200, 3);
        createScrollTrigger(`.${styles.content_container}`, ` .${styles.para}`, -200, 3);
        createScrollTrigger(`.${styles.content_container}`, ` .${styles.table}`, -200, 3);
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
                                <h1>{data.attributes && data.attributes.title1}</h1>
                                <p>{data.attributes && data.attributes.subtitle1}</p>
                                <Link href="" className='button'>Order now</Link>
                            </div>
                        </div>
                        <div className="col-lg-7 col-12 p-0 position-relative z-1">
                            <div className={styles.content_img}>
                                {data.attributes ? <Image width={1000} height={1000} src={`https://api.vmetalsolutions.com` + data.attributes.image.data[0].attributes.url} className='img-fluid' alt='' /> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content_container}>
                    <span>{data.attributes && data.attributes.title3}</span>
                    <h4>{data.attributes && data.attributes.title2}</h4>
                    <div className="row my-3 mt-5">
                        <div className="col-lg-4 col-12">
                            {data.attributes ? <Image width={1000} height={1000} src={'https://api.vmetalsolutions.com' + data.attributes.coverImage.data[0].attributes.url} className='img-fluid' alt='' /> : null}
                        </div>
                        <div className="col-lg-8 col-12 mt-lg-0 mt-3">
                            <div className={styles.para}>
                                <Markdown>{data.attributes && data.attributes.newDescription}</Markdown>
                            </div>
                            <div className={styles.table} >
                                <table>
                                    <tbody>
                                        <th>Material Specification</th>
                                        <th></th>
                                        <tr>
                                            <td><p>Material</p></td>
                                            <td><p>{data.attributes && data.attributes.material}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Thickness</p></td>
                                            <td><p>{data.attributes && data.attributes.thickness}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.table} >
                                <table>
                                    <tbody>
                                        <th>INPUT COIL SPECIFICATION</th>
                                        <th></th>
                                        <tr>
                                            <td><p>Coil Outer Diameter</p></td>
                                            <td><p>{data.attributes && data.attributes.coilOuterDiameter}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Coil Inner Diameter</p></td>
                                            <td><p>{data.attributes && data.attributes.coilInnerDiameter}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Max Coil Weight</p></td>
                                            <td><p>{data.attributes && data.attributes.maxCoilWeight}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Coil Width (Cut to length line)</p></td>
                                            <td><p>{data.attributes && data.attributes.coilWidth}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.table} >
                                <table>
                                    <tbody>
                                        <th>OUTPUT SHEET SPECIFICATION</th>
                                        <th></th>
                                        <tr>
                                            <td><p>Stacker Capacity</p></td>
                                            <td><p>{data.attributes && data.attributes.stackerCapacity}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Sheet Length Min</p></td>
                                            <td><p>{data.attributes && data.attributes.sheetLengthMin}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Sheet Length Max</p></td>
                                            <td><p>{data.attributes && data.attributes.sheetLengthMax}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Accuracy</p></td>
                                            <td><p>{data.attributes && data.attributes.accuracy}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ServiceDetails

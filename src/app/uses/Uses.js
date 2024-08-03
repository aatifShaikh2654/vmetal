'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/uses.module.css'
import Image from 'next/image'
import axios from 'axios'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const Uses = () => {

    const [uses, setUses] = useState([]);

    const getUses = async () => {
        const response = await axios.get(`https://api.vmetalsolutions.com/api/uses?populate=*`, {
            method: "GET",
        });
        const data = response.data.data;
        setUses(data)
    }

    useEffect(() => {
        getUses();
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
        createScrollTrigger(`.${styles.uses}`, " h1", -200, 3);
        createScrollTrigger(`.${styles.uses}`, " p", -200, 3);
        createScrollTrigger(`.${styles.uses}`, " h4", -200, 3);
        createScrollTrigger(`.${styles.uses}`, " img", -200, 3);
        createScrollTrigger(`.${styles.uses} ul`, " li", -200, 3);
    })


    return (
        <>
            <div className={`${styles.uses} padd-x`}>
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <h1>Uses of Mild Steel</h1>
                        <p>The major application of mild steel is in the following industries.</p>
                        <h4>Applications of Mild Steel</h4>
                        <ul>
                            {uses && uses.map((item, index) => {
                                return <li key={index}>{item.attributes.use}</li>
                            })}
                        </ul>
                    </div>
                    <div className="col-lg-6 col-12">
                        <Image width={1000} height={1000} src="/images/uses.jpg" className='img-fluid' alt='' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Uses

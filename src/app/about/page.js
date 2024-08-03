'use client'
import React, { useEffect } from 'react'
import styles from '../styles/about.module.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

const page = () => {

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
    createScrollTrigger(`.${styles.about}`, ` .${styles.about_img}`, 100, 2); // Row 1: sensitivity -10, duration 1s
    createScrollTrigger(`.${styles.about}`, ` .${styles.about_content}`, -100, 2); // Row 1: sensitivity -10, duration 1s
    createScrollTrigger(`.${styles.about}`, ` .${styles.asset}`, 100, 2); // Row 1: sensitivity -10, duration 1s
    createScrollTrigger(`.${styles.why_container}`, ` .${styles.content}`, -100, 2); // Row 1: sensitivity -10, duration 1s
  }, [])


  return (
    <>
      <div className={`${styles.about} padd-x`}>
        <div className="row">
          <div className="col-md-7 col-12 order-md-0 order-1">
            <div className={styles.left_content}>
              <div className={styles.about_content}>
                <h1>About Us</h1>
                <p>V Metal Solutions Inc. is committed to providing our customers with the highest quality steel products and services. We are a leading steel supplying company in Ahmedabad, Gujarat, and we are proud to serve customers throughout Gujarat, Rajasthan, and Madhya Pradesh.</p>
              </div>
              <div className={styles.about_content}>
                <h2>V Metal Solutions Inc is established and operated by a female entrepreneur.</h2>
                <p>V Metal Solutions Inc's coil processing service Centre is in Ahmedabad, Gujarat. We are fully geared to process and cater to your needs as per your specifications and requirements.</p>
              </div>
              <div className={styles.asset}>
                <Image width={1000} height={1000} src="/images/onTime.jpg" className='img img-fluid' alt="" />
              </div>
            </div>
          </div>

          <div className="col-md-5 col-12 d-flex align-items-start justify-content-start order-md-1 order-0">
            <div className={styles.about_img}>
              <Image width={1000} height={1000} src="/images/aboutus.jpg" className='img img-fluid' alt="" />
            </div>
          </div>
        </div>

        <div className={`${styles.why_container}`}>
          <div className={styles.container_box}>
            <div className={styles.content}>
              <span>Why us ?</span>
              <h2>V Metal Solutions Inc was established in 2020 and successfully caters to its customers with its products and services.</h2>
              <p>We contribute to Steel manufacturing and merchanting, which highly contribute to different functions by giving their customers mild steel sheets, coils, slitted coils, and corrugated sheets as per their requirements and specifications</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default page

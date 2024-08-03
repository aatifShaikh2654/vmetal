'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/service.module.css'
import Image from 'next/image'
import product from '@/app/styles/product.module.css'
import ProductCard from '@/components/ProductCard'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import axios from 'axios'
import productPage from '@/app/styles/product.module.css'

const Services = () => {


  const [services, setServices] = useState([]);

  const getServices = async () => {
    const response = await axios.get(`https://api.vmetalsolutions.com/api/services?populate=*`, {
      method: "GET",
    });
    const data = response.data.data;
    setServices(data)
  }

  useEffect(() => {
    getServices();
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
    createScrollTrigger(`.${styles.service} .${styles.content}`, ` h1`, -100, 1);
    createScrollTrigger(`.${styles.service} .${styles.content}`, " p", -100, 1);
    createScrollTrigger(`.${styles.service}`, " .img1", 100, 1);
    createScrollTrigger(`.${styles.service}`, " .img2", -130, 1);
  })




  return (
    <>
      <div className={`${styles.service}`}>
        <div className="container-fluid p-0">
          <div className={productPage.hero}>
            <div className={productPage.hero_left}>
              <div className={productPage.image}>
                <Image width={1000} height={1000} src="/images/services1.jpg" className='img-fluid' alt="" />
              </div>
            </div>
            <div className={productPage.hero_right}>
              <div className={productPage.content}>
                <h1>Building with Premium Steel</h1>
                <p>We provide customised Mild Steel Flat Products as customers necessities, such as Cut-To-Length (CTL), Slitting Service, Profiling and Corrugation services and C/Z Purlin.</p>
                <div className="row g-4">
                  <div className="col-7">
                    <Image width={1000} height={1000} src='/images/ourProducts.jpg' className='img1 img-fluid' style={{ marginTop: "10px" }} alt='' />
                  </div>
                  <div className="col-5">
                    <Image width={1000} height={1000} src="/images/home1.jpg" className='img2 img-fluid' style={{ marginTop: "-20px" }} alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid d-flex align-items-center justify-content-center">
          <div className={product.product_list}>
            <h2>Our Services</h2>
            <div className="row g-4">
              {services.map((item, index) => {
                return <div key={index} className="col-lg-4 col-sm-6 col-12">
                  <ProductCard data={item} category={"services"} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services

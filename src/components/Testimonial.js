'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/testimonial.module.css'
import { FaUserCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const Testimonial = () => {

  const [reviews, setReviews] = useState([]);


  const getReviews = async () => {
    const response = await axios.get(`https://api.vmetalsolutions.com/api/reviews?populate=*`,);
    const data = response.data.data;
    setReviews(data);
  }

  useEffect(() => {
    getReviews();
  }, [])

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
    // Function to create ScrollTrigger for a given row selector with delay
    function createScrollTrigger(rowSelector, item, sensitivity, duration) {
      var translateSetter = gsap.quickSetter(rowSelector + item, "y", "px");
      var proxy = { y: 0 };

      ScrollTrigger.create({
        trigger: rowSelector,
        start: "top 50%",
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
    createScrollTrigger(`.${styles.testimonial}`, ` .${styles.asset}`, 100, .5);
  })

  return (
    <>
      <div className={`${styles.testimonial}`}>
        <div className={styles.asset}>
          <img src="/images/asset2.avif" className='img-fluid' alt="" />
        </div>
        <span className={styles.subhead}>Testimonial</span>
        <div className={styles.swiper_container}>
          <Swiper
            spaceBetween={30}
            className="mySwiper"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >

            {reviews && reviews.map((item, index) => {
              return <SwiperSlide key={index} className='d-flex justify-content-center align-items-center'>
                <div className={styles.slide}>
                  <p>"{item.attributes.description}"</p>
                  <div className={styles.user}>
                    {item.attributes.image ? <img src={item.attributes.image.data.attributes.url} alt={item.attributes.name} />
                      : <FaUserCircle className={styles.userImage} />}
                    <div>
                      <h5>{item.attributes.name}</h5>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Testimonial

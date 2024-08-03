'use client'
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from '../app/styles/brands.module.css';
import axios from 'axios';
import testimonial from '@/app/styles/testimonial.module.css'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const Brands = ({ subtitle }) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReview();
    }, [])

    const getReview = async () => {
        try {
            const response = await axios.get('https://api.vmetalsolutions.com/api/brands?populate=*', {
                method: "GET",
            })
            const data = response.data.data;
            setReviews(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.brands}>
            <div className="padd-x container-fluid my-3">
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <span className={`${testimonial.subhead}`}>{subtitle}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-1">
                    <div className={styles.wrapper}>
                        <Swiper
                            spaceBetween={40}
                            slidesPerView={3}
                            className="mySwiper2"
                            centeredSlides={true}
                            loop
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {reviews && reviews.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <Image width={1000} height={1000} src={`https://api.vmetalsolutions.com` + item.attributes.image.data[0].attributes.url} className='img-fluid' alt="" />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;

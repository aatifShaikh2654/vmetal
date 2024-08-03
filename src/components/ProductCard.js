import React from 'react'
import styles from '@/app/styles/product.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowRoundForward } from "react-icons/io";

const ProductCard = ({ data, category }) => {

    return (
        <>
            <Link href={`/${category == "services" ? "services" : "products"}/${data.attributes.slug}`} className={styles.item}>
                <div className={styles.image}>
                    <h4>{data.attributes.name}</h4>
                    <Image width={1000} height={1000} src={`https://api.vmetalsolutions.com` + data.attributes.image.data[0].attributes.url} className='img-fluid' alt='' />
                    <div className={styles.icon_cont}>
                        <IoIosArrowRoundForward className={styles.icon} />
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductCard

//    <div className={styles.content}>
//                     <div className='d-flex align-items-center'>
//                         <Link className='button me-2' href="">Know More</Link>
//                         <Link className='button me-2' href="">Inquiry</Link>
//                     </div>
//                 </div>
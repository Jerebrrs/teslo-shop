'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import { useState } from 'react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface Url {
    url: string
}
interface Props {
    images: Url[];
    title: string;
    className?: string;
}
export const ProductSlidesShow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();



    return (
        <div className={className}>
            <Swiper

                spaceBetween={10}
                navigation={true}
                autoplay={
                    {
                        delay: 2500
                    }
                }
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroy ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs,Autoplay]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            width={1024}
                            height={800}
                            src={`/products/${image.url}`}
                            alt={title}
                            className='rounded-lg object-fill'
                        />
                    </SwiperSlide>
                ))}


            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            width={300}
                            height={300}
                            src={`/products/${image.url}`}
                            alt={title}
                            className='rounded'
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    );
}

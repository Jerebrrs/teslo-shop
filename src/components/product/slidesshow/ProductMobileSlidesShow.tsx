'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


interface Url {
    url: string
}
interface Props {
    images: Url[];
    title: string;
    className?: string;
}
export const ProductMobileSlidesShow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100%',
                    height: '500px',

                }}
                pagination
                autoplay={
                    {
                        delay: 2500
                    }
                }
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            width={400}
                            height={300}
                            src={`/products/${image.url}`}
                            alt={title}
                            className='object-fill'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}

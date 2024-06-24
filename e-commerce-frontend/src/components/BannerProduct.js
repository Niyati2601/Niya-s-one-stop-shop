import React from 'react';
import Slider from 'react-slick';
import mobileImage1 from '../assets/banner/img1_mobile.jpg';
import mobileImage2 from '../assets/banner/img2_mobile.webp';
import mobileImage3 from '../assets/banner/img3_mobile.jpg';
import mobileImage4 from '../assets/banner/img4_mobile.jpg';
import mobileImage5 from '../assets/banner/img5_mobile.png';

import desktopImage1 from '../assets/banner/img1.webp';
import desktopImage2 from '../assets/banner/img2.webp';
import desktopImage3 from '../assets/banner/img3.jpg';
import desktopImage4 from '../assets/banner/img4.jpg';
import desktopImage5 from '../assets/banner/img5.webp';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
    <div
        className="slick-arrow slick-next"
        style={{ right: '10px', zIndex: '1', cursor: 'pointer' }}
        onClick={onClick}
    >
       
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="slick-arrow slick-prev"
        style={{ left: '10px', zIndex: '1', cursor: 'pointer' }}
        onClick={onClick}
    >
        
    </div>
);

const BannerProduct = () => {
    const desktopImages = [
        desktopImage1,
        desktopImage2,
        desktopImage3,
        desktopImage4,
        desktopImage5
    ];

    const mobileImages = [
        mobileImage1,
        mobileImage2,
        mobileImage3,
        mobileImage4,
        mobileImage5
    ];

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='flex justify-center mx-5 rounded-md shadow-2xl' style={{ backgroundColor: 'rgb(239, 224, 226)', color: 'rgb(56, 45, 94)' }}>
            {/* Desktop Version */}
            <div className='w-full hidden md:block'>
                <Slider {...settings}>
                    {desktopImages.map((image, index) => (
                        <div key={index} className='flex justify-center items-center'>
                            <img src={image} alt='' className='w-full h-64 object-fit' />
                        </div>
                    ))}
                </Slider>
            </div>
            {/* Mobile Version */}
            <div className='w-full md:hidden'>
                <Slider {...settings}>
                    {mobileImages.map((image, index) => (
                        <div key={index} className='flex justify-center items-center'>
                            <img src={image} alt='' className='w-full h-64 object-fit' />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BannerProduct;

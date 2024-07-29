import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image1 from '../images/home_slider/DJI_0406.JPG';
import image2 from '../images/home_slider/IMG_1121.JPG';
import image3 from '../images/home_slider/IMG_2015.JPG';
import image4 from '../images/home_slider/IMG_7133.JPG';

const images = [image1, image2, image3, image4];

export default function Home() {
  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay
        interval={5000}
        infiniteLoop
        showStatus={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="h-[800px] w-full object-cover z-1"/>
          </div>
        ))}
      </Carousel>
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-column">
            <h2 className="text-3xl font-bold mb-4">LUÔN TIN Ở KHẢ NĂNG CỦA MÌNH</h2>
            <p className="mb-4">
            “Bà muốn các con LUÔN TIN Ở KHẢ NĂNG CỦA MÌNH, chúng ta sinh ra mỗi người đều có khả năng khác nhau, khi tin ở chính mình các con sẽ làm được tất cả. Khi gặp khó khăn hãy nhẩm câu thần chú: “Tôi làm được” nhiều lần, điều kỳ diệu chắc chắn sẽ xảy ra.” […]</p>
            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="image-column">
            <img src={image3} alt="Description" className="w-full h-auto object-cover mb-4"/>
          </div>
        </div>
      </div>
    </div>
  );
}
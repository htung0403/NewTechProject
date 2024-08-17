import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image1 from '../images/home_slider/DJI_0406.JPG';
import image2 from '../images/home_slider/IMG_1121.JPG';
import image3 from '../images/home_slider/IMG_2015.JPG';
import image4 from '../images/home_slider/IMG_7133.JPG';
import background1 from '../images/background_card/IMG_0283.JPG'
import khoahocimg from '../images/khoahoc.png'
import line from '../images/line-min.png'
import PostCard from '../components/PostCard';

const images = [image1, image2, image3, image4];

export default function Home() {
  return (
    <div className='relative' >
      <Carousel
        showThumbs={false}
        autoPlay
        interval={3000}
        infiniteLoop
        showStatus={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="h-[700px] w-full object-cover z-1" loading='lazy'/>
          </div>
        ))}
      </Carousel>
      <div className='container absolute top-[610px] left-1/2 transform -translate-x-1/2 z-10 flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[70px]'>
          <div className='text-column h-[171px] w-full md:w-[400px] inset-0 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center outline-black' 
          style={{ backgroundImage: `linear-gradient(rgba(255, 0, 122, 0.8), rgba(255, 0, 122, 1)), url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <p className='font-semibold font md:text-[2rem] text-[23px] relative z-10 text-white'>SỰ KIỆN</p>
            <b className='md:text-[2.5rem] text-[27px] relative z-10 text-white'>ẤN TƯỢNG</b>
          </div>
          <div className='text-column h-[171px] w-full md:w-[400px] inset-0 bg-gradient-to-r from-yellow-200 to-yellow-50 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center'>
            <h3 className='font-semibold text-[23px] relative z-10 text-white'>LỚP HỌC</h3>
            <h2 className='font-bold text-[27px] relative z-10'>NĂNG ĐỘNG</h2>
          </div>
          <div className='text-column h-[171px] w-full md:w-[400px] inset-0 bg-gradient-to-r from-pink-400 to-pink-200 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center'>
            <h3 className='font-semibold text-[23px] relative z-10'>GIÁO VIÊN</h3>
            <h2 className='font-bold text-[27px] relative z-10'>TẬN TÂM</h2>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-[100px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-[30px]">
          <div className="text-column relative flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">LUÔN TIN Ở KHẢ NĂNG CỦA MÌNH</h2>
            <p className="mb-4">
            “Bà muốn các con LUÔN TIN Ở KHẢ NĂNG CỦA MÌNH, chúng ta sinh ra mỗi người đều có khả năng khác nhau, khi tin ở chính mình các con sẽ làm được tất cả. Khi gặp khó khăn hãy nhẩm câu thần chú: “Tôi làm được” nhiều lần, điều kỳ diệu chắc chắn sẽ xảy ra.” […]</p>
            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="image-column">
            <img src={image3} alt="Description" className="w-full h-auto object-cover mb-4 rounded-lg"/>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-3xl mt-[40px] font-bold mb-4 flex justify-center'>NHỮNG THÀNH TÍCH NỔI BẬT CỦA HỌC SINH</h2>
        <p className='text-lg mt-[5px] flex justify-center'>Tỷ lệ học sinh giỏi tăng liên tục. Từ 74,6% (năm học 2004-2005), đến 91,8% (năm học 2011-2012).</p>
        <p className='text-lg mt-[5px] flex justify-center'>Nhiều học sinh tham gia và đạt giải cao trong các kỳ thi học sinh giỏi các cấp. Tiêu biểu có em: Trương Đức Anh 5C</p>
        <p className='text-lg mt-[5px] flex justify-center'>– Huy chương Bạc kỳ thi Khoa học Quốc tế; Vũ Đình Trung 5A1 – Giải Ba Quốc gia Tin học trẻ không chuyên và Giải Thế hệ</p>
        <p className='text-lg mt-[5px] flex justify-center'>tài năng trong Cuộc thi “Nhân tài đất Việt”; và rất nhiều học sinh khác.</p>
      </div>
      <div className='container'>
        <div className='flex flex-wrap justify-around md:ml-[160px] mt-[40px] ml-0'>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img src={khoahocimg} alt="Description" className="w-[100px] h-auto object-cover mb-4"/>
            <b className='text-[30px] mt-3'>Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3"/>
            <p className='text-center mt-2 text-[17px]'>Huy chương Vàng, Bạc & các giải Nhất,<br/> Đặc biệt tại cuộc thi Toán Quốc tế<br/> (Kangaroo, IMAS, AMO,…)</p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img src={khoahocimg} alt="Description" className="w-[100px] h-auto object-cover mb-4"/>
            <b className='text-[30px] mt-3'>Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3"/>
            <p className='text-center mt-2 text-[17px]'>Huy chương Vàng, Bạc & các giải Nhất,<br/> Đặc biệt tại cuộc thi Toán Quốc tế<br/> (Kangaroo, IMAS, AMO,…)</p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img src={khoahocimg} alt="Description" className="w-[100px] h-auto object-cover mb-4"/>
            <b className='text-[30px] mt-3'>Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3"/>
            <p className='text-center mt-2 text-[17px]'>Huy chương Vàng, Bạc & các giải Nhất,<br/> Đặc biệt tại cuộc thi Toán Quốc tế<br/> (Kangaroo, IMAS, AMO,…)</p> 
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img src={khoahocimg} alt="Description" className="w-[100px] h-auto object-cover mb-4"/>
            <b className='text-[30px] mt-3'>Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3"/>
            <p className='text-center mt-2 text-[17px]'>Huy chương Vàng, Bạc & các giải Nhất,<br/> Đặc biệt tại cuộc thi Toán Quốc tế<br/> (Kangaroo, IMAS, AMO,…)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
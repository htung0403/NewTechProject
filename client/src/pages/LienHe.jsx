import React from "react";

export default function LienHe() {
  return (
    <div className="pt-[40px] mx-auto max-w-[1300px]">
      <div className="flex flex-row justify-start">
        <div className="w-3 h-10 mr-4 bg-cyan-600 border rounded-lg"></div>
        <h1 className="font-semibold text-[1.7rem] text-cyan-600">LIÊN HỆ</h1>
      </div>
      <div className="shadow-2xl mt-4 p-8 rounded-lg text-lg">
        <h1 className="my-10 font-semibold text-2xl">
          Trường Tiểu học Nam Phước 1 - Duy Xuyên, Quảng Nam
        </h1>
        <b className="">Địa chỉ:</b>
        <p className="">Thị trấn Nam Phước, huyện Duy Xuyên, tỉnh Quảng Nam</p>
        <p className="">Điện thoại: 0235.3.858.858</p>
        <br />
        <p>Email: namphuoc1@gmail.com</p>
        <p className="mb-8">Website: namphuoc1.edu.vn</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.485887957558!2d108.2540624759958!3d15.831039884814457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314208b46c5d13a1%3A0xed7e7d1bcb0c5a8a!2zVHLGsOG7nW5nIFRp4buDdSBI4buNYyBT4buRIDEgTmFtIFBoxrDhu5tj!5e0!3m2!1sen!2sus!4v1724128452117!5m2!1sen!2sus"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          loading="lazy"
        ></iframe>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}

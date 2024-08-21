import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import background1 from "../images/background_card/IMG_0283.JPG";
import background2 from "../images/background_card/image.png";
import khoahocimg from "../images/khoahoc.png";
import line from "../images/line-min.png";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";

const image1 =
  "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/ImageSlider%2FDJI_0406.JPG?alt=media&token=ad4c2996-4c74-4a7e-a721-48374480e2df";
const image2 =
  "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/ImageSlider%2FIMG_1121.JPG?alt=media&token=2a3e68d4-368b-4b46-beb7-e75f3546a756";
const image3 =
  "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/ImageSlider%2FIMG_2015.JPG?alt=media&token=5103338a-3d2a-468b-9235-c7bc3b67a541";
const image4 =
  "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/ImageSlider%2FIMG_7133.JPG?alt=media&token=c258784f-8d45-4de3-93ce-ef79ef954b2f";
const images = [image1, image2, image3, image4];

export default function Home() {
  const [recentPosts, setRecentPosts] = useState(null);
  document.title = `TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        showThumbs={false}
        autoPlay
        interval={3000}
        infiniteLoop
        showStatus={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="md:h-[700px] w-full object-cover z-1"
            />
          </div>
        ))}
      </Carousel>
      <div className="container md:ml-7 mt-3 md:absolute md:top-[610px] md:left-1/2 transform md:-translate-x-1/2 z-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[70px] w-full">
          <div
            className="text-column h-[171px] w-full md:max-w-[400px] inset-0 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center outline-black"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 0, 122, 0.8), rgba(255, 0, 122, 1)), url(${background1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="font-semibold font md:text-[2rem] text-[23px] relative z-10 text-white">
              SỰ KIỆN
            </p>
            <b className="md:text-[2.5rem] text-[27px] relative z-10 text-white">
              ẤN TƯỢNG
            </b>
          </div>
          <div
            className="text-column h-[171px] w-full md:max-w-[400px] inset-0 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center outline-black"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.8), rgba(255, 140, 0, 1)), url(${background2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="font-semibold font md:text-[2rem] text-[23px] relative z-10 text-white">
              LỚP HỌC
            </p>
            <b className="md:text-[2.5rem] text-[27px] relative z-10 text-white">
              NĂNG ĐỘNG
            </b>
          </div>
          <div
            className="text-column h-[171px] w-full md:max-w-[400px] inset-0 rounded-3xl pl-10 pt-4 pb-4 relative flex flex-col justify-center outline-black"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 122, 255, 0.8), rgba(0, 122, 255, 1)), url(${image3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="font-semibold font md:text-[2rem] text-[23px] relative z-10 text-white">
              GIÁO VIÊN
            </p>
            <b className="md:text-[2.5rem] text-[27px] relative z-10 text-white">
              TẬN TÂM
            </b>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10 md:mt-[150px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:ml-[30px]">
          <div className="text-column relative flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              LUÔN TIN Ở KHẢ NĂNG CỦA MÌNH
            </h2>
            <p className="mb-4 text-justify">
              “Thầy rất vui khi được đứng đây, cùng các con bắt đầu một năm học
              mới đầy hứng khởi.
              <br /> Các con có biết không, giống như một hạt giống nhỏ cần được
              tưới nước và chăm sóc để lớn lên, kiến thức cũng vậy, cần được
              chúng ta vun trồng từng ngày. <br />
              <br /> Thầy biết rằng các con đều rất thông minh và tài năng. Hãy
              luôn giữ vững niềm tin vào bản thân, đừng ngại đặt câu hỏi và khám
              phá những điều mới lạ. Thầy tin rằng với sự nỗ lực không ngừng,
              các con sẽ đạt được những thành công rực rỡ.
              <br />
              <br /> Hãy nhớ rằng, việc học không chỉ là để có những điểm số cao
              mà còn để trang bị cho các con những kiến thức và kỹ năng cần
              thiết để đối mặt với cuộc sống. Hãy cùng nhau tạo nên một môi
              trường học tập vui vẻ, thân thiện và hiệu quả.”
            </p>
            <br />
            <b className="text-left">- Hiệu trưởng Võ Quý</b>
          </div>
          <div className="image-column">
            <img
              src={image3}
              alt="Description"
              className="w-full h-auto object-cover mb-4 rounded-lg border-2 border-slate-800"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl mt-[40px] font-bold mb-4 flex justify-center">
          NHỮNG THÀNH TÍCH NỔI BẬT CỦA HỌC SINH
        </h2>
        <p className="text-lg mt-[5px] flex justify-center">
          Tỷ lệ học sinh giỏi tăng liên tục. Từ 74,6% (năm học 2004-2005), đến
          91,8% (năm học 2011-2012).
        </p>
        <p className="text-lg mt-[5px] flex justify-center">
          Nhiều học sinh tham gia và đạt giải cao trong các kỳ thi học sinh giỏi
          các cấp. Tiêu biểu có em: Trương Đức Anh 5C
        </p>
        <p className="text-lg mt-[5px] flex justify-center">
          – Huy chương Bạc kỳ thi Khoa học Quốc tế; Vũ Đình Trung 5A1 – Giải Ba
          Quốc gia Tin học trẻ không chuyên và Giải Thế hệ
        </p>
        <p className="text-lg mt-[5px] flex justify-center">
          tài năng trong Cuộc thi “Nhân tài đất Việt”; và rất nhiều học sinh
          khác.
        </p>
      </div>
      <div className="container">
        <div className="flex flex-wrap justify-around md:ml-[160px] mt-[40px] ml-0">
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img
              src={khoahocimg}
              alt="Description"
              className="w-[100px] h-auto object-cover mb-4"
            />
            <b className="text-[30px] mt-3">Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3" />
            <p className="text-center mt-2 text-[17px]">
              Huy chương Vàng, Bạc & các giải Nhất,
              <br /> Đặc biệt tại cuộc thi Toán Quốc tế
              <br /> (Kangaroo, IMAS, AMO,…)
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img
              src={khoahocimg}
              alt="Description"
              className="w-[100px] h-auto object-cover mb-4"
            />
            <b className="text-[30px] mt-3">Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3" />
            <p className="text-center mt-2 text-[17px]">
              Huy chương Vàng, Bạc & các giải Nhất,
              <br /> Đặc biệt tại cuộc thi Toán Quốc tế
              <br /> (Kangaroo, IMAS, AMO,…)
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img
              src={khoahocimg}
              alt="Description"
              className="w-[100px] h-auto object-cover mb-4"
            />
            <b className="text-[30px] mt-3">Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3" />
            <p className="text-center mt-2 text-[17px]">
              Huy chương Vàng, Bạc & các giải Nhất,
              <br /> Đặc biệt tại cuộc thi Toán Quốc tế
              <br /> (Kangaroo, IMAS, AMO,…)
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center mb-6 md:mb-0">
            <img
              src={khoahocimg}
              alt="Description"
              className="w-[100px] h-auto object-cover mb-4"
            />
            <b className="text-[30px] mt-3">Khoa Học</b>
            <img src={line} alt="line" className="w-[130px] mt-3" />
            <p className="text-center mt-2 text-[17px]">
              Huy chương Vàng, Bạc & các giải Nhất,
              <br /> Đặc biệt tại cuộc thi Toán Quốc tế
              <br /> (Kangaroo, IMAS, AMO,…)
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4 mx-20 border-t-2 border-gray-400" />
      <div className="flex flex-col justify-center mx-4 items-center mb-5">
        <h1 className="text-3xl mt-4 font-bold mb-4">TIN TỨC - SỰ KIỆN</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center mt-6">
        <div className="flex flex-col justify-center mx-auto mb-4 px-4 sm:ml-40">
          <h2 className="text-3xl font-bold mb-4 text-center sm:text-left">
            XEM VIDEO CỦA TRƯỜNG
          </h2>
          <p className="max-w-[650px] sm:text-left text-justify">
            Trường Nam Phước 1 như một gia đình lớn. Các thầy cô giáo và học
            sinh yêu thương, gắn bó và cùng tiến bước. Những tiết học thú vị,
            những hoạt động hứng khởi nuôi dưỡng các con trưởng thành. Các
            khoảng khắc sinh động được ghi nhận trong các Video Clip mà chúng ta
            có thể xem lại ở đây.
          </p>
        </div>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/er-Guj8mwsQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mx-auto sm:w-[629px] sm:h-[354px]"
        ></iframe>
      </div>
    </div>
  );
}

import img from "../images/background_card/image.png";

export default function ChuongTrinhTieuChuanBGD() {
  document.title = `CHƯƠNG TRÌNH TIÊU CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  return (
    <div className="pt-[40px] mx-auto max-w-[1300px]">
      <div className="flex flex-row justify-start">
        <div className="w-3 h-10 mr-4 bg-cyan-600 border rounded-lg"></div>
        <h1 className="font-semibold text-[1.7rem] text-cyan-600">
          CHƯƠNG TRÌNH TIÊU CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO.
        </h1>
      </div>
      <div className="shadow-2xl flex flex-col md:flex-row mt-4 p-4 rounded-lg text-lg gap-8">
        <div className="md:w-1/2">
          <img src={img} alt="" className="rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="font-semibold text-2xl">
            Định hướng các chương trình trong nhà trường
          </h1>
          <br/>
          <p className="text-justify">
            Các chương trình giáo dục của trường Tiểu học Nam Phước 1 hướng tới mục
            tiêu đào tạo và chuẩn bị cho học sinh nền tảng tốt nhất để trở thành
            công dân toàn cầu có kỹ năng Thế kỷ 21: vừa am hiểu kiến thức, sử
            dụng được ngoại ngữ, vừa có các kỹ năng tư duy và kỹ năng sống cần
            thiết cho bản thân, sẵn sàng hội nhập quốc tế.<br/><br/> Sau khi kết thúc
            chương trình học, các em học sinh có thể tự tin chuyển cấp trong hệ
            thống, hoặc thi vào các trường chuyên, công lập, ngoài công lập,
            song ngữ và quốc tế.
          </p>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}

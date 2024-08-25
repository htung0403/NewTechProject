import { Footer } from "flowbite-react"
import { BsFacebook } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="bg-cyan-200 mt-10">
        <div className="w-full w-max-7xl mx-auto">
            <div className="grid grid-cols-2 gap-4 sm:mt-4 sm:gap-6 md:mx-[120px] mx-2 md:text-sm text-xs">
                <div>
                    <Footer.Title className="text-black font-bold" title="Thông tin"/>
                    <p><strong>Hiệu trưởng:</strong> Võ Quý
                    <br/><strong>Website:</strong> http://namphuoc1.edu.vn / <strong>Email:</strong> voquy711np1@gmail.com
                    <br/><strong>Số tài khoản:</strong>
                    {/* <br/>1462 4311 200 00065 tại Ngân hàng Nông nghiệp và Phát triển nông thôn - Chi nhánh Tây Đô
                    <br/>Đơn vị thụ hưởng: Trường Tiểu học Đoàn Thị Điểm - Hà Nội */}
                    <br/>Địa chỉ email: info@dtd.edu.vn</p>
                </div>
                <div>
                    <Footer.Title className="text-black font-bold" title="Địa chỉ"/>
                    <p>
                    Nam Phước, Duy Xuyên, Quảng Nam
                    <br/>Hotline: (024) 3787 0338
                    </p><br/>
                    <Footer.Icon href="#" icon={BsFacebook}/>
                </div>
                
            </div>
            <Footer.Copyright className="text-black font-bold" href="#" by="Trường Tiểu học Nam Phước 1 - Duy Xuyên." year={new Date().getFullYear()}/>
        </div>
        
    </Footer>
  )
}

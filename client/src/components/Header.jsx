import {
  Button,
  Navbar,
  NavbarCollapse,
  TextInput,
  Dropdown,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import "../index.css";
import logoImg from "../images/logo.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const [searchTerm, setSerchTerm] = useState('');
  console.log(searchTerm);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSerchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <Navbar className="border-b-2 fixed top-0 left-0 w-full z-50 bg-white">
      <Link to="/" className="self-center">
        <img
          src={logoImg}
          alt="Logo"
          style={{ height: "4rem" }}
          className="h-16 sm:h-8 md:ml-[100px] ml-3"
        />
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="relative group">
          <div className="py-3 font-bold text-[16px] font-sans cursor-pointer">
            GIỚI THIỆU
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
            <div className="py-1">
              <Link
                to="/gioi-thieu/thu-ngo"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
              >
                THƯ NGÕ
              </Link>
            </div>
            <div className="py-1 relative sub-menu">
              <div className="px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300 cursor-pointer flex justify-between items-center">
                CƠ CẤU TỔ CHỨC
                <AiOutlineRight />
              </div>
              <div className="absolute left-full top-0 hidden sub-menu-hover:block bg-white shadow-lg w-60">
                <div className="py-1">
                  <Link
                    // to="/gioi-thieu/co-cau-to-chuc/thuong-truc-hoi-cmhs"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    THƯỜNG TRỰC HỘI CMHS
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    // to="/gioi-thieu/co-cau-to-chuc/cac-to-chuyen-mon"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    CÁC TỔ CHUYÊN MÔN
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    // to="/gioi-thieu/co-cau-to-chuc/ban-chi-huy-lien-doi"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    BAN CHỈ HUY LIÊN ĐỘI
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    // to="/gioi-thieu/co-cau-to-chuc/ban-chap-hanh-cong-doan"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    BAN CHẤP HÀNH CÔNG ĐOÀN
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    // to="/gioi-thieu/co-cau-to-chuc/ban-giam-hieu"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    BAN GIÁM HIỆU
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="py-3 font-bold text-[1rem] font-sans cursor-pointer">
            CHƯƠNG TRÌNH
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
            <div className="py-2">
              <Link
                to="/chuong-trinh-tieu-chuan-bo-gddt"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200"
              >
                CHƯƠNG TRÌNH TIÊU CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO.
              </Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="py-3 font-bold text-[16px] font-sans cursor-pointer">
            PHỤ HUYNH
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
            <div className="py-2">
              <Link
                // to="/phu-huynh/thong-bao-chung"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200"
              >
                THÔNG BÁO CHUNG
              </Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="py-3 font-bold text-[16px] font-sans cursor-pointer">
            HOẠT ĐỘNG
          </div>
          <div className="absolute hidden group-hover:block bg-white shadow-lg w-60">
            <div className="py-2">
              <Link
                to="/tin-tuc"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200"
              >
                TIN TỨC
              </Link>
            </div>
            <div className="py-2">
              <Link
                to="/su-kien"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200"
              >
                SỰ KIỆN
              </Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <Link to="/lien-he">
            <div className="py-3 font-bold text-[16px] font-sans cursor-pointer">
              LIÊN HỆ
            </div>
          </Link>
        </div>
      </Navbar.Collapse>
      <form>
        <TextInput
          type="text"
          placeholder="Tìm kiếm..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
    </Navbar>
  );
}

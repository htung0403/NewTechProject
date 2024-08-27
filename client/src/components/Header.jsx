import {
  Button,
  Navbar,
  NavbarCollapse,
  TextInput,
  Dropdown,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import "../index.css";
import logoImg from "../images/logo.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleSubMenu = (subMenu) => {
    setActiveSubMenu(activeSubMenu === subMenu ? null : subMenu);
  };

  return (
    <Navbar className="border-b-2 fixed top-0 left-0 w-full z-20 bg-white">
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
          <div
            className="py-3 font-bold text-[16px] font-sans cursor-pointer title-header"
            onClick={isMobile ? () => toggleMenu("gioi-thieu") : null}
          >
            GIỚI THIỆU
          </div>
          <div
            className={`absolute ${isMobile ? (activeMenu === "gioi-thieu" ? "block" : "hidden") : "hidden group-hover:block"} bg-white shadow-lg w-60 z-50`}
          >
            <div className="py-1">
              <Link
                to="/gioi-thieu/thu-ngo"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
              >
                THƯ NGÕ
              </Link>
            </div>
            <div className="py-1 relative sub-menu">
              <div
                className="px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300 cursor-pointer flex justify-between items-center"
                onClick={
                  isMobile ? () => toggleSubMenu("co-cau-to-chuc") : null
                }
              >
                CƠ CẤU TỔ CHỨC
                <AiOutlineRight />
              </div>
              <div
                className={`absolute left-full top-0 ${isMobile ? (activeSubMenu === "co-cau-to-chuc" ? "block" : "hidden") : "hidden sub-menu-hover:block z-50"} bg-white shadow-lg md:w-60 w-30`}
              >
                <div className="py-1">
                  <Link
                    to="/cac-to-chuyen-mon"
                    className="block px-4 py-2 md:text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    CÁC TỔ CHUYÊN MÔN
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/ban-chap-hanh-cong-doan"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    BAN CHẤP HÀNH CÔNG ĐOÀN
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/ban-giam-hieu"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    BAN GIÁM HIỆU
                  </Link>
                </div>
                <div className="py-1">
                  <Link
                    to="/chi-bo-dang"
                    className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-300"
                  >
                    CHI BỘ ĐẢNG
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <Link
            to="/chuong-trinh-tieu-chuan-bo-gddt"
            className="py-3 font-bold text-[16px] font-sans cursor-pointer"
          >
            <div className="py-3 font-bold text-[1rem] font-sans cursor-pointer">
              CHƯƠNG TRÌNH
            </div>
          </Link>
        </div>
        <div className="relative group">
          <div
            className="py-3 font-bold text-[16px] font-sans cursor-pointer"
            onClick={isMobile ? () => toggleMenu("phu-huynh") : null}
          >
            PHỤ HUYNH
          </div>
          <div
            className={`absolute ${isMobile ? (activeMenu === "phu-huynh" ? "block" : "hidden") : "hidden group-hover:block"} bg-white shadow-lg w-60 z-50`}
          >
            <div className="py-2">
              <Link
                to="/phu-huynh/thong-bao-chung"
                className="block px-4 py-2 text-[14px] font-sans font-bold hover:bg-gray-200"
              >
                THÔNG BÁO CHUNG
              </Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div
            className="py-3 font-bold text-[16px] font-sans cursor-pointer"
            onClick={isMobile ? () => toggleMenu("hoat-dong") : null}
          >
            HOẠT ĐỘNG
          </div>
          <div
            className={`absolute ${isMobile ? (activeMenu === "hoat-dong" ? "block" : "hidden") : "hidden group-hover:block"} bg-white shadow-lg w-60 z-50`}
          >
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
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
    </Navbar>
  );
}

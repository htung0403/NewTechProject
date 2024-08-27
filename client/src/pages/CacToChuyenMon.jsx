import React, {useEffect} from "react";
import img from "../images/background_card/image.png";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function CacToChuyenMon() {
  document.title = `CÁC TỔ CHUYÊN MÔN - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;
  
  return (
    <div className="pt-[40px] mx-auto max-w-[1300px] w-full">
      <div className="flex flex-row justify-start w-full">
        <div className="w-3 h-10 mr-4 bg-cyan-600 border rounded-lg"></div>
        <h1 className="font-semibold text-[1.7rem] text-cyan-600">
          CÁC TỔ CHUYÊN MÔN
        </h1>
      </div>
      <div className="shadow-2xl flex flex-col md:flex-row mt-4 p-4 rounded-lg text-lg gap-8 w-full">
        <Table hoverable className="shadow-md w-full">
          <TableHead className="text-center font-semibold text-white text-lg">
            <TableHeadCell className="w-[300px] bg-cyan-500 ">HỌ VÀ TÊN</TableHeadCell>
            <TableHeadCell className="w-[1000px] bg-cyan-600">CHỨC DANH</TableHeadCell>
          </TableHead>
          <TableBody className="text-center text-base">
            <TableRow>
              <TableCell>Trương thị Ngọc Thảo</TableCell>
              <TableCell>TTVP</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Trịnh Thị Tứ</TableCell>
              <TableCell>TT tổ 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nguyễn thị Khuyên</TableCell>
              <TableCell>TT tổ 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nguyễn Thị Sương</TableCell>
              <TableCell>TT tổ 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phạm Thị Huyền</TableCell>
              <TableCell>TT tổ 4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nguyễn Thị Tú Hoa</TableCell>
              <TableCell>TT tổ 5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 w-full"></div>
    </div>
  );
}
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TaoBaiViet() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">Tạo bài viết</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Tiêu đề"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Chọn danh mục</option>
            <option value="tinTuc">Tin tức</option>
            <option value="suKien">Sự kiện</option>
            <option value="phuHuynh">Phụ huynh</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-cyan-400 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="cyanToBlue" size="sm" outline>
            Đăng ảnh
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Nội dung..." className="h-72 mb-12" required/>
        <Button type="submit" color='blue'>Đăng tải</Button>
      </form>
    </div>
  );
}

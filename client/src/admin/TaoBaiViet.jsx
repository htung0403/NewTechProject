import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import imageResize from "quill-image-resize-module-react";
import "quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useState, useEffect, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import imageHandler from "./components/imageHandler.jsx";
import useCheckAuth from "../../../api/utils/checkAuth.js";
import Select from 'react-select'
import Chat from "../components/Chat.jsx";

export default function CreatePost() {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://namphuoc1.edu.vn/api' 
    : 'http://localhost:3005/api';
  Quill.register("modules/imageResize", imageResize);

  document.title = `Tạo bài viết - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useCheckAuth();

  const options = [
    { value: "tin-tuc", label: "Tin tức" },
    { value: "su-kien", label: "Sự kiện" },
    { value: "phu-huynh", label: "Phụ huynh" },
    { value: "van-ban-cong-khai", label: "Văn bản công khai" },
  ];
  const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote"],
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown for font size
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Chưa chọn ảnh nền");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = `postImages/${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Tải ảnh thất bại");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Tải ảnh thất bại");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError("Vui lòng chọn ít nhất một danh mục.");
      return;
    }
  
    // Chuyển đổi mảng danh mục thành chuỗi
    const categoriesString = selectedCategories.map(option => option.value).join(', ');

    try {
      const res = await fetch(`http://localhost:3005/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, category: categoriesString }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      navigate(`/${data.slug}`);
    } catch (error) {
      setError("Đã xảy ra lỗi");
    }
  };
  const handleInsertToEditor = (text) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setText(text);
    }
  };

  return (
    <div className="p-3 max-w-[70rem] mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Tạo bài viết</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Tiêu đề"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            isMulti
            options={options}
            value={selectedCategories}
            onChange={handleCategoryChange}
            placeholder="Chọn danh mục..."
          />  
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-300 border-dashed p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="cyanToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Tải ảnh nền lên"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-fit self-center h-72 object-contain border-2 border-slate-300"
          />
        )}
        <div className="quill-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={CreatePost.formats}
          placeholder=""
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>
        <Button type="submit" gradientDuoTone="purpleToPink">
          Đăng
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </form>
      <Chat onInsert={handleInsertToEditor} />
    </div>
  );
}
CreatePost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
];

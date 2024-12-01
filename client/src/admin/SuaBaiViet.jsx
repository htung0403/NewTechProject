import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import imageResize from "quill-image-resize-module-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";
import imageHandler from "./components/imageHandler";
import "quill/dist/quill.snow.css";
import useCheckAuth from "../../../api/utils/checkAuth.js";
import Select from 'react-select';

export default function UpdatePost() {
  Quill.register("modules/imageResize", imageResize);
  document.title = `Sửa bài viết - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const [category, setCategory] = useState("uncategorized");
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useCheckAuth();

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
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
          // Set the category based on the fetched data
          const categoriesArray = data.posts[0].category.split(', ').map(cat => ({
            value: cat,
            label: cat === 'tin-tuc' ? 'Tin tức' : cat === 'su-kien' ? 'Sự kiện' : cat === 'phu-huynh' ? 'Phụ huynh' : cat === 'van-ban-cong-khai' ? 'Văn bản công khai' : cat // Thay đổi tên hiển thị nếu cần
          }));
          setSelectedCategories(categoriesArray); // Update selectedCategories
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

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
    console.log("Selected Categories:", selectedCategories); // Kiểm tra giá trị
    if (selectedCategories.length === 0) {
      setError("Vui lòng chọn ít nhất một danh mục.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3005/api/post/updatepost/${postId}/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Đã xảy ra lỗi");
    }
  };
  const options = [
    { value: "tin-tuc", label: "Tin tức" },
    { value: "su-kien", label: "Sự kiện" },
    { value: "phu-huynh", label: "Phụ huynh" },
    { value: "van-ban-cong-khai", label: "Văn bản công khai" },
  ];
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    // Cập nhật formData với danh mục đã chọn
    setFormData({ ...formData, category: selectedOptions.map(cat => cat.value).join(', ') });
  };

  return (
    <div className="p-3 max-w-[70rem] mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Chỉnh sửa bài viết
      </h1>
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
            value={formData.title}
          />
          <Select
            isMulti
            options={options}
            value={selectedCategories}
            onChange={handleCategoryChange}
            placeholder="Chọn danh mục..."
            required
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
            className="w-full h-72 object-contain"
          />
        )}
        {formData?.isFile ? (
          <iframe
            src={formData.content}
            title="File Preview"
            width="100%"
            height="800px"
          />
        ) : (
          <div className="quill-editor">
            <ReactQuill
              modules={modules}
              theme="snow"
              placeholder="Nội dung..."
              className="min-h-72 mb-12"
              required
              value={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>
        )}
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
    </div>
  );
}

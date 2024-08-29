import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill, { Quill } from 'react-quill';
import imageResize from 'quill-image-resize-module-react';
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
import './styles.css'

export default function UpdatePost() {
  Quill.register('modules/imageResize', imageResize);
  document.title = `Sửa bài viết - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const [category, setCategory] = useState('uncategorized');
  const [error, setError] = useState('');

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
  const module = {
    toolbar: toolbarOptions,
    imageResize: {
      modules: ["Resize", "DisplaySize"],
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
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
      const fileName = new Date().getTime() + "-" + file.name;
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
    if (category === 'uncategorized') {
      setError('Vui lòng chọn một danh mục.');
      return;
    }
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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

  return (
    <div className="p-3 max-w-[70rem] mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Chỉnh sửa bài viết
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFormData({ ...formData, category: e.target.value });
            }}
            required
          >
            <option value='uncategorized'>Chọn một danh mục</option>
            <option value='tin-tuc'>Tin tức</option>
            <option value='su-kien'>Sự kiện</option>
            <option value='phu-huynh'>Phụ huynh</option>
          </Select>
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
          modules={module}
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
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}
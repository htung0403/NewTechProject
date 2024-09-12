import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase.js';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from "../../../api/utils/checkAuth";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState({ title: ''});
  const [category, setCategory] = useState('uncategorized');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  useCheckAuth();

  const handleUploadFile = async () => {
    try {
      if (!file) {
        setUploadError('Chưa chọn tệp');
        return;
      }
      if (file.type !== 'application/pdf') {
        setUploadError('Chỉ cho phép tải lên tệp PDF');
        return;
      }
      setUploadError(null);
      const storage = getStorage(app);
      const folder = 'pdf';
      const fileName = `${folder}/${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError('Tải tệp thất bại');
          setUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadProgress(null);
          setUploadError(null);
          setFileUrl(downloadURL);
        }
      );
    } catch (error) {
      setUploadError('Đã xảy ra lỗi');
    }
  };

  const handleCreatePost = async () => {
    if (category === 'uncategorized') {
      setError('Vui lòng chọn một danh mục.');
      return;
    }
    if (!fileUrl) {
      setUploadError('Chưa tải lên tệp');
      return;
    }

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: fileUrl,
          category: formData.category,
          isFile: true,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Post created:', data); // Kiểm tra phản hồi từ API
        setUploadError(null);
        navigate(`/${data.slug}`);
      } else {
        const postErrorData = await res.json();
        setUploadError(postErrorData.message);
      }
    } catch (error) {
      setUploadError('Đã xảy ra lỗi khi tạo bài đăng');
    }
  };

  return (
    <div className='p-3 max-w-[70rem] mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Tải lên tệp</h1>
      <form className='flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Tiêu đề'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        <div className='flex gap-4 items-center justify-between border-4 border-blue-300 border-dashed p-3'>
          <FileInput
            type='file'
            accept='application/pdf'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='cyanToBlue'
            size='sm'
            outline
            onClick={handleUploadFile}
            disabled={uploadProgress}
          >
            {uploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Tải tệp lên'
            )}
          </Button>
        </div>
        {uploadError && <Alert color='failure'>{uploadError}</Alert>}
        {fileUrl && (
          <div className='mt-4'>
            <h2 className='text-xl'>Xem tệp:</h2>
            <iframe
              src={fileUrl}
              style={{ width: '100%', height: '800px' }}
              title="File Viewer"
            />
          </div>
        )}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Đăng
        </Button>
        {error && (
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UploadFile;
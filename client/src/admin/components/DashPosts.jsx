import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://namphuoc1.edu.vn/api' 
    : 'http://localhost:3005/api';

  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'tin-tuc': 'Tin Tức',
      'su-kien': 'Sự Kiện',
      'phu-huynh': 'Phụ Huynh',
      'van-ban-cong-khai': 'Văn bản công khai',
    };

    return category.split(',').map(cat => categoryMap[cat.trim()] || cat.trim()).join(', ');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/post/getposts?userId=${currentUser.id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
        const res = await fetch(`${API_URL}/post/getposts?userId=${currentUser.id}&startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if(data.posts.length<9){
              setShowMore(false);
            }
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${API_URL}/post/deletepost/${postIdToDelete}/${currentUser.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post.id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableHeadCell>Ngày đăng</TableHeadCell>
              <TableHeadCell>Ảnh bìa</TableHeadCell>
              <TableHeadCell>Tiêu đề</TableHeadCell>
              <TableHeadCell>Danh mục</TableHeadCell>
              <TableHeadCell>Xóa</TableHeadCell>
              <TableHeadCell>
                <span>Chỉnh sửa</span>
              </TableHeadCell>
            </TableHead>
            {userPosts.map((post) => (
              <TableBody key={post.id} className="divide-y">
                <TableRow className="bg-white">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <Link to={`/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className="font-medium text-gray-900" to={`/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>
                    {getCategoryDisplayName(post.category)}
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post.id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Xóa
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link className="text-teal-500 hover:underline" to={`/sua-bai-viet/${post.id}`}>
                        <span>
                            Chỉnh sửa
                        </span>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
              <div className="flex justify-center">
                <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                  Xem thêm
                </button>
              </div>
            )
          }
        </>
      ) : (
        <p>Bạn không có bài đăng</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Bạn có chắc chắn xóa bài đăng này?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Chắc chắn
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

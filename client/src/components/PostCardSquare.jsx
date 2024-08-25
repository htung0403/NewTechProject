import { Link } from 'react-router-dom';

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export default function PostCardSquare({ post }) {
  const getCategoryDisplayName = (category) => {
    switch (category) {
      case 'tin-tuc':
        return 'Tin Tức';
      case 'su-kien':
        return 'Sự Kiện';
      case 'phu-huynh':
        return 'Phụ Huynh';
      default:
        return category;
    }
  };

  return (
    <div className='group relative mx-2 w-full border border-teal-500 hover:border-2 h-auto sm:h-[200px] overflow-hidden rounded-lg transition-all flex flex-col sm:flex-row'>
      <Link to={`/${post.slug}`} className='flex-shrink-0 border-b sm:border-b-0 sm:border-r hover:border-r-2 border-teal-500'>
        <img
          src={post.image}
          alt='post cover'
          className='w-full sm:w-[400px] h-[200px] sm:h-full object-cover transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 flex-grow'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        {!post.isFile && (
          <p className='text-sm line-clamp-3'>{stripHtmlTags(post.content)}</p>
        )}
        <div className='mt-auto self-end text-xs'>
          <span>
            {post && new Date(post.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <Link
          to={`/${post.slug}`}
          className='z-10 mt-auto border border-cyan-500 text-slate-700 font-semibold hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none'
        >
          Đọc bài viết
        </Link>
      </div>
    </div>
  );
}
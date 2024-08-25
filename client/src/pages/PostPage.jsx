import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "./CallToAction";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error); // Debugging line
      }
    };
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;
    }
  }, [post]);

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

  if (loading)
    return (
      <div className="flex justify-between items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 font-semibold font-serif text-center max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && getCategoryDisplayName(post.category)}
        </Button>
      </Link>
      {!post?.isFile && (
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-contain"
        />
      )}
      <div className="flex justify-start p-3 border-b border-slate-500 mx-auto max-w-2xl text-sm italic">
        <span>
          {post && new Date(post.createdAt).toLocaleDateString("en-GB")}
        </span>
      </div>
      <div className="p-3 max-w-[68rem] mx-auto w-full post-content">
        {post?.isFile ? (
          <iframe
            src={post.content}
            title={post.title}
            width="100%"
            height="800px"
          ></iframe>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Bài viết gần đây</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
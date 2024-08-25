import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/postImages%2F1724577083558-image-removebg-preview%20(2).png?alt=media&token=5801d5be-b6fe-43cf-8a1a-6220b463344c',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isFile: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
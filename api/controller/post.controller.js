const slugify = require('slugify');
const Post = require('../models/post.model.js');
const { Op } = require('sequelize');
const { errorHandler } = require('../utils/error.js');
const pako = require('pako');

module.exports = {
  create: async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
      
      if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
      
      const { title, content, image, category, isCompressed } = req.body;
      
      let finalContent = content;
      if (isCompressed) {
        try {
          const compressedData = Buffer.from(content, 'base64');
          const decompressedContent = pako.inflate(compressedData, { to: 'string' });
          finalContent = JSON.parse(decompressedContent);
        } catch (error) {
          console.error('Decompression error:', error);
          return next(errorHandler(400, 'Invalid compressed content'));
        }
      }
  
      const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: 'vi',
      });
  
      const newPost = new Post({
        title,
        content: finalContent,
        image,
        category,
        slug,
        userId: req.user.id,
      });
  
      const savedPost = await newPost.save();
      console.log('Post saved successfully:', savedPost.id);
      res.status(201).json(savedPost);
    } catch (error) {
      console.error('Post creation error:', error);
      next(errorHandler(500, error.message));
    }
},
uploadFile: async (req, res, next) => {
  try {
      // Kiểm tra quyền truy cập
      if (!req.user.isAdmin) {
          return next(errorHandler(403, 'You are not allowed to upload files'));
      }

      // Kiểm tra các trường bắt buộc
      const { title, content, category, isFile } = req.body; 
      if (!title || !content || !category) {
          return next(errorHandler(400, 'Please provide all required fields'));
      }

      // Tạo slug từ tiêu đề
      const slug = slugify(title, {
          lower: true,
          strict: true,
          locale: 'vi',
      });

      // Tạo một bài viết mới
      const newPost = new Post({
          title,
          content,
          category,
          slug,
          isFile, 
          userId: req.user.id,
      });

      // Lưu bài viết vào cơ sở dữ liệu
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
  } catch (error) {
      console.error('Error uploading file:', error);
      next(error);
  }
},
  getposts: async (req, res, next) => {
    try {
      const userId = req.query.userId;
      const postId = req.query.postId;
      const category = req.query.category; // Lấy category từ query
      const slug = req.query.slug;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

      console.log('Query parameters:', { userId, postId, category, slug, startIndex, limit, sortDirection });

      let whereClause = {};
      if (userId) whereClause.userId = userId;
      if (postId) whereClause.id = postId;
      if (slug) whereClause.slug = slug;

      // Xử lý category
      if (category) {
          const categoriesArray = category.split(',').map(cat => cat.trim()); // Tách category thành mảng
          whereClause.category = {
              [Op.and]: categoriesArray.map(cat => ({
                  [Op.like]: `%${cat}%` // Kiểm tra xem category có chứa giá trị nào trong danh sách không
              }))
          };
      }

      console.log('Where clause:', whereClause);

      const { rows: posts, count: totalPosts } = await Post.findAndCountAll({
        where: whereClause,
        order: [['createdAt', sortDirection]],
        offset: startIndex,
        limit: limit,
      });

      console.log(`Found ${posts.length} posts out of ${totalPosts} total`);

      res.status(200).json({
        posts,
        totalPosts,
      });
    } catch (error) {
      console.error('Error in getposts:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  getpostsTinTucSuKien: async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

      const { rows: posts, count: totalPosts } = await Post.findAndCountAll({
        where: {
            [Op.or]: [
                { category: { [Op.like]: '%tin-tuc%' } },
                { category: { [Op.like]: '%su-kien%' } }
            ]
        },
        order: [['updatedAt', sortDirection]],
        offset: startIndex,
        limit,
    });

      res.status(200).json({
        posts,
        totalPosts,
      });
    } catch (error) {
      next(error);
    }
  },

  deletepost: async (req, res, next) => {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return next(errorHandler(404, 'Post not found'));
      }

      // Check if the user is the owner of the post or an admin
      if (post.userId !== req.user.id && !req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
      }

      await post.destroy();
      res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  updatepost: async (req, res, next) => {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return next(errorHandler(404, 'Post not found'));
      }

      // Check if the user is the owner of the post or an admin
      if (post.userId !== req.user.id && !req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
      }

      const updatedPost = await post.update({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  },
};
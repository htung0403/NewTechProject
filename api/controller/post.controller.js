import slugify from 'slugify';
import Post from '../models/post.model.js';
import { Op } from 'sequelize';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = slugify(req.body.title, {
    lower: true,
    strict: true,
    locale: 'vi',
  });

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

    const where = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { id: req.query.postId }),
      ...(req.query.searchTerm && {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.searchTerm}%` } },
          { content: { [Op.like]: `%${req.query.searchTerm}%` } },
        ],
      }),
    };

    const { rows: posts, count: totalPosts } = await Post.findAndCountAll({
      where,
      order: [['updatedAt', sortDirection]],
      offset: startIndex,
      limit,
    });

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastMonthPosts = await Post.count({
      where: {
        createdAt: { [Op.gte]: oneMonthAgo },
      },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};
export const getpostsTinTucSuKien = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

    const { rows: posts, count: totalPosts } = await Post.findAndCountAll({
      where: {
        category: {
          [Op.or]: ['su-kien', 'tin-tuc']
        }
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
};
export const deletepost = async (req, res, next) => {
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
};

export const updatepost = async (req, res, next) => {
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
};
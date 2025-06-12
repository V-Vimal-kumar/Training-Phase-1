import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text) {
      res.status(400);
      throw new Error('Please provide post text');
    }

    const post = await Post.create({
      text,
      image: image || '',
      user: req.user._id,
    });

    const populatedPost = await Post.findById(post._id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user posts
// @route   GET /api/posts/user/:userId
// @access  Private
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this post');
    }

    post.text = req.body.text || post.text;
    post.image = req.body.image || post.image;

    const updatedPost = await post.save();

    const populatedPost = await Post.findById(updatedPost._id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.json(populatedPost);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this post');
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Post already liked');
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (!post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Post has not been liked yet');
    }

    post.likes = post.likes.filter(
      (like) => like.toString() !== req.user._id.toString()
    );
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400);
      throw new Error('Please provide comment text');
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comment = {
      text,
      user: req.user._id,
    };

    post.comments.push(comment);
    await post.save();

    const newComment = post.comments[post.comments.length - 1];
    const populatedComment = await User.populate(newComment, {
      path: 'user',
      select: 'name profilePicture',
    });

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

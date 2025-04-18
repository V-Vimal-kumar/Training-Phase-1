import Post from '../schema/post.js'
import User from '../schema/user.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const existingUser = await User.findById(author);
    if (!existingUser) return res.status(404).json({ error: 'Author not found' });

    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { author } = req.query;
    const query = author ? { author } : {};
    const posts = await Post.find(query).populate('author', 'name', 'email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: req.params.id }).populate('author', 'name', 'email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

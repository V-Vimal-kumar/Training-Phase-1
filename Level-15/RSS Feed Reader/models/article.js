import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  pubDate: Date,
  source: String,
  read: { type: Boolean, default: false }
});

const Article = mongoose.model('Article', articleSchema);
export default Article;

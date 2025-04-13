import Parser from 'rss-parser';
import Article from '../models/article.js';

const parser = new Parser();

const fetchFeeds = async (feedUrls) => {
  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const existing = await Article.findOne({ link: item.link });
        if (!existing) {
          const article = new Article({
            title: item.title,
            content: item.contentSnippet || item.content || '',
            link: item.link,
            pubDate: new Date(item.pubDate),
            source: feed.title,
          });
          await article.save();
        }
      }
    } catch (err) {
      console.error(`Failed to fetch ${url}:`, err.message);
    }
  }
};

export default fetchFeeds;

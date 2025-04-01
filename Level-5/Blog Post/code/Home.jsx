import { Link } from "react-router-dom";

const blogPosts = [
  { id: "1", title: "Introduction to React", shortDescription: "Learn the basics of React." },
  { id: "2", title: "Understanding State and Props", shortDescription: "Dive into React state management." },
  { id: "3", title: "React Router Explained", shortDescription: "Master routing in React applications." },
];

export default function Home() {
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <p>{post.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";

const blogPosts = [
  { id: "1", title: "Introduction to React", content: "React is a JavaScript library for building user interfaces..." },
  { id: "2", title: "Understanding State and Props", content: "State and props are essential concepts in React..." },
  { id: "3", title: "React Router Explained", content: "React Router allows you to navigate between views..." },
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <h2>404 - Post Not Found</h2>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

import { usePostContext } from "../../../context/usePostContext";
import PostCard from "./PostCard";

export default function PostList() {
  const { postsCollection } = usePostContext();

  return postsCollection ? (
    <div className="posts-container">
      {postsCollection.state.docs.length > 0 &&
        postsCollection.state.docs.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
    </div>
  ) : null;
}

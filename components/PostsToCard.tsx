import { PostData } from "@/lib/posts";
import { css } from "@emotion/react";
import PostToCard from "./PostToCard";

type CardsListProps = {
  postsData: PostData[];
};

const PostsToCard: React.FC<CardsListProps> = ({ postsData }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 4em;
      `}
    >
      {postsData.map((post) => (
        <PostToCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsToCard;

import { useState } from "react";
import { PostData } from "@/lib/posts";
import { css } from "@emotion/react";
import PostToCard from "./PostToCard";

type CardsListProps = {
  postsData: PostData[];
};

const PostsToCard: React.FC<CardsListProps> = ({ postsData }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  const removeTagFilter = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const filteredPosts = selectedTags.length
    ? postsData.filter((post) =>
        post.tags?.some((tag) => selectedTags.includes(tag))
      )
    : postsData;

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          margin-bottom: 1em;
        `}
      >
        {selectedTags.map((tag, index) => (
          <div key={index}>
            <span>{tag}</span>
            <button onClick={() => removeTagFilter(tag)}>X</button>
          </div>
        ))}
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 4em;
        `}
      >
        {filteredPosts.map((post) => (
          <PostToCard key={post.id} post={post} onTagClick={handleTagClick} />
        ))}
      </div>
    </div>
  );
};

export default PostsToCard;

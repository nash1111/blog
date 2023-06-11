import { PostData } from "../lib/posts";
import { css } from "@emotion/react";
import Link from "next/link";
import React from "react";

type CardProps = {
  post: PostData;
  onTagClick: (tag: string) => void;
};

const PostToCard: React.FC<CardProps> = ({ post, onTagClick }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
        border-radius: 15px;
        background-color: #007bff;
        height: 100%;
        margin: 16px;
      `}
    >
      <div
        css={css`
          background-color: #f1f1f1;
          padding: 5px 10px;
          border-radius: 20px;
          align-self: flex-start;
        `}
      >
        {post.date}
      </div>
      <h2
        css={css`
          margin: 0;
          color: #fff;
        `}
      >
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <div
        css={css`
          align-self: flex-end;
        `}
      >
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            css={css`
              display: inline-block;
              background-color: #f1f1f1;
              padding: 5px 10px;
              margin-right: 5px;
              margin-bottom: 5px;
              border-radius: 20px;
            `}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostToCard;

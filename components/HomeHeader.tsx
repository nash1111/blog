import { css } from "@emotion/react";
import HomeButton from "./HomeButton";
import TweetButton from "./TweetButton";
export default function Header() {
  return (
    <header
      css={css`
        background-color: #008000;
        padding: 8px;
        text-align: center;
        overflow-x: auto;

        @media (min-width: 345px) {
          padding: 16px;
          text-align: left;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <h2
          css={css`
            color: #ffffff;
            font-size: 1em;
            margin-right: 16px; // これを追加

            @media (min-width: 345px) {
              font-size: 1.5em;
            }
          `}
        >
          nash1111 Tech Blog
        </h2>
        <TweetButton />
      </div>
    </header>
  );
}

import { css } from "@emotion/react";

export default function Header() {
  return (
    <header
      css={css`
        background-color: #008000;
        padding: 20px;
        text-align: center;
      `}
    >
      <h1
        css={css`
          color: #ffffff;
          font-size: 2em;
        `}
      >
        nash1111 Tech Blog
      </h1>
    </header>
  );
}

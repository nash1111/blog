import { css } from "@emotion/react";

export default function Header() {
  return (
    <header
      css={css`
        background-color: #008000;
        padding: 8px;
        text-align: center;

        @media (min-width: 345px) {
          padding: 16px;
          text-align: left;
        }
      `}
    >
      <h1
        css={css`
          color: #ffffff;
          font-size: 1em;

          @media (min-width: 345px) {
            font-size: 1.5em;
          }
        `}
      >
        nash1111 Tech Blog
      </h1>
    </header>
  );
}

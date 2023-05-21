import { css } from "@emotion/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      css={css`
        background-color: #008000;
        color: #ffffff;
        text-align: center;
        bottom: 0;
      `}
    >
      <Link href="/">
        <div
          css={css`
            color: #ffffff;
            text-decoration: none;
          `}
        >
          Home
        </div>
      </Link>
    </footer>
  );
}

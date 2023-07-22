import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { css } from "@emotion/react";
import HomeButton from "./HomeButton";
import TweetButton from "./TweetButton";

export default function HomeFooter() {
  return (
    <footer
      css={css`
        background-color: #008000;
        color: #ffffff;
        text-align: center;
        bottom: 0;
        overflow-x: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      `}
    >
      <div
        css={css`
          padding: 8px 16px; // こちらのボタンの横幅も広げる
        `}
      >
        <TweetButton />
      </div>
    </footer>
  );
}

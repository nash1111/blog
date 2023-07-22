import { css } from "@emotion/react";
import Link from "next/link";

import HomeIcon from "@material-ui/icons/Home";

export default function HomeButton() {
  return (
    <Link href="/">
      <div
        css={css`
          color: #ffffff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px; // 横幅を広げるためのパディング
          border-radius: 4px; // 角を丸くする
          &:hover {
            background-color: rgba(255, 255, 255, 0.1); // ホバー時の背景色
          }
        `}
      >
        <HomeIcon />
        Home
      </div>
    </Link>
  );
}

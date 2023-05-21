import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "@/components/Header";
import { css } from "@emotion/react";

import { GetStaticProps } from "next";
import { getAllPostIds, getPostData, PostData } from "@/lib/posts";

type Props = {
  allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
  console.log("allPostsData", allPostsData);
  return (
    <>
      <Header />
      <div
        css={css`
          color: red;
        `}
      >
        hello world
      </div>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const ids = getAllPostIds().map((post) => post.params.id);
  const allPostsData = await Promise.all(ids.map((id) => getPostData(id)));

  return {
    props: {
      allPostsData,
    },
  };
};

import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { css } from "@emotion/react";

type Props = {
  postData: PostData;
};

const codeStyle = css`
  display: inline-block;
  white-space: pre;
  color: #444;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 90%;
  font-family: monospace;
`;

export default function Post({ postData }: Props) {
  return (
    <>
      <Header />
      <h1>{postData.title}</h1>
      <div
        css={css`
          margin-bottom: 32px;
          code {
            ${codeStyle}
          }
        `}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || ["en"]).flatMap((locale) => getAllPostIds(locale));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    // Ensure params?.id is a string and does not include ".md" extension
    const id =
      typeof params?.id === "string" ? params.id.replace(/\.md$/, "") : "";
    const postData = await getPostData(id, locale || "en");
    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    throw error; // Continue throwing the error to fail the build
  }
};

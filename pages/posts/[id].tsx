import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";

type Props = {
  postData: PostData;
};

export default function Post({ postData }: Props) {
  return (
    <>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

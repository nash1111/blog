import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import Header from "@/components/Header";

type Props = {
  postData: PostData;
};

export default function Post({ postData }: Props) {
  return (
    <>
      <Header />
      <h1>{postData.title}</h1>
      <p>{postData.id}</p>
      <p>{postData.date}</p>
      {postData.tags?.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}

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
  try {
    // Ensure params?.id is a string and does not include ".md" extension
    const id =
      typeof params?.id === "string" ? params.id.replace(/\.md$/, "") : "";
    const postData = await getPostData(id);
    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error("Error occurred in getStaticProps:", error);
    throw error; // Continue throwing the error to fail the build
  }
};

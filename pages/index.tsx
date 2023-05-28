import { GetStaticProps } from "next";
import { getAllPostsData, PostData } from "../lib/posts";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";
import PostToCard from "@/components/PostToCard";
import PostsToCard from "@/components/PostsToCard";
import { css } from "@emotion/react";

type Props = {
  allPostsData: PostData[];
};

const Home: React.FC<Props> = ({ allPostsData }) => {
  const router = useRouter();
  const { locale } = router;
  const postsData = allPostsData.filter((post) => post.locale === locale);

  return (
    <div>
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 80px;
        `}
      >
        <LanguageToggle currentLocale={locale} />
        <PostsToCard postsData={postsData} />
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getAllPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;

import { GetStaticProps } from "next";
import { getAllPostsData } from "../lib/posts";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";

type Post = {
  id: string;
  title: string;
  date: string;
  locale: string;
};

type Props = {
  allPostsData: Post[];
};

const Home: React.FC<Props> = ({ allPostsData }) => {
  const router = useRouter();
  const { locale } = router;
  const postsData = allPostsData.filter((post) => post.locale === locale);

  return (
    <div>
      <Header />
      <LanguageToggle currentLocale={locale} />
      <ul>
        {postsData.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            {date}
          </li>
        ))}
      </ul>
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

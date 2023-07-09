export interface PostData {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  contentHtml: string;
  locale: "jp" | "en";
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import prism from "remark-prism";

export function getAllPostsData() {
  const locales = ["en", "jp"];
  const allPostsData = locales.flatMap((locale) => getSortedPostsData(locale));
  return allPostsData;
}

export function getSortedPostsData(locale: string) {
  const postsDirectory = path.join(process.cwd(), `pages/posts/${locale}`);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const { data } = matterResult;
    const metadata = data as PostData;

    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(prism)
      .use(rehypeStringify);

    const processedContent = processor.processSync(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      ...metadata,
      id,
      contentHtml,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(locale: string) {
  const postsDirectory = path.join(process.cwd(), `pages/posts/${locale}`);
  const fileNames = fs.readdirSync(postsDirectory);
  const mdFileNames = fileNames.filter((fileName) => /\.md$/.test(fileName));
  const ids = mdFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return ids.map((id) => {
    return {
      params: {
        id: id,
      },
      locale,
    };
  });
}

export function getPostData(id: string, locale: string) {
  const postsDirectory = path.join(process.cwd(), `pages/posts/${locale}`);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const { data } = matterResult;
  const metadata = data as PostData;

  const u = unified();
  const p1 = u.use(remarkParse);
  const p2 = p1.use(remarkPrism);
  const processor = p2.use(remarkHtml);
  const contentHtml = processor.processSync(matterResult.content).toString();

  return {
    ...metadata,
    id,
    contentHtml,
  };
}

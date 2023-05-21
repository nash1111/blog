import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkHtml from "remark-html";

export interface PostData {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  contentHtml: string;
  locale: "jp" | "en";
}

export function getAllPostsData() {
  const locales = ["en", "jp"];
  const allPostsData = locales.flatMap((locale) => getSortedPostsData(locale));
  return allPostsData;
}

export function getSortedPostsData(locale: string) {
  // Get file names under /pages/posts
  const postsDirectory = path.join(process.cwd(), `pages/posts/${locale}`);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const { data } = matterResult;
    const metadata = data as PostData;

    // Use remark to convert markdown into HTML string
    const processor = unified().use(remarkParse).use(remarkHtml);
    const processedContent = processor.processSync(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
      ...metadata,
      id,
      contentHtml,
    };
  });
  // Sort posts by date
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

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const { data } = matterResult;
  const metadata = data as PostData;

  // Use remark to convert markdown into HTML string
  const processor = unified().use(remarkParse).use(remarkStringify);
  const processedContent = processor.processSync(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...metadata,
    id,
    contentHtml,
  };
}

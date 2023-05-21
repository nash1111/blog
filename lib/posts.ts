import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export interface PostData {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  contentHtml: string;
  // 他に必要なフィールドがあればここに追加します
}

const postsDirectory = path.join(process.cwd(), "pages/posts");

export function getSortedPostsData(locale: string) {
  // Get file names under /pages/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.includes(locale))
    .map((fileName) => {
      // Remove ".md" and locale from file name to get id
      const id = fileName.replace(/\.md$/, "").replace(`_${locale}`, "");

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
  const fileNames = fs.readdirSync(postsDirectory);
  const mdFileNames = fileNames.filter(
    (fileName) => /\.md$/.test(fileName) && fileName.includes(locale)
  );
  const ids = mdFileNames.map((fileName) =>
    fileName.replace(/\.md$/, "").replace(`_${locale}`, "")
  );

  return ids.map((id) => {
    return {
      params: {
        id: id,
      },
    };
  });
}

export function getPostData(id: string, locale: string) {
  const fullPath = path.join(postsDirectory, `${id}_${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const { data } = matterResult;
  const metadata = data as PostData;

  // Use remark to convert markdown into HTML string
  const processor = unified().use(remarkParse).use(remarkHtml);
  const processedContent = processor.processSync(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...metadata,
    id,
    contentHtml,
  };
}

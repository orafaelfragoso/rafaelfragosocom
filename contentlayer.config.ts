import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `blog/${doc._raw.sourceFileName.replace(".mdx", "")}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", ""),
  },
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    publishedAt: { type: "string", required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeAutolinkHeadings,
      rehypePrettyCode,
      rehypeSlug,
      rehypeAccessibleEmojis,
    ],
  },
});

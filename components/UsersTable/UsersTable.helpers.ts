import { IITems } from "@/interfaces/IItems";
import { IPostData } from "@/interfaces/app/IPostData";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { KenticoParse } from "parsers/KenticoParse";

export const getAllPostsByTypes = async (
  types: string[]
): Promise<IITems<IKenticoBlog>> => {
  const kenticoHttpRequest = new KenticoHttpRequest();

  const posts = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(types);

  return posts;
};

export const mapPostsData = (posts: IITems<IKenticoBlog>): IPostData[] => {
  const kenticoParse = new KenticoParse();

  return posts?.items.map((post) => kenticoParse.postParse(post));
};

export const getAllAuthorNamesFromPosts = (posts: IPostData[]): string[] => {
  const allAuthorNames = posts?.reduce((acc, { author }) => {
    if (!acc.includes(author.name)) acc.push(author.name);

    return acc;
  }, []);

  return allAuthorNames;
};

export const getAllPostsByAuthor = ({
  authorNames,
  posts,
}: {
  authorNames: string[];
  posts: IPostData[];
}) => {
  const postsByAuthorNames = [];

  authorNames?.forEach((authorName) => {
    const postsByAuthorName = posts.filter(
      ({ author }) => author.name === authorName
    );

    postsByAuthorNames.push({
      totalPosts: postsByAuthorName.length,
      posts: postsByAuthorName,
      name: authorName,
    });
  });

  return postsByAuthorNames;
};

export const mapPostsByAuthor = ({
  postsByAuthor,
  types,
}: {
  postsByAuthor;
  types: string[];
}) => {
  const mappedPostsByAuthor = postsByAuthor.map((author) => {
    const postsByTypeGroup = [];

    types.forEach((type) => {
      const postsByType = author.posts.filter((post) => post.type === type);

      postsByTypeGroup.push({
        posts: postsByType,
        type,
      });
    });

    return {
      author,
      totalPosts: author.totalPosts,
      postsByTypeGroup,
    };
  });

  return mappedPostsByAuthor;
};

export const sortPostsByAuthor = (postsByAuthor) =>
  postsByAuthor
    .sort((a, b) => b.totalPosts - a.totalPosts)
    .filter((post) => !post.author.name.includes("undefined"));

export const getRowData = (postsByAuthor) => {
  const rowData = postsByAuthor?.map((row) => {
    return {
      name: row.author.name,
      "Total Posts": row.totalPosts,
      "Number Of Blogs": row.postsByTypeGroup.find(
        ({ type }) => type === "blog"
      )?.posts?.length,
      "Number Of Videos": row.postsByTypeGroup.find(
        ({ type }) => type === "video"
      )?.posts?.length,
      "Number Of Podcasts": row.postsByTypeGroup.find(
        ({ type }) => type === "podcast"
      )?.posts?.length,
      "Number Of News": row.postsByTypeGroup.find(({ type }) => type === "news")
        ?.posts?.length,
    };
  });

  return rowData;
};

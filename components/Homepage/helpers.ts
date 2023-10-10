import { IITems } from "@/interfaces/IItems";
import { IAuthor } from "@/interfaces/app/IAuthor";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
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

export const getNumberOfPostsPerAuthor = (
  authors: IAuthor[]
): IAuthorData[] => {
  const authorNames: any = [];
  const authorWithNumberOfPosts: any = [];

  authors.forEach(
    (
      { name, experience, jobTitle, caricature, slug }: IAuthor,
      index: number
    ) => {
      const formattedAuthor = {
        name,
        caricature,
        experience,
        jobTitle,
        numberOfBlogPosts: null,
        slug,
      };

      if (authorNames.includes(name)) {
        const authorIndex = authorNames.indexOf(name);

        (formattedAuthor.numberOfBlogPosts =
          authorWithNumberOfPosts[authorIndex].numberOfBlogPosts + 1),
          (authorWithNumberOfPosts[authorIndex] = formattedAuthor);
      } else {
        authorNames.push(name);
        authorWithNumberOfPosts.push({
          ...formattedAuthor,
          numberOfBlogPosts: 1,
        });
      }
    }
  );

  return authorWithNumberOfPosts;
};

export const getAuthorWithMostPosts = (authors: IAuthorData[]) => {
  const authorWithMostPosts = authors.reduce(
    (acc, author: IAuthorData, index: number) => {
      if (index > 0 && acc.numberOfBlogPosts < author.numberOfBlogPosts) {
        acc = author;
      } else if (index === 0) {
        acc = author;
      }

      return acc;
    },
    {
      numberOfBlogPosts: 0,
    }
  );

  return authorWithMostPosts;
};

export const mapPostsData = (posts: IKenticoBlog[]): IPostData[] => {
  const kenticoParse = new KenticoParse();

  return posts?.map((post) => kenticoParse.postParse(post));
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

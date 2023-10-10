import { useEffect, useState } from "react";
import {
  getAllAuthorNamesFromPosts,
  getAllPostsByAuthor,
  getAllPostsByTypes,
  getAuthorWithMostPosts,
  getNumberOfPostsPerAuthor,
  getRowData,
  mapPostsByAuthor,
  mapPostsData,
  sortPostsByAuthor,
} from "./helpers";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { useRouter } from "next/router";
import { KenticoParse } from "parsers/KenticoParse";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<IITems<IKenticoBlog>>(null);
  const [error, setError] = useState(null);

  const getAllPosts = async () => {
    const types = ["blog", "news", "video", "podcast"];

    setIsLoading(true);
    setError(null);

    try {
      const posts = await getAllPostsByTypes(types);

      setAllPosts(posts);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setAllPosts(null);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return { isLoading, allPosts, error };
};

export const useBarsChartData = (posts: IKenticoBlog[]) => {
  const [barsChartData, setBarsChartData] = useState(null);

  const router = useRouter();
  const kenticoPrase = new KenticoParse();

  const getBarsChartData = () => {
    console.log("router.query", router.query);

    const fromDate =
      router.query?.date === "All"
        ? "2015"
        : (router.query?.date as string)
        ? router.query.date
        : "2015";
    const type = router.query?.type ?? "All";

    const postsFromDate = posts.filter((item) => {
      const itemYear = item.date.rawData.value?.split("-")[0];

      if (itemYear >= fromDate) {
        return item;
      }
    });

    const postsByType =
      type !== "All"
        ? postsFromDate.filter((post) => post.system.type === type)
        : postsFromDate;

    const authors = postsByType
      .map((item) => {
        if (item.author.value.length > 0) {
          return kenticoPrase.authorParse(item.author.value[0]);
        }
      })
      .filter((x) => x);

    const authorsWithNumberOfPosts = getNumberOfPostsPerAuthor(authors);

    const sortedAuthorsWithNumberOfPosts = authorsWithNumberOfPosts.sort(
      (a, b) => {
        return b.numberOfBlogPosts - a.numberOfBlogPosts;
      }
    );
    setBarsChartData(sortedAuthorsWithNumberOfPosts);
  };

  useEffect(() => {
    if (!posts?.length) return;
    getBarsChartData();
  }, [posts, router.query]);

  return { barsChartData };
};

export const useWinner = (authors: IAuthorData[]) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!authors?.length) return;
    const winner = getAuthorWithMostPosts(authors);
    setWinner(winner);
  }, [authors]);

  return { winner };
};

export const useTableData = (posts: IKenticoBlog[]) => {
  const [postsByAuthor, setPostsByAuthor] = useState<any[]>();
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    { field: "name", rowDrag: true, sortable: true },
    { field: "Total Posts", sortable: true },
    { field: "Number Of Blogs", sortable: true },
    { field: "Number Of Videos", sortable: true },
    { field: "Number Of Podcasts", sortable: true },
    { field: "Number Of News", sortable: true },
  ]);

  const getPostsByAuthor = () => {
    const types = ["blog", "news", "video", "podcast"];

    const mappedPosts = mapPostsData(posts);

    const authorNames = getAllAuthorNamesFromPosts(mappedPosts);

    const postsByAuthor = getAllPostsByAuthor({
      authorNames,
      posts: mappedPosts,
    });

    const mappedPostsByAuthor = mapPostsByAuthor({ postsByAuthor, types });

    const sortedPostsByAuthor = sortPostsByAuthor(mappedPostsByAuthor);

    setPostsByAuthor(sortedPostsByAuthor);
  };

  useEffect(() => {
    if (postsByAuthor?.length > 0) {
      const rowData = getRowData(postsByAuthor);
      setRows(rowData);
    }
  }, [postsByAuthor]);

  useEffect(() => {
    getPostsByAuthor();
  }, [posts]);

  return { rows, columns };
};

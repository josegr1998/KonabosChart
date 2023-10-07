import { useEffect, useState } from "react";
import {
  getAllAuthorNamesFromPosts,
  getAllPostsByAuthor,
  getAllPostsByTypes,
  getRowData,
  mapPostsByAuthor,
  mapPostsData,
  sortPostsByAuthor,
} from "./UsersTable.helpers";

export const useTableData = () => {
  const [postsByAuthor, setPostsByAuthor] = useState<any[]>();
  const [isLoading,setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    { field: "name" },
    { field: "Total Posts" },
    { field: "Number Of Blogs" },
    { field: "Number Of Videos" },
    { field: "Number Of Podcasts" },
    { field: "Number Of News" },
  ]);

  const getPostsByAuthor = async () => {
    const types = ["blog", "news", "video", "podcast"];

    setIsLoading(true)

    const posts = await getAllPostsByTypes(types);

    setIsLoading(false)

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
  }, []);

  return { rows, columns,isLoading };
};

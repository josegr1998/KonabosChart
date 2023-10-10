import { Homepage } from "@/components/Homepage/Homepage";
import {
  usePosts,
} from "@/components/Homepage/hooks";

export default function Home() {
  const { allPosts, isLoading } = usePosts();

  return (
    <>
      {
        <Homepage
          isLoading={isLoading}
          posts={allPosts}
        />
      }
    </>
  );
}

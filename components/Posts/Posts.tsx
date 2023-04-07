import { IPostData } from "@/interfaces/app/IPostData";
import { Post } from "../Post/Post";
import { Container } from "../Container/Container";

export const Posts = ({ data }: { data: IPostData[] }) => (
  <Container>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
      {data.map((post,index) => (
        <Post data={post} key={index} />
      ))}
    </div>
  </Container>

);

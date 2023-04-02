export interface IAuthor {
  name: string;
  caricature?:{
    url:string;
    alt?:string
  },
  experience:string;
  jobTitle:string;
  numberOfBlogPosts?:number
}
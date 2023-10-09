import { IPostData } from "@/interfaces/app/IPostData";
import { CardContent } from "../CardContent/CardContent";

export const Post = ({ data }: { data: IPostData }) => {

  const postUrl = `https://konabos.com/${data.type}/${data.slug}`;

  const formattedDate = data.date?.split(',')[0]

  return (
    <div className='bg-gradient-to-br from-brandsPrimaryDark via-brandsPrimaryLight to-brandsPrimaryDark p-2 relative pb-16 transform transition-all h-96'
    style={{backgroundImage: `url(${data?.hero?.url})`,backgroundPosition:'center',objectFit:'cover'}}
    >
      <a href={postUrl} target='_blank' className="flex flex-col absolute
       w-4/5 h-1/2 bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2
      shadow-2xl
      ">
        <CardContent description={data.description} title={data.title} className="bg-white"/>
      </a>
      <div className='absolute -bottom-2 -left-2 bg-brandsDarkOrange text-white p-3 font-bold rounded-md'>
        <p>{formattedDate.replaceAll('/',' - ')}</p>
      </div>
    </div>

  );
};

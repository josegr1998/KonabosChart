import { IPostData } from "@/interfaces/app/IPostData";

export const Post = ({ data }: { data: IPostData }) => {

  const postUrl = `https://konabos.com/${data.type}/${data.slug}`;

  const formattedDate = data.date?.split(',')[0]

  return (
    <div className='bg-gradient-to-br from-brandsPrimaryDark via-brandsPrimaryLight to-brandsPrimaryDark p-2 relative pb-16 transform transition-all'>
      <a href={postUrl} target='_blank' className="flex flex-col h-full">
        <div className="h-56 w-full">
          <img src={data.hero?.url} className="h-full w-full object-cover"></img>
        </div>
        <div>
          <h2 className='my-4 text-xl font-bold capitalize'>{data.title}</h2>
          <p className='text-lg'>{data.description}</p>
        </div>
        <div className='absolute bottom-0 left-0 bg-brandsDarkOrange text-white p-3 font-bold'>
      <p>{formattedDate}</p>
        </div>
      </a>
    </div>
  );
};

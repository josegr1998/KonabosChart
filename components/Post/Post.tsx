import { IPostData } from "@/interfaces/app/IPostData";

export const Post = ({ data }: { data: IPostData }) => {

  const postUrl = `https://konabos.com/${data.type}/${data.slug}`;

  const formattedDate = data.date?.split(',')[0]

  return (
    <div className='bg-gradient-to-br from-brandsPrimaryDark via-brandsPrimaryLight to-brandsPrimaryDark p-2 relative pb-16 transform transition-all h-96'
    style={{backgroundImage: `url(${data.hero?.url})`}}
    >
      <a href={postUrl} target='_blank' className="flex flex-col absolute bg-white
      rounded-md p-4 w-4/5 h-1/2 bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2
      shadow-2xl
      ">
        <div>
          <h2 className='my-4 text-xl font-bold capitalize underline decoration-brandsPrimary underline-offset-4 transform hover:translate-x-2 transition-all'>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </a>
      <div className='absolute bottom-0 left-0 bg-brandsDarkOrange text-white p-3 font-bold'>
        <p>{formattedDate}</p>
      </div>
    </div>

  );
};

type Props = {
  title: string;
  description: string;
  className?:string
};

export const CardContent = ({ title, description,className }: Props) => {
  return (
    <div className={`p-4 h-full rounded-md ${className}`}>
      <h2 className='my-4 text-xl font-bold capitalize underline decoration-brandsPrimary underline-offset-4 transform hover:translate-x-2 transition-all'>
        {title}
      </h2>
      <p dangerouslySetInnerHTML={{__html:description}}></p>
    </div>
  );
};

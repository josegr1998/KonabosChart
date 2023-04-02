import { IAuthor } from "@/interfaces/app/IAuthor";
import { Container } from "../Container/Container";

export const Winner = ({
  winner: { experience, jobTitle, name, caricature },
  className,
}: {
  winner: IAuthor;
  className?: string;
}) => (
  <Container>
    <div className={`${className}`}>
      <h2 className='text-center text-3xl font-bold capitalize text-brandsDarkOrange'>WINNER</h2>
      <div className='mt-8 flex items-center gap-x-8 bg-gradient-to-r from-brandsPrimaryLight via-brandsPrimaryDark to-brandsPrimaryLight p-4 scale-95 transform transition-all hover:scale-100 hover:rounded-md'>
        <div className='mx-auto flex items-center justify-center'>
          <img src={caricature.url} className='max-w-xs' />
        </div>
        <div>
          <h2 className='text-center text-white font-bold text-2xl'>{name} - {jobTitle}</h2>
          <p dangerouslySetInnerHTML={{__html:experience}} className="text-lg mt-4"></p>
        </div>
      </div>
    </div>
  </Container>
);
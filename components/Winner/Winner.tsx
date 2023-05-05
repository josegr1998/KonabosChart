import { IAuthor } from "@/interfaces/app/IAuthor";
import { Container } from "../Container/Container";
import { CardContent } from "../CardContent/CardContent";
import { useAppSelector } from "redux/hooks";

export const Winner = ({
  className,
  title
}: {
  className?: string;
  title:string
}) => {

  const winner = useAppSelector(state=>state.authorsSlice.winner)

  return <Container>
   {winner?.numberOfBlogPosts > 0 ? <div className={`${className}`}>
      <div className='mt-8 gap-x-8 p-4 relative'>
        <div className=''>
          <img src={winner.caricature.url} className='max-w-xs mx-auto lg:mx-0' />
        </div>
        <div className="relative -top-12 mx-auto lg:mx-0 lg:absolute lg:top-1/3 lg:left-1/4 rounded-md z-20 w-3/4 border-2 border-brandsPrimary">
          <CardContent description={winner.experience} title={`${winner.name} - ${winner.jobTitle}`} className="bg-white" />
          <div className="absolute -top-4 -right-4 bg-brandsPrimary text-white rounded-md p-2">
            {title}
          </div>
        </div>
      </div>
    </div> : null}
  </Container>

};

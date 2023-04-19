import { ILineFilterState } from "./ILineFilterState";
import filterDates from "../../data/dates.json";

const LineFilter = ({onChange,onDisplayChange,states }: {
 onChange: (type: string, value: string) => void;
 states: ILineFilterState;
 onDisplayChange: (type: string) => void;
}) => {


  return (
   <div className='max-w-7xl mb-8 flex justify-center mt-6 md:mt-0 md:justify-start gap-x-4'>
    <div className='relative'>
     <button
      className={`rounded-md border-2 p-1 px-2 w-36 border-brandsPrimaryDark hover:bg-gradient-to-bl from-brandsPrimaryLight via-brandsPrimaryDark to-brandsPrimaryLight hover:text-white transition-all hover:border-white hover:scale-110 ${states.date.isOpen && 'text-white scale-110 bg-gradient-to-bl border-white'}`}
      onClick={() => onDisplayChange("date")}
     >
      Year
     </button>
     <div
      className={`transform transition-all absolute ${states.date.isOpen ? 'scale-100' : 'scale-0'} w-32 py-1 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
     >
      {filterDates.map((field, index) => (
       <div key={index}>
        <button className='hover:text-brandsPrimary' onClick={() => onChange('date', field)}>
         {field}
        </button>
       </div>
      ))}
     </div>
    </div>
    </div>
  )
}

export default LineFilter
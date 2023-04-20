import filterFields from "../../data/filterFields.json";
import filterDates from "../../data/dates.json";
import { IFilterState } from "./IFIlterState";
import { Container } from "../Container/Container";

export const Filter = ({
  onChange,
  states,
  onDisplayChange,
}: {
  onChange: (type: string, value: string) => void;
  states: IFilterState;
  onDisplayChange: (type: string) => void;
}) => {
  return (
    
      <div className='max-w-7xl mb-8 flex justify-center mt-6 md:mt-0 md:justify-start gap-x-4'>
        <div className='relative'>
          <button
          className={`rounded-md border-2 p-1 px-2 w-36 border-brandsPrimaryDark hover:bg-gradient-to-bl from-brandsPrimaryLight via-brandsPrimaryDark to-brandsPrimaryLight hover:text-white transition-all hover:border-white hover:scale-110 ${states.type.isOpen && 'text-white scale-110 bg-gradient-to-bl border-white'}`}
            onClick={() => onDisplayChange("type")}
          >
            Type
          </button>
          <div
            className={`transform transition-all absolute ${states.type.isOpen ? 'scale-100' : 'scale-0'} w-32 py-1 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
          >
            {filterFields.map(({ value, label }, index) => (
              <div key={index}>
                <button className={`${value === states.type.value ? 'text-brandsPrimary' : ''} hover:text-brandsPrimary`} onClick={() => onChange('type', value)}>
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='relative'>
          <button
          className={`rounded-md border-2 p-1 px-2 w-36 border-brandsPrimaryDark hover:bg-gradient-to-bl from-brandsPrimaryLight via-brandsPrimaryDark to-brandsPrimaryLight hover:text-white transition-all hover:border-white hover:scale-110 ${states.date.isOpen && 'text-white scale-110 bg-gradient-to-bl border-white'}`}
            onClick={() => onDisplayChange("date")}
          >
            Starting Date
          </button>
          <div
            className={`transform transition-all absolute ${states.date.isOpen ? 'scale-100' : 'scale-0'} w-32 py-1 border border-brandsPrimary z-20 bg-white rounded-md
        mt-2 px-2`}
          >
            {filterDates.map((field, index) => (
              <div key={index}>
                <button className={`${field === states.date.value ? 'text-brandsPrimary' : ''} hover:text-brandsPrimary`} onClick={() => onChange('date', field)}>
                  {field}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
   
  );
};
